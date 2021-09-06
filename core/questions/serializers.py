from rest_framework import serializers
from .models import Question, PracticeAttempt, ChallengeAttempt

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

class PracticeAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeAttempt
        fields = ['id', 'subexercise_slug', 'user', 'wpm', 'time_elapsed', 'accuracy', 'score']
        
    def create(self, validated_data):
        return PracticeAttempt.objects.create(**validated_data) 

class ChallengeAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeAttempt
        fields = ['id', 'user', 'wpm', 'time_elapsed', 'accuracy', 'score']
        
    def create(self, validated_data):
        return ChallengeAttempt.objects.create(**validated_data)