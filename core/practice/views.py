from rest_framework import permissions
from .serializers import GetPracticeAttemptSerializer, CreatePracticeAttemptSerializer
from .models import PracticeAttempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# /api/questions/subexercise/attempt
# OR /api/practice/attempt

# anders


# /api/questions/subexercise/attempt
# OR /api/practice/attempt


class PracticeAttemptAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # POST - Saves a users attempt for a given subexercisie - Auth Required
    def post(self, request):
        serializer = CreatePracticeAttemptSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
