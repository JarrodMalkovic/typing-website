from django.http.response import JsonResponse
from rest_framework.views import APIView
from .serializers import SubexerciseSerializer
from rest_framework.response import Response
from rest_framework import serializers, status, generics
from .models import User
from rest_framework import permissions
from core.practice.models import PracticeAttempt
from django.db.models import Avg, Count
from datetime import timedelta
from django.utils import timezone


class SubexerciseAPIView(APIView):
    def post():
        pass

    def delete():
        pass

    def patch():
        pass
