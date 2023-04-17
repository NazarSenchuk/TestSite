from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer

from .models import Test, Question, Choice , Results
class ResultSerializer(ModelSerializer) :

    class Meta:
        model = Results
        fields = '__all__'

class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = ('votes' , 'status'  , 'choice_text')
class QuestionSerializer(ModelSerializer):
    test_choices  = ChoiceSerializer(many = True ,read_only=True)
    class Meta:
        model = Question
        fields  =  '__all__'
class TestSerializer( ModelSerializer):
    test_results  =  ResultSerializer(many=True , read_only  =True)
    test_questions  =  QuestionSerializer(many= True , read_only= True)
    class Meta:
         model = Test
         fields = '__all__'
