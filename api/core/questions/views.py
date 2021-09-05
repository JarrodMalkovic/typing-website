from re import sub
from rest_framework import serializers
from rest_framework.views import APIView
from .serializers import QuestionSerializer, PracticeAttemptSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Question
from django.http import HttpResponse
<<<<<<< Updated upstream
=======
from django.shortcuts import get_object_or_404
from .mixin import SuperUserRequiredMixin
from django.contrib.auth.mixins import LoginRequiredMixin

>>>>>>> Stashed changes

# /api/questions/subexercise/<slug:subexercise>/
class QuestionSubexerciseAPIView(APIView):
    # GET - Returns all questions for a given subexercise - Auth Required
    # TODO: Make it so auth is required for this route and check that they have completeled the previous subexercise first, if they have not return an error
    def get(self, request, subexercise):
        try:
            questions = Question.objects.filter(subexercise_slug=subexercise)
            serializers = QuestionSerializer(questions, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


# /api/questions/exercise/<slug:exercise>/
class QuestionExerciseAPIView(APIView):
    # GET - Returns all questions for a given exercise - Admin Only
    # TODO: Make it so only admins can access this route
    def get(self, request, exercise):
        try:
            questions = Question.objects.filter(exercise_slug=exercise)
            serializers = QuestionSerializer(questions, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


# /api/questions/<int:id>/
class QuestionIdAPIView(APIView):
    def get_object(self, id):
        try:
            return Question.objects.get(id=id)
        except Question.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    # GET - Gets the specific question by its id
    def get(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
    
    # DELETE - Deletes a question by ID - Admin Only
    def delete(self, request, id):
        return Response()

    # PUT - Edits a question by ID - Admin Only
    # TODO Add the ADMIN only feature
    def put(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /api/questions/
class QuestionAPIView(APIView):
    # DELETE - Deletes many questions (Body will contain an array of the ID's to delete) - Admin Only
    def delete(self, request):
        return Response()

    # POST - Creates a question - Admin Only
    # TODO: Make it so only admins can access this route and upload audio file to cloudinary
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/questions/subexercise/attempt
# OR /api/practice/attempt
class QuestionSubexerciseAttemptAPIView(LoginRequiredMixin, APIView):
    # POST - Saves a users attempt for a given subexercisie - Auth Required
    def post(self, request):
        serializer = PracticeAttemptSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/questions/subexercise/<slug:subexercise>/attempts
# OR /api/practice/subexercise/<slug:subexercise>/attempts
class QuestionSubexerciseAttemptsAPIView(APIView):

    # GET - Returns a users attempts for a given subexercise - Auth Required
    def get(self, request, subexercise):
        return Response()

# /api/questions/exercise/<slug:exercise>/attempts
# OR /api/practice/exercise/<slug:exercise>/attempts
class QuestionExerciseAttemptAPIView(APIView):
    # GET - Returns a users attempts for a given exercise - Auth Required
    def get(self, request, exercise):
        return Response()
