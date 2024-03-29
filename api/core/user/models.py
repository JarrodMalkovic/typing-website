from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from libgravatar import Gravatar
from django.core.validators import RegexValidator


class UserManager(BaseUserManager):
    """ Adapted from: https://dev.to/koladev/django-rest-authentication-cmh """

    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        avatar = Gravatar(email).get_image(
            size=80, default='identicon', force_default=False, use_ssl=True)

        user = self.model(username=username,
                          email=self.normalize_email(email), avatar=avatar)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """ Adapted from: https://dev.to/koladev/django-rest-authentication-cmh """
    username = models.CharField(db_index=True, validators=[RegexValidator(r'^[\w]*$',
                                                                          message='Field must be alphanumeric',
                                                                          code='Invalid username')], max_length=50, unique=True)
    email = models.EmailField(db_index=True, unique=True, blank=True)
    avatar = models.CharField(max_length=255)
    bio = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"
