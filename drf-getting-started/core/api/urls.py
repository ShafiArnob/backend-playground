from home.views import index, person, login, PersonAPI
from django.urls import path

urlpatterns = [
    path("index/", index),
    path("person/", person),
    path("login/", login),

    path("persons-class/", PersonAPI.as_view())
]
