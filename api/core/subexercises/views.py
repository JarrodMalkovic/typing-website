from myapi.permissions import IsAdminUserOrReadOnlyAndIsAuthenticated
from django.http.response import JsonResponse
from rest_framework.views import APIView
from .serializers import SubexerciseSerializer
from rest_framework.response import Response
from rest_framework import serializers, status, generics
from .models import Subexercise
from rest_framework import permissions
from core.practice.models import PracticeAttempt
from django.db.models import Avg, Count
from datetime import timedelta
from django.utils import timezone
from django.db.models import F
from bulk_update.helper import bulk_update


class SubexerciseAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, _, subexercise_slug):
        deleted_subexercise = Subexercise.objects.get(
            subexercise_slug=subexercise_slug)

        serializer = SubexerciseSerializer(deleted_subexercise)
        deleted_subexercise.delete()

        Subexercise.objects.filter(exercise_slug=deleted_subexercise.exercise_slug, level__gt=deleted_subexercise.level) \
            .update(level=F('level') - 1)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, subexercise_slug):
        subexercise = Subexercise.objects.get(
            subexercise_slug=subexercise_slug)

        serializer = SubexerciseSerializer(subexercise,
                                           data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateSubexerciseAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        subexercises = Subexercise.objects.filter(
            exercise_slug=request.data.get('exercise_slug'))

        request.data.update({"level": len(subexercises) + 1})

        serializer = SubexerciseSerializer(
            data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReorderSubexercisesAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, exercise_slug):

        subexercises = Subexercise.objects.filter(exercise_slug=exercise_slug)

        for subexercise in subexercises:
            subexercise.level = request.data.get(
                subexercise.subexercise_slug).get('level')

        bulk_update(subexercises)
        serializers = SubexerciseSerializer(subexercises, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)


class GetSubexercisesAPIVIew(APIView):
    permission_classes = [IsAdminUserOrReadOnlyAndIsAuthenticated]

    def get(self, _, exercise_slug):
        subexercises = Subexercise.objects.filter(exercise_slug=exercise_slug) \
            .order_by('level')

        serializers = SubexerciseSerializer(subexercises, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
