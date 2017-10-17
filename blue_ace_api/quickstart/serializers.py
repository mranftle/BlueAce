from rest_framework import serializers
from django.contrib.auth.models import User
from models import Bet

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'username')

class BetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bet
        fields = ('user1', 'user2', 'game', 'started')