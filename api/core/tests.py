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
        
# User and Superuser Testing   
class UserTestCase(APITestCase):
    def setUp(self):
        User.objects.create_user(username="newUserTest", email="newuser@test.com", password="forttst123")
        print("Setting Up Test Environment")
        
    # Tests successful creation of a user
    # Should not be a superuser or staff
    def test_create_user(self):
        print("---> Test: Create User")
        user = User.objects.create_user(username="anders123", email="c@test.com", password="forttst123")
        
        self.assertIsInstance(user, User)
        self.assertEqual(user.email, "c@test.com")
        self.assertEqual(user.username, "anders123")
        self.assertTrue(user.check_password("forttst123"))
        self.assertFalse(user.check_password("fortst123"))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        
    # Tests successful creation of a superuser
    def test_create_superuser(self):
        print("---> Test: Create Superuser")
        super_user = User.objects.create_superuser(username="superUser", 
                                                    email="super@test.com", password="supPas123")
    
        self.assertIsInstance(super_user, User)
        self.assertEqual(super_user.email, "super@test.com")
        self.assertEqual(super_user.username, "superUser")
        self.assertTrue(super_user.check_password("supPas123"))
        self.assertFalse(super_user.check_password("supPas143"))
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user.is_superuser)
      
    # Tests if correct error is raied when username is not provided  
    def test_raise_error_when_no_username_provided(self):
        print("---> Test: Error When No Username Provided")
        with self.assertRaises(TypeError):
            User.objects.create_user(username=None, email="test@test.com", password="forttst123")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(username=None, email="supertest@test.com", password="supPas123")
        
    # Tests if correct error message is raied when username is not provided
    def test_raises_error_message_when_no_username_provided(self):
        print("---> Test: Error Msg When No Username Provided")
        with self.assertRaisesMessage(TypeError, 'Users must have a username.'):
            user = User.objects.create_user(username=None, email="c@test.com", password="forttst123")
        with self.assertRaisesMessage(TypeError, 'Superusers must have an username.'):
            user = User.objects.create_superuser(username=None, email="super@test.com", password="supPas123")
    
    # Tests if correct error is raied when email is not provided 
    def test_raise_error_when_no_email_provided(self):
        print("---> Test: Error When No Email Provided")
        with self.assertRaises(TypeError):
            User.objects.create_user(username="anders123", email=None, password="forttst123")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(username="superUse", email=None, password="supPas123")

    # Tests if correct error message is raied when email is not provided
    def test_raises_error_message_when_no_email_provided(self):
        print("---> Test: Error Msg When No Email Provided")
        with self.assertRaisesMessage(TypeError, 'Users must have an email.'):
            user = User.objects.create_user(username="anders123", email=None, password="forttst123")
        with self.assertRaisesMessage(TypeError, 'Superusers must have an email.'):
            user = User.objects.create_superuser(username="superUse", email=None, password="supPas123")
          
    # Tests if the correct status code is returned when user registers
    def test_API_registration(self):
        print("---> Test: API Register an Account")
        data = {
            "username": "testUser",
            "email": "tester@test.com",
            "password": "542ghdw#!s",
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    # Tests if the correct status code is returned when user registers with invalid credentials
    def test_API_registration_with_invalid_credentials(self):
        print("---> Test: API Register an Account With Invalid Credentials")
        # No email provided
        data = {
            "username": "testUser",
            "password": "542ghdw#!s",
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'email': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # No username provided
        data = {
            "email": "tester@test.com",
            "password": "542ghdw#!s",
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'username': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # No password provided
        data = {
            "username": "testUser",
            "email": "tester@test.com",
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'password': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # No data provided
        data = {}
        response = self.client.post("http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'username': ['This field is required.'], 'email': ['This field is required.'], 'password': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    # Tests if the correct status code is returned when user logs in
    def test_API_login(self):
        print("---> Test: API Logging In")
        data = {
            "email": "newuser@test.com", 
            "password": "forttst123"
        }
        
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    # Tests if the correct status code is returned when user logs in with invalid credentials
    def test_API_login_with_invalid_credentials(self):
        #invalid password
        print("---> Test: API Logging In With Invalid Credentials")
        data = {
            "email": "newuser@test.com", 
            "password": "fortst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        #invalid email
        data = {
            "email": "invalid@test.com", 
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_API_current_user(self):
        self.client = APIClient()
        user = User.objects.create_superuser(username="testUser2", email="newuser2@test.com", password="forttst123")
        response = self.client.post("http://127.0.0.1:8000/api/auth/current-user/")
        expected_response = {'detail': 'Authentication credentials were not provided.'}
        self.assertEqual(response.data, expected_response)
        
        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/auth/current-user/")
        self.assertEqual(response.data['username'], 'testUser2')
        self.assertEqual(response.data['email'], 'newuser2@test.com')
        self.assertNotEqual(response.data['avatar'], None)
        
class QuestionTestCase(TestCase):
    def setUp(self):
        print("Setting Up Test Environment")
        exercise = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences", allow_in_challenge_mode=True, allow_audio_files_in_questions=True, hidden=False)
        subexercise = Subexercise.objects.create(exercise_slug=exercise, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)
        Question.objects.create(subexercise_slug=subexercise, question="This is korean sentence 1")
        Question.objects.create(subexercise_slug=subexercise, question="This is korean sentence 2")
    
    def get_access_token(self):
        user = User.objects.create_superuser(username="testUser1", email="newuser@test.com", password="forttst123")
        data = {
            "email": "newuser@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
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
        subexercise = Subexercise.objects.filter(subexercise_slug="short-sentences").first()
        for i in range(3, 16):
            sentence = "This is korean sentence " + str(i)
            Question.objects.create(subexercise_slug=subexercise, question=sentence)
    
    # Query questions by their ID - expect valid ID's to return the questions
    def test_API_Question_by_ID(self):    
        print("---> Test: API Get question by specifying question ID")
        self.client = APIClient()
        access_token = self.get_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/questions/1/")
        self.assertEqual(response.data['question'], "This is korean sentence 1")
        response = self.client.get("http://127.0.0.1:8000/api/questions/2/")
        self.assertEqual(response.data['question'], "This is korean sentence 2")
        response = self.client.get("http://127.0.0.1:8000/api/questions/3/")
        self.assertEqual(response.data, {"detail": "Not found."})
        
        subexercise = Subexercise.objects.filter(subexercise_slug="short-sentences").first()
        data = {
            "question": "Korean sentence 2 updated",
            "subexercise_slug": "short-sentences"
        }
        response = self.client.put("http://127.0.0.1:8000/api/questions/2/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['question'], "Korean sentence 2 updated")
        
    # Create questions for different subexercises, under the same exercise
    # Query the exercise - expect it to return all questions created
    # Query a non-existent exercise - expect it to return nothing
    def test_API_Question_by_xercise_Name(self):    
        print("---> Test: API Get question by specifying question's exercise")
        exercise = Exercise.objects.create(exercise_slug="words", exercise_name="Words", allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
        subexercise = Subexercise.objects.create(exercise_slug=exercise, subexercise_slug="two-syllables", subexercise_name="Two Syllables", level=1)
        subexercise2 = Subexercise.objects.create(exercise_slug=exercise, subexercise_slug="three-syllables", subexercise_name="Three Syllables", level=1)
        for i in range(10):
            ques = "word" + str(i)
            Question.objects.create(subexercise_slug=subexercise, question=ques)
        for i in range(10, 15):
            ques = "word" + str(i)
            Question.objects.create(subexercise_slug=subexercise2, question=ques)
        
        self.client = APIClient()
        access_token = self.get_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/questions/exercise/words/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        i = 0
        for item in response.data:
            ques = "word" + str(i)
            self.assertEqual(item['question'], ques)
            i += 1
            
        response = self.client.get("http://127.0.0.1:8000/api/questions/exercise/inexistent/")
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
        exercise = Exercise.objects.create(exercise_slug="words", exercise_name="Words", allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
        subexercise = Subexercise.objects.create(exercise_slug=exercise, subexercise_slug="two-syllables", subexercise_name="Two Syllables", level=1)
        subexercise2 = Subexercise.objects.create(exercise_slug=exercise, subexercise_slug="three-syllables", subexercise_name="Three Syllables", level=2)
        for i in range(10):
            ques = "word" + str(i)
            Question.objects.create(subexercise_slug=subexercise, question=ques)
        for i in range(10, 15):
            ques = "word" + str(i) #word10 word11 word12 word13 word14
            Question.objects.create(subexercise_slug=subexercise2, question=ques)
        
        self.client = APIClient()
        access_token = self.get_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/questions/subexercise/two-syllables/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        i = 0
        for item in response.data:
            ques = "word" + str(i)
            self.assertEqual(item['question'], ques)
            i += 1
            
        response = self.client.get("http://127.0.0.1:8000/api/questions/subexercise/three-syllables/")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {'detail': 'You must complete previous subexercises before this one'})
        
        user = User.objects.filter(email="newuser@test.com").first()
        attempt = PracticeAttempt.objects.create(subexercise_slug=subexercise, user=user, wpm=80.0, time_elapsed=15.533, accuracy=85.3, score=68.24)
        response = self.client.get("http://127.0.0.1:8000/api/questions/subexercise/three-syllables/")
        i = 10
        for item in response.data:
            ques = "word" + str(i)
            self.assertEqual(item['question'], ques)
            i += 1
        
        response = self.client.get("http://127.0.0.1:8000/api/questions/subexercise/inexistent/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])
    
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
        
class UserAttemptsTestCase(TestCase):
    def setUp(self):
        print("Setting Up Test Environment")
        user = User.objects.create_user(username="testUser1", email="newuser@test.com", password="forttst123")
        exercise = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences", allow_in_challenge_mode=True, allow_audio_files_in_questions=True, hidden=False)
        subexercise = Subexercise.objects.create(exercise_slug=exercise, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)
        
        attempt1 = PracticeAttempt.objects.create(subexercise_slug=subexercise, user=user, wpm=60.0, time_elapsed=10.533, accuracy=95.3, score=57.18)
        
    # Creates user and a practice attempt for them
    # Deletes the user from database. Check if attempts cascaded on user deletion.
    def test_practice_attempts_cascade_when_user_deleted(self):
        print("---> Test: Practice Attempts Cascading When User Deleted")
        user = User.objects.create_user(username="toberemoved", email="remove@test.com", password="rmvtst12!")
        subexercise = Subexercise.objects.filter(subexercise_slug="short-sentences").first()
        attempt = PracticeAttempt.objects.create(subexercise_slug=subexercise, user=user, wpm=80.0, time_elapsed=15.533, accuracy=85.3, score=68.24)
        
        query_attempt = PracticeAttempt.objects.filter(user=user).first()
        self.assertEqual(query_attempt.accuracy, 85.3)
        
        user.delete()
        
        query_attempt = PracticeAttempt.objects.filter(user=user).first()
        self.assertEqual(query_attempt, None)
        
    # Creates user and a challenge attempt for them
    # Deletes the user from database. Check if attempts cascaded on user deletion.
    def test_challenge_attempts_cascade_when_user_deleted(self):
        print("---> Test: Challenge Attempts Cascading When User Deleted")
        user = User.objects.create_user(username="toberemoved", email="remove@test.com", password="rmvtst12!")
        attempt = ChallengeAttempt.objects.create(user=user, wpm=83.0, time_elapsed=14.533, accuracy=81.3, score=67.479)
        
        query_attempt = ChallengeAttempt.objects.filter(user=user).first()
        self.assertEqual(query_attempt.accuracy, 81.3)
        
        user.delete()
        
        query_attempt = ChallengeAttempt.objects.filter(user=user).first()
        self.assertEqual(query_attempt, None)
        
    # ----- Figure this route out later -----
    # http://127.0.0.1:8000/api/auth/login/
    # def test_get_API_question_attempts(self):
    #     # If category not specified, it returns all attempts
    #     # If category specified - can be for either challenge or for
    #     # one of the practice attempts
        
    #     print("---> Test: API Get all attempts made by user")
    #     self.client = APIClient()
    #     user = User.objects.filter(email="newuser@test.com").first()
    #     user2 = User.objects.create_superuser(username="testUser2", email="newuser2@test.com", password="forte$t123")
        
    #     # Make attempts for each user
    #     for i in range(0, 3):
    #         challenge_attempt = ChallengeAttempt.objects.create(user=user, wpm=(83.0 + i), time_elapsed=14.533, accuracy=(81.3 - i), score=67.479)
            
    #     # print(ChallengeAttempt.objects.all())
            
    #     for i in range(0, 3):
    #         challenge_attempt = ChallengeAttempt.objects.create(user=user2, wpm=(78.0 - i), time_elapsed=12.533, accuracy=(82.3 + i), score=54.479)
            
        
    #     data = {
    #         "email": "newuser2@test.com",
    #         "password": "forte$t123"
    #     }
    #     response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     access_token = response.data["access"]
        
    #     expected_response = {
    #         "detail": "Authentication credentials were not provided."
    #     }
    #     response = self.client.get("http://127.0.0.1:8000/api/questions/attempts/")
    #     self.assertEqual(response.data, expected_response)
        
    #     self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
    #     response = self.client.get("http://127.0.0.1:8000/api/questions/attempts/")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    #     print(response.data)
        
class LeaderboardTestCase(TestCase):
    pass
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)