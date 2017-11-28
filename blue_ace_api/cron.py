from time import time
import base64
import requests
from config import credentials
import json


def send_mysportsfeed_request(url):
    try:
        response = requests.get(url=url, headers={
            "Authorization": "Basic " + base64.b64encode("{}:{}".format(credentials['username'], credentials['password']))})
        if response.status_code != 200:
            print 'Response status code invalid! Got a {} status code'.format(response.status_code)
            return None
        else:
            return response.content
    except requests.exceptions.RequestException:
        print 'HTTP Request failed'
        return None


def validate_win():
    from quickstart.views import BetViewSet, SportsGameViewSet
    bets = filter(lambda x: x.started + 18000 < time(), list(BetViewSet().get_queryset()))
    all_games = list(SportsGameViewSet().get_queryset())
    games = [filter(lambda x: x.id == bet.game, all_games)[0] for bet in bets]
    for index, bet in enumerate(bets):
        game = games[index]
        game_date = game.starts.strftime('%Y%m%d')
        # Construct url
        box_score_url = 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/game_boxscore.json?gameid={}-{}-{}'.format(game_date,
                                                                                                                             bet.away_team_abb,
                                                                                                                             bet.home_team_abb)

        # Make request
        response = json.loads(send_mysportsfeed_request(box_score_url))
        scores = response.get('gameboxscore').get('quarterSummary').get('quarterTotals')

        # Parse scores
        home_score = scores.get('homeScore')
        away_score = scores.get('awayScore')

        # # Get winner and winning charity
        # winner, winning_charity = (bet.home_user, bet.home_charity) if home_score > away_score else (bet.away_user, bet.away_charity)
        #
        # # Update DB
        # bet.winner = winner
        # winning_charity.total_donated += bet.home_bet if winner == bet.home_user else bet.away_bet
        # bet.home_score = home_score
        # bet.away_score = away_score
        # bet.completed = True
