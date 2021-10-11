from core.exercises.models import Exercise
from django.db import models
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import pre_save
import itertools
from django.core.validators import RegexValidator


class Subexercise(models.Model):
    subexercise_slug = models.SlugField(
        max_length=100, primary_key=True, unique=True)
    subexercise_name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    exercise_slug = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    level = models.IntegerField()

    def __str__(self):
        return f"{self.subexercise_name}"


@receiver(pre_save, sender=Subexercise)
def store_pre_save(sender, instance, *args, **kwargs):
    if not instance.subexercise_slug:
        slug_candidate = slug_original = slugify(instance.subexercise_name)

        for i in itertools.count(1):
            if not Subexercise.objects.filter(subexercise_slug=slug_candidate).exists():
                break

            slug_candidate = '{}-{}'.format(slug_original, i)

        instance.subexercise_slug = slug_candidate
