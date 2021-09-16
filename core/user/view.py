from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User
from rest_framework import permissions


class UserProfileAPIView(APIView):
    def get(self, _, username):
        user = User.objects.filter(username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateUserProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = User.objects.filter(id=request.user.id)
        serializer = UserSerializer(user, request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
