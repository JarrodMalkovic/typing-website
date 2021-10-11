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
        User.objects.create_user(
            username="newUserTest", email="newuser@test.com", password="forttst123")
        print("Setting Up Test Environment")

    # Tests successful creation of a user
    # Should not be a superuser or staff
    def test_create_user(self):
        print("---> Test: Create User")
        user = User.objects.create_user(
            username="anders123", email="c@test.com", password="forttst123")

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
            User.objects.create_user(
                username=None, email="test@test.com", password="forttst123")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(
                username=None, email="supertest@test.com", password="supPas123")

    # Tests if correct error message is raied when username is not provided
    def test_raises_error_message_when_no_username_provided(self):
        print("---> Test: Error Msg When No Username Provided")
        with self.assertRaisesMessage(TypeError, 'Users must have a username.'):
            user = User.objects.create_user(
                username=None, email="c@test.com", password="forttst123")
        with self.assertRaisesMessage(TypeError, 'Superusers must have an username.'):
            user = User.objects.create_superuser(
                username=None, email="super@test.com", password="supPas123")

    # Tests if correct error is raied when email is not provided
    def test_raise_error_when_no_email_provided(self):
        print("---> Test: Error When No Email Provided")
        with self.assertRaises(TypeError):
            User.objects.create_user(
                username="anders123", email=None, password="forttst123")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(
                username="superUse", email=None, password="supPas123")

    # Tests if correct error message is raied when email is not provided
    def test_raises_error_message_when_no_email_provided(self):
        print("---> Test: Error Msg When No Email Provided")
        with self.assertRaisesMessage(TypeError, 'Users must have an email.'):
            user = User.objects.create_user(
                username="anders123", email=None, password="forttst123")
        with self.assertRaisesMessage(TypeError, 'Superusers must have an email.'):
            user = User.objects.create_superuser(
                username="superUse", email=None, password="supPas123")

    # Tests if the correct status code is returned when user registers
    def test_API_registration(self):
        print("---> Test: API Register an Account")
        data = {
            "username": "testUser",
            "email": "tester@test.com",
            "password": "542ghdw#!s",
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Tests if the correct status code is returned when user registers with invalid credentials
    def test_API_registration_with_invalid_credentials(self):
        print("---> Test: API Register an Account With Invalid Credentials")
        # No email provided
        data = {
            "username": "testUser",
            "password": "542ghdw#!s",
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'email': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # No username provided
        data = {
            "email": "tester@test.com",
            "password": "542ghdw#!s",
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'username': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # No password provided
        data = {
            "username": "testUser",
            "email": "tester@test.com",
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'password': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # No data provided
        data = {}
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/register/", data)
        response_data = json.loads(response.content.decode('utf-8'))
        expected_response_data = {'username': ['This field is required.'], 'email': [
            'This field is required.'], 'password': ['This field is required.']}
        self.assertEqual(response_data, expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Tests if the correct status code is returned when user logs in
    def test_API_login(self):
        print("---> Test: API Logging In")
        data = {
            "email": "newuser@test.com",
            "password": "forttst123"
        }

        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Tests if the correct status code is returned when user logs in with invalid credentials
    def test_API_login_with_invalid_credentials(self):
        # invalid password
        print("---> Test: API Logging In With Invalid Credentials")
        data = {
            "email": "newuser@test.com",
            "password": "fortst123"
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # invalid email
        data = {
            "email": "invalid@test.com",
            "password": "forttst123"
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Tests if the current user API route provides the correct data
    def test_API_current_user(self):
        print("---> Test: API Get the Current User")
        self.client = APIClient()
        user = User.objects.create_superuser(
            username="testUser2", email="newuser2@test.com", password="forttst123")
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/current-user/")
        expected_response = {
            'detail': 'Authentication credentials were not provided.'}
        self.assertEqual(response.data, expected_response)

        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post(
            "http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(
            "http://127.0.0.1:8000/api/auth/current-user/")
        self.assertEqual(response.data['username'], 'testUser2')
        self.assertEqual(response.data['email'], 'newuser2@test.com')
        self.assertNotEqual(response.data['avatar'], None)
        
    # Tests if the delete user API route successfully deletes the user
    # Without deleting others
    def test_delete_user(self):
        print("---> Test: API Delete the Current User")
        self.client = APIClient()
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        user2 = User.objects.create_user(username="testUser3", email="newuser3@test.com", password="forttst123")
    
        user_query = User.objects.filter(email="newuser2@test.com").first()
        self.assertEqual(user_query.email, "newuser2@test.com")
        user_query = User.objects.filter(email="newuser3@test.com").first()
        self.assertEqual(user_query.email, "newuser3@test.com")
        
        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.delete("http://127.0.0.1:8000/api/user/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_query = User.objects.filter(email="newuser2@test.com").first()
        self.assertIsNone(user_query)
        user_query = User.objects.filter(email="newuser3@test.com").first()
        self.assertEqual(user_query.email, "newuser3@test.com")

    # Tests if the ban user API route cannot be accessed by non-admins
    def test_ban_user_by_user(self):
        print("---> Test: API Ban User Route Inaccessible by Non-Admin")
        self.client = APIClient()
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        user2 = User.objects.create_user(username="testUser3", email="newuser3@test.com", password="forttst123")
        self.assertFalse(user.is_staff)
                
        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/user/" + str(user2.id) + "/ban/"
        response = self.client.delete(route)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    
    # Tests if the ban user API route successfully bans the user
    # Without banning others
    def test_ban_user(self):
        print("---> Test: API Ban a Specified User")
        self.client = APIClient()
        super_user = User.objects.create_superuser(username="testsuperUser2", email="newsuperuser2@test.com", password="forttst123")
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        user2 = User.objects.create_user(username="testUser3", email="newuser3@test.com", password="forttst123")
            
        user_query_1 = User.objects.filter(email="newuser2@test.com").first()
        self.assertEqual(user_query_1.email, "newuser2@test.com")
        user_query_2 = User.objects.filter(email="newuser3@test.com").first()
        self.assertEqual(user_query_2.email, "newuser3@test.com")
                
        data = {
            "email": "newsuperuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/user/" + str(user_query_1.id) + "/ban/"
        response = self.client.delete(route)
        user_query = User.objects.filter(email="newuser2@test.com").first()
        self.assertIsNone(user_query)
        user_query = User.objects.filter(email="newuser3@test.com").first()
        self.assertEqual(user_query.email, "newuser3@test.com")
        
        
    # Tests if the promote user API route cannot be accessed by non-admins
    def test_promote_user_by_user(self):
        print("---> Test: API Promote User Route Inaccessible by Non-Admin")
        self.client = APIClient()
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        user2 = User.objects.create_user(username="testUser3", email="newuser3@test.com", password="forttst123")
        self.assertFalse(user.is_staff)
                
        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/user/" + str(user2.id) + "/promote/"
        response = self.client.patch(route)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
            
    # Tests if the promote user API route successfully promotes the user
    # Without promoting others
    def test_promote_user(self):
        print("---> Test: API Ban a Specified User")
        self.client = APIClient()
        super_user = User.objects.create_superuser(username="testsuperUser2", email="newsuperuser2@test.com", password="forttst123")
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        user2 = User.objects.create_user(username="testUser3", email="newuser3@test.com", password="forttst123")
            
        self.assertTrue(super_user.is_staff)
        self.assertFalse(user.is_staff)
        self.assertFalse(user2.is_staff)
                
        data = {
            "email": "newsuperuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/user/" + str(user.id) + "/promote/"
        response = self.client.patch(route)
        user_query = User.objects.filter(email="newsuperuser2@test.com").first()
        self.assertTrue(user_query.is_staff)
        user_query = User.objects.filter(email="newuser2@test.com").first()
        self.assertTrue(user_query.is_staff)
        user_query = User.objects.filter(email="newuser3@test.com").first()
        self.assertFalse(user_query.is_staff)
        
    # Tests if the demote user API route cannot be accessed by non-admins
    def test_demote_user_by_user(self):
        print("---> Test: API Demote User Route Inaccessible by Non-Admin")
        self.client = APIClient()
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        user2 = User.objects.create_user(username="testUser3", email="newuser3@test.com", password="forttst123")
        self.assertFalse(user.is_staff)
                
        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/user/" + str(user2.id) + "/demote/"
        response = self.client.patch(route)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    # Tests if the demote user API route successfully demotes the user
    # Without demoting others
    def test_demote_user(self):
        print("---> Test: API Demote a Specified User")
        self.client = APIClient()
        super_user = User.objects.create_superuser(username="testsuperUser2", email="newsuperuser2@test.com", password="forttst123")
        super_user2 = User.objects.create_superuser(username="testUser2", email="newuser2@test.com", password="forttst123")
        super_user3 = User.objects.create_superuser(username="testUser3", email="newuser3@test.com", password="forttst123")
            
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user2.is_staff)
        self.assertTrue(super_user3.is_staff)
                
        data = {
            "email": "newsuperuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/user/" + str(super_user2.id) + "/demote/"
        response = self.client.patch(route)
        user_query = User.objects.filter(email="newsuperuser2@test.com").first()
        self.assertTrue(user_query.is_staff)
        user_query = User.objects.filter(email="newuser2@test.com").first()
        self.assertFalse(user_query.is_staff)
        user_query = User.objects.filter(email="newuser3@test.com").first()
        self.assertTrue(user_query.is_staff)
        
    # Tests if the demote user API route cannot be accessed by non-admins
    def test_get_all_users_by_user(self):
        print("---> Test: API Get All Users Route Inaccessible by Non-Admin")
        self.client = APIClient()
        user = User.objects.create_user(username="testUser2", email="newuser2@test.com", password="forttst123")
        self.assertFalse(user.is_staff)
                
        data = {
            "email": "newuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/users/?limit=5&page=1"
        response = self.client.get(route)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    # Tests that the correct users are returned for a given 
    # page limit and specified page number
    def test_get_all_users(self):
        print("---> Test: API Users")
        self.client = APIClient()
        super_user = User.objects.create_superuser(username="testsuperUser2", email="newsuperuser2@test.com", password="forttst123")
        for i in range(15):
            username = "testingUser" + str(i)
            email = "testingUser" + str(i) + "@test.com"
            User.objects.create_user(username=username, email=email, password="forttst123")
             
        data = {
            "email": "newsuperuser2@test.com",
            "password": "forttst123"
        }
        response = self.client.post("http://127.0.0.1:8000/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        
        route = "http://127.0.0.1:8000/api/users/?limit=5&page=1"
        response = self.client.get(route)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(response.data['pages'], 4)
        index = 3
        for user in response.data['users']:
            self.assertEqual(user['email'], "testingUser" + str(index) + "@test.com")
            index += 1
        
        
if __name__ == '__main__':
    TestCase.main(verbosity=2)