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


# class ExcelDocumentTestCase(TestCase):
#     def setUp(self):
#         # Exercise = short-sentences
#         exercise1 = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences",
#                                            allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
#         # Exercise = letters
#         exercise2 = Exercise.objects.create(exercise_slug="letters", exercise_name="Letters",
#                                            allow_in_challenge_mode=True, allow_audio_files_in_questions=False, hidden=False)
        
#         # Subexercise = short-sentences
#         subexercise1 = Subexercise.objects.create(
#             exercise_slug=exercise1, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)
#         # Subexercise = basic-left-hand
#         subexercise2 = Subexercise.objects.create(
#             exercise_slug=exercise2, subexercise_slug="basic-left-hand", subexercise_name="Basic Left Hand", level=1)
        
#         # Make 3 questions for short-sentences
#         for i in range(3):
#             ques = "This is korean sentence: " + str(i)
#             translation = "This is sentence translation: " + str(i)
#             Question.objects.create(subexercise_slug=subexercise1, question=ques, translation=translation)
        
#         # Make 3 questions for basic-left-hand
#         for i in range(3):
#             ques = "This is korean letter: " + str(i)
#             translation = "This is letter translation: " + str(i)
#             Question.objects.create(subexercise_slug=subexercise2, question=ques, translation=translation)
    
#     def get_superuser_access_token(self):
#         user = User.objects.create_superuser(
#             username="testSuperUser1", email="newsuperuser@test.com", password="forttst123")
#         data = {
#             "email": "newsuperuser@test.com",
#             "password": "forttst123"
#         }
#         response = self.client.post(
#             "http://127.0.0.1:8000/api/auth/login/", data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         access_token = response.data["access"]
#         return access_token
    
#     def get_user_access_token(self):
#         user = User.objects.create_user(
#             username="testUser1", email="newuser@test.com", password="forttst123")
#         data = {
#             "email": "newuser@test.com",
#             "password": "forttst123"
#         }
#         response = self.client.post(
#             "http://127.0.0.1:8000/api/auth/login/", data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         access_token = response.data["access"]
#         return access_token
      
#     # For every exercise with no audio files
#     # Call the download files route
#     def test_question_download(self):
#         self.client = APIClient()
#         access_token = self.get_superuser_access_token()
#         self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
#         exercises = Exercise.objects.filter(allow_audio_files_in_questions=False)
        
#         for exercise in exercises:
#             route = "http://127.0.0.1:8000/api/download-questions/" + exercise.exercise_slug + "/"
#             response = self.client.get(route)
#             print(response)
#             print(response.data)
#         # self.assertEqual(response.status_code, status.HTTP_200_OK)
#         pass

#     def test_question_upload(self):
#         pass


if __name__ == '__main__':
    TestCase.main(verbosity=2)
