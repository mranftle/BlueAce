from django.db import models
from django.contrib.auth.models import User

class SportsGame(models.Model):
    id = models.AutoField(primary_key=True)
    sport = models.CharField(max_length=20)
    home = models.CharField(max_length=30)
    away = models.CharField(max_length=30)
    score1 = models.IntegerField()
    score2 = models.IntegerField()
    started = models.TimeField()

class Bet(models.Model):
    id = models.AutoField(primary_key=True)
    home_user=models.IntegerField()
    away_user=models.IntegerField()
    home_bet = models.IntegerField()
    away_bet = models.IntegerField()
    game = models.IntegerField()
    home_team_abb = models.CharField(max_length=20)
    away_team_abb = models.CharField(max_length=20)
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)
    started = models.IntegerField()
    home_charity = models.IntegerField()
    away_charity = models.IntegerField()
    completed = models.BooleanField(default=False)
    winner = models.IntegerField(null=True)

class Charity(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300)
    description = models.TextField()
    url = models.CharField(max_length=500)
    total_donated = models.IntegerField(default=0)
