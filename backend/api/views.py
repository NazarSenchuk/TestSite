from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Test, Question
from .serializers import  TestSerializer


# Create your views here.
@api_view(["GET"])
def get_tests(request):
    data =  Test.objects.all()
    serializer = TestSerializer(data , many= True)
    return Response(serializer.data)
@api_view(["GET","DELETE"])
def get_test(request , pk ):
    if request.method == "GET":

        data = Test.objects.get( id = pk)
        serializer = TestSerializer(data, many= False)
        return Response(serializer.data)
    else:
        test = Test.objects.get(id = pk)
        test.delete()
        return Response("Was deleted")


