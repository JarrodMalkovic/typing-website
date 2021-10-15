from rest_framework import serializers
from .models import Exercise


class CreateExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ['exercise_name', 'description', 'image',
                  'exercise_slug', 'allow_audio_files_in_questions', 'hidden', 'allow_in_challenge_mode', 'created_at', 'level']


class UpdateExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ['exercise_name', 'description',
                  'allow_audio_files_in_questions', 'hidden', 'allow_in_challenge_mode', 'created_at']
