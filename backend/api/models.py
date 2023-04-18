from django.contrib.auth import get_user_model
from django.db import models

from django.db.models import IntegerField

User = get_user_model()


class Test(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name="test_questions")
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', auto_now_add=True)

    def __str__(self):
        return self.question_text

    def get_true_choice(self):
        for i in self.test_choices.all():
            if i.status == "True":
                return i


class Choice(models.Model):
    choices = (('True', 'True'), ("False", 'False'))
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="test_choices")
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    status = models.CharField(max_length=5, choices=choices, default="False")

    def __str__(self):
        return self.choice_text


class VotesMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, blank=False, null=True)


class Comments(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)


class Results(models.Model):
    rating = IntegerField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name="test_results")
    user = models.ForeignKey(VotesMember, on_delete=models.CASCADE, related_name="test_user", )

    class Meta:
        unique_together = ["user", "test"]
