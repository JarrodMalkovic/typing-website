from django.db import models


class Exercise(models.Model):
    exercise_slug = models.CharField(max_length=100, primary_key=True)
    exercise_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.exercise_name}"
