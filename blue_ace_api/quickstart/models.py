from django.db import models
from django.contrib.auth.models import User

class SportsGame(models.Model):
    id = models.AutoField(primary_key=True)
    home_team = models.CharField(max_length=30)
    away_team = models.CharField(max_length=30)
    starts = models.DateTimeField()
    home_team_abb = models.CharField(max_length=20)
    away_team_abb = models.CharField(max_length=20)
    stadium = models.CharField(max_length=30)

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
    started = models.DateTimeField()
    home_charity = models.IntegerField()
    away_charity = models.IntegerField()
    completed = models.BooleanField(default=False)
    winner = models.IntegerField(null=True)

class Charity(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.TextField()
    url = models.CharField(max_length=50)
    total_donated = models.IntegerField(default=0)