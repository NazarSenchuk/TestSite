from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.urls import reverse_lazy
from rest_framework.decorators import api_view
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from .functions import has_is_owner, get_rating
from .models import Test, Question, Results, VotesMember
from .serializers import TestSerializer, ResultSerializer


# Create your views here.
@api_view(["GET"])
def get_tests(request):
    data = Test.objects.all()
    serializer = TestSerializer(data, many=True)
    return Response(serializer.data)


@api_view(["GET", "DELETE"])
def get_test(request, pk):
    if request.method == "GET":

        data = Test.objects.get(id=pk)
        votes_mamber, created = VotesMember.objects.get_or_create(user=request.user, test=data)
        serializer = TestSerializer(data, many=False)
        return Response(serializer.data)
    else:
        test = Test.objects.get(id=pk)
        test.delete()
        return Response("Was deleted")


@api_view(["POST"])
def post_result(request):
    test_id = request.data['test']["id"]
    test = Test.objects.get(id=test_id)
    test_questions = request.data['test_result']
    end = {"result": {}}
    rating = 0
    for i in test_questions:
        print(test_questions[i])
        question = Question.objects.get(id=i)

        correct_choice = question.get_true_choice()
        if test_questions[i] == correct_choice.choice_text:
            end["result"][question.question_text] = "True"
            rating += 1
        else:
            end["result"][question.question_text] = "False"
    rating = get_rating(rating, len(test_questions))
    person = VotesMember.objects.get(user=request.user, test=test)
    try:
        result, created = Results.objects.get_or_create(test=test, user=person,
                                                    rating=rating)
    except:
        result = Results.objects.get(test=test, user=person,)
        result.rating =   rating
    end['id'] = result.id
    print(end)
    return Response(end)


@api_view(["GET"])
def get_result(request, pk):
    result = Results.objects.get(id=pk)
    if has_is_owner(request.user, result):
        error = "It was not you who took this test"
        to_json = {"error": error}
        return Response(to_json)
    serializer = ResultSerializer(result, many=False)
    return Response(serializer.data)
