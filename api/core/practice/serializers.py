from rest_framework import serializers
from .models import PracticeAttempt


class GetPracticeAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeAttempt
        fields = ['id', 'subexercise_slug', 'wpm', 'user',
                  'time_elapsed', 'accuracy', 'score']


class CreatePracticeAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeAttempt
        fields = ['subexercise_slug', 'wpm',
                  'time_elapsed', 'accuracy', 'score']

    def create(self, validated_data):
        return PracticeAttempt.objects.create(**validated_data)
