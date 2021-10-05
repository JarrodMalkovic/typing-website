from core.exercises.models import Exercise
from django.db import models


class Subexercise(models.Model):
    subexercise_slug = models.CharField(max_length=100, primary_key=True)
    subexercise_name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    exercise_slug = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    level = models.IntegerField()

    def __str__(self):
        return f"{self.subexercise_name}"
