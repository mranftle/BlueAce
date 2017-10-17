from rest_framework import viewsets, status
from django.contrib.auth.models import User
from quickstart.serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
