from django.urls import include, path

from .views import get_tests, get_test, get_result, post_result

urlpatterns = [
    path('get_tests/' , get_tests  ),
    path('get_test/<pk>/' , get_test),
    path('get_result/<pk>/' , get_result),
    path('post_result/' , post_result)
]

