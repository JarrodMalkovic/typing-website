from core.subexercises.models import Subexercise
from rest_framework.fields import Field
from core.practice.models import PracticeAttempt
from core.user.models import User
from rest_framework import serializers
from core.subexercises.serializers import SubexerciseSerializer
from core.exercises.models import Exercise


class UserSerializer(serializers.ModelSerializer):
    """ Adapated from: https://dev.to/koladev/django-rest-authentication-cmh """
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)
    isAdmin = serializers.BooleanField(source='is_staff')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar',
                  'is_active', 'created', 'updated', 'bio', 'isAdmin']
        read_only_field = ['is_active']


class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar',
                  'is_staff', 'is_superuser', 'created_at', 'email']


class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'bio']


class HeatmapSerializer(serializers.ModelSerializer):
    day = serializers.CharField(write_only=True)
    available = serializers.CharField(write_only=True)

    class Meta:
        model = PracticeAttempt
        fields = ('day', 'available')
        write_only_fields = ('day', 'available')


class RecentAttemptExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['exercise_name']


class RecentAttemptSubexerciseSerializer(serializers.ModelSerializer):
    exercise_slug = RecentAttemptExerciseSerializer()

    class Meta:
        model = Subexercise
        fields = ['subexercise_name', 'exercise_slug']


class RecentAttemptsSerializer(serializers.ModelSerializer):
    subexercise_slug = RecentAttemptSubexerciseSerializer()

    class Meta:
        model = PracticeAttempt
        fields = ['created_at', 'subexercise_slug']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'avatar', 'bio', 'created_at']
