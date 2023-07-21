from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from server.views import ServerListViewSet, CategoryListViewSet
from webchat.consumer import MyConsumer

router = DefaultRouter()
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    # Swagger
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/schema/ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
] + router.urls

websocket_urlpatterns = [path("ws/test", MyConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)