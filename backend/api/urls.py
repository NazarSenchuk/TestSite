from django.urls import include, path

from .views import get_tests, get_test

urlpatterns = [
    path('get_tests/' , get_tests  ),
    path('get_test/<pk>/' , get_test)
]

