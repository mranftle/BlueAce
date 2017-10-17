from django.db import models
from django.contrib.auth.models import User

class SportsGame(models.Model):
    id = models.AutoField(primary_key=True)
    sport = models.CharField(max_length=20)
    team1 = models.CharField(max_length=30)
    team2 = models.CharField(max_length=30)
    score1 = models.IntegerField()
    score2 = models.IntegerField()
    started = models.TimeField()

class Bet(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(User, on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, on_delete=models.CASCADE)
    user1=models.IntegerField()
    user2=models.IntegerField()
    game = models.ForeignKey(SportsGame, on_delete=models.CASCADE)
    started = models.TimeField()

class Charity(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.TextField()
    url = models.CharField(max_length=50)
