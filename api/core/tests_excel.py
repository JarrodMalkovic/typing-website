from django.test import TestCase
from core.questions.models import Question
from core.subexercises.models import Subexercise
from core.exercises.models import Exercise
from core.practice.models import PracticeAttempt
from core.challenge.models import ChallengeAttempt
from core.user.models import User
from django.core.cache import cache
from rest_framework.test import APITestCase, APIClient

import json
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token


class ExcelDocumentTestCase(TestCase):
    def setUp(self):
        print("Setting Up Test Environment")
        # Exercise = short-sentences
        exercise1 = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences",
                                            allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
        # Exercise = letters
        exercise2 = Exercise.objects.create(exercise_slug="letters", exercise_name="Letters",
                                            allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)

        # Subexercise = short-sentences
        subexercise1 = Subexercise.objects.create(
            exercise_slug=exercise1, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)
        # Subexercise = basic-left-hand
        subexercise2 = Subexercise.objects.create(
            exercise_slug=exercise2, subexercise_slug="basic-left-hand", subexercise_name="Basic Left Hand", level=1)

        # Make 3 questions for short-sentences
        for i in range(1, 4):
            ques = "This is korean sentence: " + str(i)
            translation = "This is sentence translation: " + str(i)
            Question.objects.create(
                subexercise_slug=subexercise1, question=ques, translation=translation)

        # Make 3 questions for basic-left-hand
        for i in range(1, 4):
            ques = "This is korean letter: " + str(i)
            translation = "This is letter translation: " + str(i)
            Question.objects.create(
                subexercise_slug=subexercise2, question=ques, translation=translation)

    def get_superuser_access_token(self):
        user = User.objects.create_superuser(
            username="testSuperUser1", email="newsuperuser@test.com", password="forttst123")
        data = {
            "email": "newsuperuser@test.com",
            "password": "forttst123"
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        return access_token

    def get_user_access_token(self):
        user = User.objects.create_user(
            username="testUser1", email="newuser@test.com", password="forttst123")
        data = {
            "email": "newuser@test.com",
            "password": "forttst123"
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        return access_token

    # For every exercise with no audio files, call the download files route
    # Expect it to return every question with its subexercise and translation
    def test_question_download(self):
        print("---> Test: API Excel Question Download")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)

        exercises = Exercise.objects.filter(allow_audio_files_in_questions=False)
        subexercises = ["Short Sentences", "Basic Left Hand"]
        questions = ["This is korean sentence: ", "This is korean letter: "]
        translations = ["This is sentence translation: ", "This is letter translation: "]
        
        i = 0
        for exercise in exercises:
            route = "http://127.0.0.1:8000/api/download-questions/" + exercise.exercise_slug + "/"
            response = self.client.get(route)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            j = 1
            for question in response.data:
                expected_subex = subexercises[i]
                expected_ques = questions[i] + str(j)
                expected_trans = translations[i] + str(j)
                j += 1
                self.assertEqual(question['question'], expected_ques)
                self.assertEqual(question['translation'], expected_trans)
                self.assertEqual(question['subexercise'], expected_subex)
            i += 1
                       
    # A user should be denied access to this API route 
    def test_user_access_denied(self):
        print("---> Test: API User Denied Access to Download Excel")
        self.client = APIClient()
        access_token = self.get_user_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        exercises = Exercise.objects.filter(allow_audio_files_in_questions=False)
        
        for exercise in exercises:
            route = "http://127.0.0.1:8000/api/download-questions/" + exercise.exercise_slug + "/"
            response = self.client.get(route)
            expected_response = {
                "detail": "You do not have permission to perform this action."
            }
            self.assertEqual(response.data, expected_response)
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    # An invalid subexercise is provided - expect 400 BAD REQUEST
    def test_question_upload_invalid_subexercise(self):
        print("---> Test: API Excel Upload with Invalid Subexercise")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        # An invalid subexercise is provided - expect 400 BAD REQUEST
        data =  [[{"exercise": "letters"}, 
                  [{"subexercise":"C + V", "question":"hello", "translation":"hello-meaning"}, {"subexercise":"Shift C + V", "question":"new", "translation":"new-meaning"}]],
                [{"exercise": "letters"}, 
                  [{"subexercise":"C + V", "question":"hello", "translation":"hello-meaning"}, {"subexercise":"Shift C + V", "question":"new", "translation":"new-meaning"}]]]
            
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        expected_response = 'Subexercise "C + V" does not exist'
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual((response.data['detail']), expected_response)


    # Send valid data to be uploaded to database - expect 201 created
    def test_question_upload_valid_data(self):
        print("---> Test: API Excel Upload with Valid Data")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        data =  [[{"exercise": "short-sentences"}, 
                  [{"subexercise":"Short Sentences", "question":"sentence one", "translation":"s-one-meaning"}, {"subexercise":"Short Sentences", "question":"sentence two", "translation":"s-two-meaning"}]],
                [{"exercise": "letter"}, 
                  [{"subexercise":"Basic Left Hand", "question":"letters one", "translation":"l-one-meaning"}, {"subexercise":"Basic Left Hand", "question":"letters two", "translation":"l-two-meaning"}]]]
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}),  content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
        
        questions = Question.objects.all()
        
        expeced_questions = [
            "This is korean sentence: 1",
            "This is korean sentence: 2",
            "This is korean sentence: 3",
            "This is korean letter: 1",
            "This is korean letter: 2",
            "This is korean letter: 3",
            "sentence one",
            "sentence two",
            "letters one",
            "letters two"
        ]
        expected_translations = [
            "This is sentence translation: 1",
            "This is sentence translation: 2",
            "This is sentence translation: 3",
            "This is letter translation: 1",
            "This is letter translation: 2",
            "This is letter translation: 3",
            "s-one-meaning",
            "s-two-meaning",
            "l-one-meaning",
            "l-two-meaning",
        ]
        
        for i in range(len(questions)):
            self.assertEqual(questions[i].question, expeced_questions[i])
            self.assertEqual(questions[i].translation, expected_translations[i])
         
    # Send data containing questions already in database - expect only distinct new data to be put in database
    def test_question_upload_with_database_duplicates(self):
        print("---> Test: API Excel Upload with Database Duplicate Data")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        data =  [[{"exercise": "short-sentences"}, 
                  [{"subexercise":"Short Sentences", "question":"This is korean sentence: 1", "translation":"This is sentence translation: 1"}, {"subexercise":"Short Sentences", "question":"sentence two", "translation":"s-two-meaning"}]],
                [{"exercise": "letter"}, 
                  [{"subexercise":"Basic Left Hand", "question":"letters one", "translation":"l-one-meaning"}, {"subexercise":"Basic Left Hand", "question":"letters two", "translation":"l-two-meaning"}]]]
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
        
        questions = Question.objects.all()
        self.assertEqual(len(questions), 9)
            
    # Send data containing duplicates - expect only distinct data to be put in database
    # To be a duplicate, the subexercise, sentence and translation must be the same
    def test_question_upload_with_duplicates(self):
        print("---> Test: API Excel Upload with Duplicate Data")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        data =  [[{"exercise": "short-sentences"}, 
                  [{"subexercise":"Short Sentences", "question":"sentence one", "translation":"s-one-meaning"}, {"subexercise":"Short Sentences", "question":"sentence two", "translation":"s-two-meaning"}]],
                [{"exercise": "letter"}, 
                  [{"subexercise":"Basic Left Hand", "question":"letters one", "translation":"l-one-meaning"}, {"subexercise":"Basic Left Hand", "question":"letters one", "translation":"l-one-meaning"}]]]
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        questions = Question.objects.all()
        self.assertEqual(len(questions), 9)
        
    # Tests if when no the subexercises or questions are blank
    # no error is thrown or no empty questions are added
    def test_empty_upload(self):
        print("---> Test: API Excel Upload with Empty Data")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        data = [[{'exercise': 'Letters'}, [{'subexercise': '', 'question': '', 'translation': ''}]], [{'exercise': 'Syllables'}, [{'subexercise': '', 'question': '', 'translation': ''}]], [{'exercise': 'Words'}, [{'subexercise': '', 'question': '', 'translation': ''}]], [{'exercise': 'Short Sentences'}, [{'subexercise': '', 'question': '', 'translation': ''}]], [{'exercise': 'Long Sentences'}, [{'subexercise': '', 'question': '', 'translation': ''}]]]
        
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        questions = Question.objects.all()
        self.assertEqual(len(questions), 6)
       
    # Tests if, when no question is specified, an error message is thrown
    # No questions added if this is the case
    def test_no_question_specified(self):
        print("---> Test: API Excel Upload with Question Left Blank")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        data = [[{'exercise': 'Letters'}, 
                 [{'subexercise': 'Basic Left Hand', 'question': '', 'translation': 'blank'},
                    {'subexercise': 'Basic Left Hand', 'question': 'not blank', 'translation': 'not blank'}]]]
        
        
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        
        expected_response = {
            'detail': 'Specify all questions - some are blank. No questions added.'
        }        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, expected_response)
        questions = Question.objects.all()
        self.assertEqual(len(questions), 6)
        
    # Tests if, when no translation is specified, an error message is thrown
    # No questions added if this is the case
    def test_no_translation_specified(self):
        print("---> Test: API Excel Upload with Translation Left Blank")
        self.client = APIClient()
        access_token = self.get_superuser_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        data = [[{'exercise': 'Letters'}, 
                 [{'subexercise': 'Basic Left Hand', 'question': 'not blank', 'translation': 'blank'},
                    {'subexercise': 'Basic Left Hand', 'question': 'not blank', 'translation': ''}]]]
        
        
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        
        expected_response = {
            'detail': 'Specify all translations - some are blank. No questions added.'
        }        
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, expected_response)
        questions = Question.objects.all()
        self.assertEqual(len(questions), 6)
        
    # Tests if a user is denied access to this API route 
    def test_user_access_denied(self):
        print("---> Test: API User Denied Access to Upload Excel")
        self.client = APIClient()
        access_token = self.get_user_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        data = [[{'exercise': 'Long Sentences'}, [{'subexercise': '', 'question': '', 'translation': ''}]]]
        
        response = self.client.post("http://127.0.0.1:8000/api/upload-questions/", json.dumps({"data":data}), content_type="application/json")
        expected_response = {
            "detail": "You do not have permission to perform this action."
        }
        self.assertEqual(response.data, expected_response)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
                 
         

if __name__ == '__main__':
    TestCase.main(verbosity=2)
