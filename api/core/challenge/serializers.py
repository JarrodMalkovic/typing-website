from rest_framework import serializers
from .models import ChallengeAttempt


class ChallengeAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeAttempt
        fields = ['wpm', 'accuracy', 'score', 'time_elapsed']
