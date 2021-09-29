from django.db import models


class Exercise(models.Model):
    exercise_slug = models.CharField(max_length=100, primary_key=True)
    exercise_name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    allow_in_challenge_mode = models.BooleanField()
    allow_audio_files_in_questions = models.BooleanField()
    hidden = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.exercise_name}"
