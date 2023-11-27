from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.views import index, person, login, PersonAPI, PeopleViewSet, RegisterAPI, LoginAPI, CreatePerson
from django.conf import settings
from django.conf.urls.static import static

# view set
router = DefaultRouter()
router.register(r'people', PeopleViewSet, basename="people")
urlpatterns = router.urls

urlpatterns = [
    path("index/", index),
    path("person/", person),
    path("login/", LoginAPI.as_view()),
    # path("login/", login),

    path("register/", RegisterAPI.as_view()),
    path("person/create", CreatePerson.as_view()),
    path("persons-class/", PersonAPI.as_view()),
    path("", include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)