from rest_framework.views import APIView
from .serializers import ChallengeAttemptSerializer, CreateChallengeAttemptSerializer
from core.questions.serializers import QuestionSerializer
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from core.challenge.models import ChallengeAttempt
from core.questions.models import Question
import math


class ChallengeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        questions = Question.objects.filter(
            subexercise_slug__exercise_slug_id__hidden=False,  subexercise_slug__exercise_slug_id__allow_in_challenge_mode=True).order_by('?')[:10]
        serializers = QuestionSerializer(questions, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CreateChallengeAttemptSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChallengeAttemptsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        page = int(request.GET.get('page', 0))
        limit = min(int(request.GET.get('limit', 10)), 50)
        skip = page * limit

        attempts = ChallengeAttempt.objects.filter(user=request.user)
        serializers = ChallengeAttemptSerializer(
            attempts[skip:skip + limit], many=True)

        return Response({'pages': math.ceil(len(attempts) / limit), 'attempts': serializers.data}, status=status.HTTP_200_OK)
