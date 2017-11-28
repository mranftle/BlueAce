from rest_framework import serializers
from django.contrib.auth.models import User
from models import Charity, SportsGame, Bet

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('id','username', 'password', 'email')

class BetSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        bet = Bet.objects.create(**validated_data)
        return bet

    class Meta:
        model = Bet
        fields = ('id', 'home_user', 'away_user', 'bet_amount', 'game', 'home_team_abb',
                  'away_team_abb', 'home_score', 'away_score', 'started', 'home_charity', 'away_charity',
                  'completed', 'winner')

class CharitySerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        charity = Charity.objects.create(**validated_data)
        return charity

    class Meta:
        model = Charity
        fields = ('id', 'name', 'description', 'url', 'total_donated')

class SportsGameSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        game = SportsGame.objects.create(**validated_data)
        return game

    class Meta:
        model = SportsGame
        fields = ('id', 'home_team', 'away_team', 'starts', 'home_team_abb', 'away_team_abb', 'stadium')