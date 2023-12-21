from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Product, Order, OrderItem

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.db import IntegrityError
from django.contrib.auth.models import User as DjangoUser

from faker import Faker
import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .serializers import (
    CategorySerializer, 
    ProductSerializer, 
    OrderSerializer, 
    OrderItemSerializer, 
    LoginSerializer,
    RegisterSerializer

    )


# Landing page view
def landing_page_view(request):
    return render(request, 'landingpage.html')


class SearchItemsView(APIView):
    def get(self, request):
        title = request.GET.get('title', '')
        if title:
            # Filter products based on the title
            products = Product.objects.filter(title__icontains=title)
            serializer = ProductSerializer(products, many=True)
            print(serializer.data)
            return Response(serializer.data)
        
        return Response([])
    
class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': 'Incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

# Create your views here.
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

def populate_database(request):
    # Delete existing data
    Product.objects.all().delete()
    Category.objects.all().delete()

    fake = Faker()

    # Create default categories if none exist
    categories = Category.objects.all()
    if not categories:
        default_categories = ['Electronics', 'Clothing', 'Books']
        for category_name in default_categories:
            Category.objects.create(name=category_name, description=fake.text())

    # Create or get 6 users
    users = []
    for i in range(1, 7):
        username = f"testuser{i}"
        password = f"pass{i}"
        email = f"testuser{i}@shop.aa"

        # Create or get Django user
        django_user, created = DjangoUser.objects.get_or_create(username=username, email=email)
        if created:  # Ensure the user is created
            django_user.set_password(password)
            django_user.save()
        users.append(django_user)

    # Distribute 10 products among 3 of the 6 users
    users_with_ten_items = random.sample(users, 3)
    for user in users_with_ten_items:
        for _ in range(10):
            title = fake.word()  # Generate a random word as the title
            description = fake.text()  # Generate a random text as the description
            price = round(random.uniform(10, 1000), 2)  # Generate a random price between 10 and 1000
            quantity_available = random.randint(1, 100)  # Generate a random quantity between 1 and 100

            # Get a random category or default to the first category
            category = random.choice(categories) if categories else Category.objects.first()

            # Create product for the user
            product = Product.objects.create(
                title=title,
                description=description,
                price=price,
                quantity_available=quantity_available,
                category=category,
                user=user  # Assign the user to the product
            )

    # Update landing page with a message
    message = "Database populated successfully!"
    #return JsonResponse({"message": message})
    return render(request, 'landingpage.html', {'message': message})

