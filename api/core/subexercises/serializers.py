from rest_framework import serializers
from .models import Subexercise


class SubexerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subexercise
        fields = ['subexercise_slug',
                  'subexercise_name', 'level', 'exercise_slug', 'description', 'created_at']
