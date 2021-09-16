from core.exercises.models import Exercise
from django.db import models


class Subexercise(models.Model):
    subexercise_slug = models.CharField(max_length=100, primary_key=True)
    subexercise_name = models.CharField(max_length=100)
    exercise_slug = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.subexercise_name}"
