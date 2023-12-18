from django.contrib import admin
from django.urls import path, include
from shopapp import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"products", views.ProductViewSet, basename="products")
router.register(r"address", views.AddressViewSet, basename="address")
router.register(r"category", views.CategoryViewSet, basename="category")
router.register(r"order", views.OrderViewSet, basename="order")
router.register(r"orderitem", views.OrderItemViewSet, basename="orderitem")
router.register(r"reviews", views.ReviewViewSet, basename="reviews")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

