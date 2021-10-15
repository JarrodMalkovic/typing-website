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

# Test all question routes
class QuestionTestCase(TestCase):
    def setUp(self):
        print("Setting Up Test Environment")
        exercise = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences",
                                           allow_in_challenge_mode=True, allow_audio_files_in_questions=True, hidden=False)
        subexercise = Subexercise.objects.create(
            exercise_slug=exercise, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)
        Question.objects.create(
            subexercise_slug=subexercise, question="This is korean sentence 1")
        Question.objects.create(
            subexercise_slug=subexercise, question="This is korean sentence 2")
        questions = Question.objects.all()   
    
    def get_access_token(self):
        user = User.objects.create_superuser(
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

    def test_get_exercise(self):
        print("---> Test: Get exercise")
        exercise = Exercise.objects.all().first()
        self.assertEqual(exercise.exercise_name, "Short Sentences")

    def test_get_subexercise(self):
        print("---> Test: Get subexercise")
        subexercise = Subexercise.objects.all().first()
        self.assertEqual(subexercise.subexercise_name, "Short Sentences")

    def test_get_all_questions(self):
        print("---> Test: Get all questions")
        questions = Question.objects.all()

        self.assertEqual(len(questions), 2)
        self.assertEqual(questions[0].question, "This is korean sentence 1")
        self.assertEqual(questions[1].question, "This is korean sentence 2")

    def make_questions(self):
        subexercise = Subexercise.objects.filter(
            subexercise_slug="short-sentences").first()
        for i in range(3, 16):
            sentence = "This is korean sentence " + str(i)
            Question.objects.create(
                subexercise_slug=subexercise, question=sentence)

    # Query questions by their ID - expect valid ID's to return the questions
    def test_API_Question_by_id(self):
        print("---> Test: API Get question by specifying question ID")
        q_ids = []
        questions = Question.objects.all()
        for q in questions:
            q_ids.append(q.id)
        num = 1
        while num in q_ids:
            num += 1
            
        self.client = APIClient()
        access_token = self.get_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        route = "http://127.0.0.1:8000/api/questions/" + str(q_ids[0]) + "/"
        response = self.client.get(route)
        self.assertEqual(response.data['question'],
                         "This is korean sentence 1")
        route = "http://127.0.0.1:8000/api/questions/" + str(q_ids[1]) + "/"
        response = self.client.get(route)
        self.assertEqual(response.data['question'],
                         "This is korean sentence 2")
        fail_route = "http://127.0.0.1:8000/api/questions/" + str(num) + "/"
        response = self.client.get(fail_route)
        self.assertEqual(response.data, {"detail": "Not found."})

        # Use PUT to update the question with proper data
        subexercise = Subexercise.objects.filter(
            subexercise_slug="short-sentences").first()
        data = {
            "question": "Korean sentence 2 updated",
            "translation": "Translation updated",
            "subexercise_slug": "short-sentences"
        }
        response = self.client.put(route, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['question'],
                         "Korean sentence 2 updated")

        # Update question without providing translation - should return BAD REQUEST
        data = {
            "question": "Korean sentence 2 updated",
            "subexercise_slug": "short-sentences"
        }
        expected_response = {
            "translation": [
                "This field is required."
            ]
        }
        response = self.client.put(route, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, expected_response)

    # Create questions for different subexercises, under the same exercise
    # Query the exercise - expect it to return all questions created
    # Query a non-existent exercise - expect it to return nothing
    def test_API_Question_by_xercise_Name(self):
        print("---> Test: API Get question by specifying question's exercise")
        exercise = Exercise.objects.create(exercise_slug="words", exercise_name="Words",
                                           allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
        subexercise = Subexercise.objects.create(
            exercise_slug=exercise, subexercise_slug="two-syllables", subexercise_name="Two Syllables", level=1)
        subexercise2 = Subexercise.objects.create(
            exercise_slug=exercise, subexercise_slug="three-syllables", subexercise_name="Three Syllables", level=1)
        for i in range(10):
            ques = "word" + str(i)
            Question.objects.create(
                subexercise_slug=subexercise, question=ques)
        for i in range(10, 15):
            ques = "word" + str(i)
            Question.objects.create(
                subexercise_slug=subexercise2, question=ques)

        self.client = APIClient()
        access_token = self.get_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(
            "http://127.0.0.1:8000/api/questions/exercise/words/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        i = 0
        for item in response.data:
            ques = "word" + str(i)
            self.assertEqual(item['question'], ques)
            i += 1

        response = self.client.get(
            "http://127.0.0.1:8000/api/questions/exercise/inexistent/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    # Create questions for two different subexercises
    # Query the level 1 subexercise - expect it to return questions
    # Query the level 2 subexercise - expect it to return error
    # Create a practice attempt for the level 1 subexercise
    # Query the level 2 subexercise - expect it to return questions
    # Query the a non-existent subexercise - expect it to return nothing
    def test_API_Question_by_Subxercise_Name(self):
        print("---> Test: API Get question by specifying question's subexercise")
        exercise = Exercise.objects.create(exercise_slug="words", exercise_name="Words",
                                           allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
        subexercise = Subexercise.objects.create(
            exercise_slug=exercise, subexercise_slug="two-syllables", subexercise_name="Two Syllables", level=1)
        subexercise2 = Subexercise.objects.create(
            exercise_slug=exercise, subexercise_slug="three-syllables", subexercise_name="Three Syllables", level=2)
        for i in range(10):
            ques = "word" + str(i)
            Question.objects.create(
                subexercise_slug=subexercise, question=ques)
        for i in range(10, 15):
            ques = "word" + str(i)  # word10 word11 word12 word13 word14
            Question.objects.create(
                subexercise_slug=subexercise2, question=ques)

        self.client = APIClient()
        access_token = self.get_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(
            "http://127.0.0.1:8000/api/questions/subexercise/two-syllables/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        i = 0
        for item in response.data:
            ques = "word" + str(i)
            self.assertEqual(item['question'], ques)
            i += 1

        response = self.client.get(
            "http://127.0.0.1:8000/api/questions/subexercise/three-syllables/")
        self.assertEqual(response.status_code,
                         status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {
                         'detail': 'You must complete previous subexercises before this one'})

        user = User.objects.filter(email="newuser@test.com").first()
        attempt = PracticeAttempt.objects.create(
            subexercise_slug=subexercise, user=user, wpm=80.0, time_elapsed=15.533, accuracy=85.3, score=68.24)
        response = self.client.get(
            "http://127.0.0.1:8000/api/questions/subexercise/three-syllables/")
        i = 10
        for item in response.data:
            ques = "word" + str(i)
            self.assertEqual(item['question'], ques)
            i += 1

        response = self.client.get(
            "http://127.0.0.1:8000/api/questions/subexercise/inexistent/")
        expected_response = {
            'detail': 'This subexercise does not exist'
        }      
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, expected_response)

    # Get questions for challenge mode - expect it to return 10 questions
    def test_get_API_challenge_questions(self):
        print("---> Test: API Get all challenge questions from API route")
        self.client = APIClient()
        access_token = self.get_access_token()

        expected_response = {
            "detail": "Authentication credentials were not provided."
        }
        response = self.client.get("http://127.0.0.1:8000/api/challenge/")
        self.assertEqual(response.data, expected_response)

        self.make_questions()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/challenge/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check if it generated 10 random questions
        self.assertEqual(len(response.data), 10)
        
    def test_admin_delete_question(self):
        print("---> Test: API Test Admin Deleting Question")
        self.client = APIClient()
        access_token = self.get_access_token()

        expected_response = {
            "detail": "Authentication credentials were not provided."
        }
        response = self.client.get("http://127.0.0.1:8000/api/questions/")
        self.assertEqual(response.data, expected_response)

        q_id = Question.objects.get(question="This is korean sentence 2")
        q_ids = [q_id.id]
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.delete("http://127.0.0.1:8000/api/questions/", json.dumps({"questions":q_ids}), content_type="application/json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, q_ids)
        
        try: 
            Question.objects.get(question="This is korean sentence 2")
        except:
            self.assertRaises(Question.DoesNotExist)
            
    def test_admin_create_question(self):
        print("---> Test: API Test Admin Creating Question")
        self.client = APIClient()
        access_token = self.get_access_token()

        expected_response = {
            "detail": "Authentication credentials were not provided."
        }
        response = self.client.get("http://127.0.0.1:8000/api/questions/")
        self.assertEqual(response.data, expected_response)

        data = {
            "question": "This is a new question",
            "subexercise_slug": "short-sentences",
            "translation": "New question translation"
        }
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.post("http://127.0.0.1:8000/api/questions/", json.dumps(data), content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['question'], data['question'])
        self.assertEqual(response.data['subexercise_slug'], data['subexercise_slug'])
        self.assertEqual(response.data['translation'], data['translation'])
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)