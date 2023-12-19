from django.shortcuts import render
from rest_framework import viewsets
from .models import Address, Category, Product, Order, OrderItem, Review

from django.db import IntegrityError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .serializers import (
    AddressSerializer, 
    CategorySerializer, 
    ProductSerializer, 
    OrderSerializer, 
    OrderItemSerializer, 
    ReviewSerializer,
    LoginSerializer,
    RegisterSerializer

    )

# Create your views here.
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    

    
class LoginView(APIView):
    """
    Login a user
    """

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        user = authenticate(
            username=serializer.data["username"], password=serializer.data["password"]
        )
        if user is not None:
            login(request, user)
            return Response(f"is logged in: {user.get_username()}")
        return Response("not logged in")

class RegisterView(APIView):
    """
    Register a new user
    """

    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        try:
            user = User.objects.create_user(
                username=serializer.data["username"],
                email=serializer.data["email"],
                password=serializer.data["password"],
            )
        except IntegrityError:
            return Response(f"same user name", status=400)
        if user is not None:
            return Response(f"new user is: {user.get_username()}")
        return Response("no new user")

class AboutMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(f"you are: {request.user.get_username()}")

class SessionAboutMeView(AboutMeView):
    authentication_classes = [authentication.SessionAuthentication]