from core.subexercises.models import Subexercise
from django.db import models
from django.conf import settings


class Question(models.Model):
    subexercise_slug = models.ForeignKey(Subexercise, on_delete=models.CASCADE)
    question = models.CharField(max_length=1000)
    translation = models.CharField(max_length=1000)
    audio_url = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.question}"
