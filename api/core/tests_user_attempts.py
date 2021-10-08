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

class UserAttemptsTestCase(TestCase):
    def setUp(self):
        print("Setting Up Test Environment")
        user = User.objects.create_user(
            username="testUser1", email="newuser@test.com", password="forttst123")
        exercise = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences",
                                           allow_in_challenge_mode=True, allow_audio_files_in_questions=True, hidden=False)
        subexercise = Subexercise.objects.create(
            exercise_slug=exercise, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)

        attempt1 = PracticeAttempt.objects.create(
            subexercise_slug=subexercise, user=user, wpm=60.0, time_elapsed=10.533, accuracy=95.3, score=57.18)

    # Creates user and a practice attempt for them
    # Deletes the user from database. Check if attempts cascaded on user deletion.
    def test_practice_attempts_cascade_when_user_deleted(self):
        print("---> Test: Practice Attempts Cascading When User Deleted")
        user = User.objects.create_user(
            username="toberemoved", email="remove@test.com", password="rmvtst12!")
        subexercise = Subexercise.objects.filter(
            subexercise_slug="short-sentences").first()
        attempt = PracticeAttempt.objects.create(
            subexercise_slug=subexercise, user=user, wpm=80.0, time_elapsed=15.533, accuracy=85.3, score=68.24)

        query_attempt = PracticeAttempt.objects.filter(user=user).first()
        self.assertEqual(query_attempt.accuracy, 85.3)

        user.delete()

        query_attempt = PracticeAttempt.objects.filter(user=user).first()
        self.assertEqual(query_attempt, None)

    # Creates user and a challenge attempt for them
    # Deletes the user from database. Check if attempts cascaded on user deletion.
    def test_challenge_attempts_cascade_when_user_deleted(self):
        print("---> Test: Challenge Attempts Cascading When User Deleted")
        user = User.objects.create_user(
            username="toberemoved", email="remove@test.com", password="rmvtst12!")
        attempt = ChallengeAttempt.objects.create(
            user=user, wpm=83.0, time_elapsed=14.533, accuracy=81.3, score=67.479)

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
        
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)