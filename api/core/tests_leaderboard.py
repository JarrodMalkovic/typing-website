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

class LeaderboardTestCase(TestCase):
    def setUp(self):
        exercise1 = Exercise.objects.create(exercise_slug="letters", exercise_name="Letters",
                                           allow_in_challenge_mode=True, allow_audio_files_in_questions=True, hidden=False, level=1)
        exercise2 = Exercise.objects.create(exercise_slug="short-sentences", exercise_name="Short Sentences",
                                           allow_in_challenge_mode=True, allow_audio_files_in_questions=True, hidden=False, level=2)
        
        subexercise = Subexercise.objects.create(
            exercise_slug=exercise1, subexercise_slug="basic-left-hand", subexercise_name="Basic Left Hand", level=1)
        subexercise = Subexercise.objects.create(
            exercise_slug=exercise2, subexercise_slug="short-sentences", subexercise_name="Short Sentences", level=1)
        
        self.create_users_and_attempts()
        
        print("Setting Up Test Environment")


    def create_users_and_attempts(self):
        user1 = User.objects.create_user(
            username="newUserTest1", email="newuser1@test.com", password="forttst123")
        user2 = User.objects.create_user(
            username="newUserTest2", email="newuser2@test.com", password="forttst123")
        user3 = User.objects.create_user(
            username="newUserTest3", email="newuser3@test.com", password="forttst123")
        
        subexecerise1 = Subexercise.objects.get(subexercise_slug="basic-left-hand")
        subexecerise2 = Subexercise.objects.get(subexercise_slug="short-sentences")
        attempt1 = PracticeAttempt.objects.create(
                subexercise_slug=subexecerise1, user=user1, wpm=60.0, time_elapsed=9.533, accuracy=85.3, score=50.18)
        attempt1 = PracticeAttempt.objects.create(
                subexercise_slug=subexecerise1, user=user2, wpm=65.0, time_elapsed=12.533, accuracy=93.3, score=60.645)
        attempt1 = PracticeAttempt.objects.create(
                subexercise_slug=subexecerise1, user=user3, wpm=71.0, time_elapsed=11.533, accuracy=76.3, score=54.173)
        
        attempt1 = PracticeAttempt.objects.create(
                subexercise_slug=subexecerise2, user=user1, wpm=65.0, time_elapsed=12.533, accuracy=87.3, score=56.745)
        attempt1 = PracticeAttempt.objects.create(
                subexercise_slug=subexecerise2, user=user2, wpm=62.0, time_elapsed=13.533, accuracy=99.3, score=61.566)
        attempt1 = PracticeAttempt.objects.create(
                subexercise_slug=subexecerise2, user=user3, wpm=75.0, time_elapsed=11.533, accuracy=91.3, score=68.475)
        
        challenge_attempt1 = ChallengeAttempt.objects.create(user=user1, wpm=83.0, time_elapsed=12.533, accuracy=81.3, score=67.479)
        challenge_attempt2 = ChallengeAttempt.objects.create(user=user2, wpm=63.0, time_elapsed=10.453, accuracy=84.3, score=53.109)
        challenge_attempt3 = ChallengeAttempt.objects.create(user=user3, wpm=73.0, time_elapsed=14.739, accuracy=69.3, score=50.589)
        
    def get_user_access_token(self):
        data = {
            "email": "newuser1@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        return access_token
    
    # Testing that all categories leaderboard returns correct data
    def test_all_categories(self):
        print("---> Test: API Test All Categories Leaderboard")
        self.client = APIClient()
        access_token = self.get_user_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        response = self.client.get("http://127.0.0.1:8000/api/questions/leaderboard/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_scores = [68.475, 61.566, 60.645, 56.745, 54.173, 50.18]
        expected_order_of_users = ['newUserTest3', 'newUserTest2', 'newUserTest2', 'newUserTest1', 'newUserTest3', 'newUserTest1']
        
        i = 0
        for q in response.data:
            self.assertEqual(q['score'], expected_scores[i])
            self.assertEqual(q['user']['username'], expected_order_of_users[i])
            i += 1

    # Testing that leaderboard for challenge mode returns correct data
    def test_challenge_mode(self):
        print("---> Test: API Test Challenge Mode Leaderboard")
        self.client = APIClient()
        access_token = self.get_user_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/questions/leaderboard/?category=challenge")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_scores = [67.479, 53.109, 50.589]
        expected_order_of_users = ['newUserTest1', 'newUserTest2', 'newUserTest3']
        
        i = 0
        for q in response.data:
            self.assertEqual(q['score'], expected_scores[i])
            self.assertEqual(q['user']['username'], expected_order_of_users[i])
            i += 1
        
    # Testing that leaderboard for letters mode returns correct data
    def test_specified_category(self):
        print("---> Test: API Test Basic Left Hand Mode Leaderboard")
        self.client = APIClient()
        access_token = self.get_user_access_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get("http://127.0.0.1:8000/api/questions/leaderboard/?category=letters")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_scores = [60.645, 54.173, 50.18]
        expected_order_of_users = ['newUserTest2', 'newUserTest3', 'newUserTest1']
        
        i = 0
        for q in response.data:
            self.assertEqual(q['score'], expected_scores[i])
            self.assertEqual(q['user']['username'], expected_order_of_users[i])
            i += 1
        
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)
