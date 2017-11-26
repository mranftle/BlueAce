from rest_framework import viewsets, status
from django.contrib.auth.models import User
from models import Bet, Charity, SportsGame
from serializers import UserSerializer, BetSerializer, CharitySerializer, SportsGameSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

class CharityViewSet(viewsets.ModelViewSet):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

class SportsGameViewSet(viewsets.ModelViewSet):
    queryset = SportsGame.objects.all()
    serializer_class = SportsGameSerializer

