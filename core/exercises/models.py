from django.db import models
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import pre_save
import itertools
from django.core.validators import RegexValidator


class Exercise(models.Model):
    exercise_slug = models.SlugField(max_length=100, primary_key=True)
    exercise_name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=500)
    allow_in_challenge_mode = models.BooleanField()
    allow_audio_files_in_questions = models.BooleanField()
    hidden = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.exercise_name}"


@receiver(pre_save, sender=Exercise)
def store_pre_save(sender, instance, *args, **kwargs):
    if not instance.exercise_slug:
        slug_candidate = slug_original = slugify(instance.exercise_name)

        for i in itertools.count(1):
            if not Exercise.objects.filter(exercise_slug=slug_candidate).exists():
                break

            slug_candidate = '{}-{}'.format(slug_original, i)

        instance.exercise_slug = slug_candidate
