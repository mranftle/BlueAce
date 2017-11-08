from time import time
import base64
import requests
from config import credentials
from quickstart.views import BetViewSet

def send_mysportsfeed_request(url):
    try:
        response = requests.get(url=url, params={"fordate": "20161121"}, headers={"Authorization": "Basic " + base64.b64encode(
            '{}:{}'.format({credentials.get('username')}, {credentials.get('password')}).encode('utf-8')).decode('ascii')})
        if response.status_code == 200:
            return response.content
        else:
            print 'Response status code invalid'
    except requests.exceptions.RequestException:
        print 'HTTP Request failed'


def validate_win():
    print 'validate_win'
    # # Get all bets that started 5 hours ago
    print 'before'
    bets = filter(lambda x: x.started + 18000 < time() and x.completed is False, BetViewSet().get_queryset())
    # b = BetViewSet()
    # queryset = bets.get_object()
    # for bet in bets:
    #     # Construct url
    #     box_score_url = 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/game_boxscore.json?gameid={}-{}-{}'.format(bet.game,
    #         bet.away_team_abb, bet.home_team_abb)
    #
    #     # Make request
    #     response = send_mysportsfeed_request(box_score_url)
    #
    #     # Parse scores
    #     home_score = response.get('quarterTotals').get('homeScore')
    #     away_score = response.get('quarterTotals').get('awayScore')
    #
    #     # Get winner and winning charity
    #     winner, winning_charity = (bet.home_user, bet.home_charity) if home_score > away_score else (bet.away_user, bet.away_charity)
    #
    #     # Update DB
    #     bet.winner = winner
    #     winning_charity.total_donated += bet.home_bet if winner == bet.home_user else bet.away_bet
    #     bet.home_score = home_score
    #     bet.away_score = away_score
    #     bet.completed = True
