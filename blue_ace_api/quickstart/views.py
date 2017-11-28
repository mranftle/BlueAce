import json
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes, detail_route
from rest_framework.permissions import AllowAny
from rest_friendship.views import Friend, FriendshipRequest
from django.core.mail import send_mail
from models import Charity, SportsGame, Bet
from serializers import UserSerializer, CharitySerializer, SportsGameSerializer, BetSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

@permission_classes([AllowAny, ])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


    # only return users who are not your friend
    def list(self, request):
        friends = Friend.objects.filter(from_user_id=request.user.id)
        friend_requests_to = FriendshipRequest.objects.filter(from_user_id=request.user.id)
        friend_requests_from = FriendshipRequest.objects.filter(to_user_id=request.user.id)

        # exclude by id
        friend_ids = [friend.to_user_id for friend in friends]
        for r in friend_requests_to:
            friend_ids.append(r.to_user_id)
        for r in friend_requests_from:
            friend_ids.append(r.from_user_id)
        friend_ids.append(int(request.user.id))
        users = User.objects.exclude(id__in=friend_ids)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

    @detail_route(methods=['post'])
    def accept_bet(self, request, pk=None):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        charity = body['charity']
        Bet.objects.filter(id=pk).update(completed=2)
        bet = Bet.objects.get(id=pk)
        if bet.home_charity is None:
            Bet.objects.filter(id=pk).update(home_charity=charity)
        else:
            Bet.objects.filter(id=pk).update(away_charity=charity)
        return Response({
            'status': 'Bet accepted',
            'message': 'Bet accepted'
        }, status=status.HTTP_200_OK)

    @detail_route(methods=['post'])
    def decline_bet(self, request, pk=None):
        bet = Bet.objects.filter(id=pk).delete()

        return Response({
            'status': 'Bet declined',
            'message': 'Bet declined'
        }, status=status.HTTP_200_OK)
    
    # list all bets for this user
    def list(self, request):
        home_bets = Bet.objects.filter(home_user=request.user.id)
        away_bets = Bet.objects.filter(away_user=request.user.id)
        bets = home_bets | away_bets
        seralizer = self.serializer_class(bets, many=True)
        return Response(seralizer.data)

class CharityViewSet(viewsets.ModelViewSet):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

class Email():
    def send_email(self, request):
        send_mail(request.subject, request.body, "blueacetest@gmail.com", [request.email])

class SportsGameViewSet(viewsets.ModelViewSet):
    queryset = SportsGame.objects.all()
    serializer_class = SportsGameSerializer

class ExceptionLoggingMiddleware(object):
    def process_request(self, request):
        serializer = BetSerializer(data=request.body)
        if not serializer.is_valid():
            print serializer.errors

class AnotherUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        from rest_framework_jwt.authentication import JSONWebTokenAuthentication
        user, token = JSONWebTokenAuthentication().authenticate(request)
        id = user.id
        return Response({'id' : id})
