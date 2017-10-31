from rest_framework import serializers
from django.contrib.auth.models import User
from models import Bet, Charity

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('username', 'password')

class BetSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        bet = Bet.objects.create(**validated_data)
        return bet

    class Meta:
        model = Bet
        fields = ('user1', 'user2', 'game', 'started')

class CharitySerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        charity = Charity.objects.create(**validated_data)
        return charity

    class Meta:
        model = Charity
        fields = ('name', 'description', 'url')