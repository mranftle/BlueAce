# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bet',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('user1', models.IntegerField()),
                ('user2', models.IntegerField()),
                ('started', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Charity',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('description', models.TextField()),
                ('url', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SportsGame',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('sport', models.CharField(max_length=20)),
                ('team1', models.CharField(max_length=30)),
                ('team2', models.CharField(max_length=30)),
                ('score1', models.IntegerField()),
                ('score2', models.IntegerField()),
                ('started', models.TimeField()),
            ],
        ),
        migrations.AddField(
            model_name='bet',
            name='game',
            field=models.ForeignKey(to='quickstart.SportsGame'),
        ),
    ]
