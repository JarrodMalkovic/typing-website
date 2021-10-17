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
        User.objects.create_user(
            username="newUserTest", email="newuser@test.com", password="forttst123")
        
def get_user_access_token(self):
        user = User.objects.create_user(
            username="newUserTest", email="newuser@test.com", password="forttst123")
        data = {
            "email": "newuser@test.com",
            "password": "forttst123"
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        return access_token
    
def test_all_categories(self):
    pass

def test_challenge_mode(self):
    pass

def test_specified_category(self):
    pass
        
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)