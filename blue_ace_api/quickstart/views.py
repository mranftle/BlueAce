from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes

from models import Bet, Charity
from serializers import UserSerializer, BetSerializer, CharitySerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response


@authentication_classes([])
@permission_classes([])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

class CharityViewSet(viewsets.ModelViewSet):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

