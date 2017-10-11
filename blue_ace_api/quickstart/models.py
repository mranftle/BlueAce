from django.db import models
from django.modules.auth.models import User
class SportsGame(models.Model):
    id = models.AutoField(primary_key=True)
    sport = models.CharField()
    team1 = models.CharField()
    team2 = models.CharField()
    score1 = models.IntegerField()
    score2 = models.IntegerField()
    started = TimeClass()
class Bet(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(User, on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(SportsGame, on_delete=models.CASCADE)
    started = TimeClass()
class Charity(models.Model):
    id = model.AutoField(primary_key=True)
    name = model.CharField()
    description = model.TextField()
    url = model.CharField()
