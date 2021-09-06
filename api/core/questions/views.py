from rest_framework.views import APIView
from .serializers import QuestionSerializer, GetQuestionsSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Question
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, JSONParser
import cloudinary.uploader
from django.shortcuts import get_object_or_404
from .mixin import SuperUserRequiredMixin


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
            questions = Question.objects.filter(
                subexercise_slug_id__exercise_slug_id=exercise)

            serializers = GetQuestionsSerializer(questions, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


# /api/questions/<int:id>/
# ADMIN ONLY
class QuestionIdAPIView(SuperUserRequiredMixin, APIView):
    def get_object(self, id):
        # If question id does not exist, returns 404 NOT FOUND
        return get_object_or_404(Question, id=id)

    # GET - Gets the specific question by its id
    def get(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    # DELETE - Deletes a question by ID - Admin Only
    def delete(self, request, id):
        return Response()

    # PUT - Edits a question by ID - Admin Only
    def put(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /api/questions/
# ADMIN ONLY
class QuestionAPIView(SuperUserRequiredMixin, APIView):
    # permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, JSONParser)
    
    # DELETE - Deletes many questions (Body will contain an array of the ID's to delete)
    def delete(self, request):
        for id in request.data.get('questions'):
            Question.objects.filter(id=id).delete()

        return Response(request.data.get('questions'), status=status.HTTP_200_OK)

    # POST - Creates a question - Admin Only
    # TODO: Make it so only admins can access this route
    def post(self, request):
        serializer = None
        audio_file = request.data.get('audio_file')

        if audio_file:
            upload_data = cloudinary.uploader.upload(
                audio_file, resource_type='raw')

            print(request.data)

            data = {
                'audio_url': upload_data.get('secure_url'),
                'question': request.data.get('question'),
                'subexercise_slug': request.data.get('subexercise_slug')
            }

            serializer = QuestionSerializer(data=data)
        else:
            serializer = QuestionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/questions/subexercise/attempt
# OR /api/practice/attempt


class QuestionSubexerciseAttemptAPIView(APIView):
    # POST - Saves a users attempt for a given subexercisie - Auth Required
    def post(self, request):
        return Response()

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
