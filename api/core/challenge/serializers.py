from rest_framework import serializers
from .models import ChallengeAttempt
from core.user.serializers import UserSerializer


class CreateChallengeAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeAttempt
        fields = ['wpm', 'accuracy',
                  'score', 'created_at', 'time_elapsed']


class ChallengeAttemptSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ChallengeAttempt
        fields = ['wpm', 'accuracy', 'user',
                  'score', 'created_at', 'time_elapsed']
