from django.contrib import admin
from django.urls import path, include
from shopapp import views
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r"products", views.ProductViewSet, basename="products")
router.register(r"category", views.CategoryViewSet, basename="category")
router.register(r"order", views.OrderViewSet, basename="order")
router.register(r"orderitem", views.OrderItemViewSet, basename="orderitem")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/login/", views.LoginView.as_view()),
    path("api/register/", views.RegisterView.as_view()),
    path("api/me/", views.AboutMeView.as_view()),
    path("api/me-session/", views.SessionAboutMeView.as_view()),
     path('populate/', views.populate_database, name='populate_database'),
]

