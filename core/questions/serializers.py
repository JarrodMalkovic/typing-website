from rest_framework import serializers
from .models import Question, Subexercise


class SubexerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subexercise
        fields = ['subexercise_slug', 'subexercise_name']


class GetQuestionsSerializer(serializers.ModelSerializer):
    subexercise_slug = SubexerciseSerializer()

    class Meta:
        model = Question
        fields = ['id', 'question', 'subexercise_slug',
                  'audio_url', 'created_at']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question', 'audio_url',
                  'subexercise_slug', 'created_at']

    def create(self, validatted_data):
        return Question.objects.create(**validatted_data)

    def update(self, instance, validated_data):
        instance.subexercise_slug = validated_data.get(
            'subexercise_slug', instance.subexercise_slug)

        instance.question = validated_data.get('question', instance.question)

        instance.audio_url = validated_data.get(
            'audio_url', instance.audio_url)

        instance.save()
        return instance
