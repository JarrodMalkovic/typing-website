from core.user.models import User
from rest_framework import serializers

# Adapated from: https://dev.to/koladev/django-rest-authentication-cmh
class UserSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'is_active', 'created', 'updated']
        read_only_field = ['is_active']