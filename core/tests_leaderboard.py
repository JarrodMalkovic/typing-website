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
        pass
    
def test_all_categories(self):
    pass

def test_challenge_mode(self):
    pass

def test_specified_category(self):
    pass
        
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)