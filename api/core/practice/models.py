from core.subexercises.models import Subexercise
from django.db import models
from django.conf import settings


class PracticeAttempt(models.Model):
    subexercise_slug = models.ForeignKey(Subexercise, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    wpm = models.FloatField()
    time_elapsed = models.FloatField()
    accuracy = models.FloatField()
    score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subexercise_slug}"
