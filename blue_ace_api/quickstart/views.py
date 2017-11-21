import json
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes, detail_route, list_route, api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from models import Bet, Charity
from serializers import UserSerializer, BetSerializer, CharitySerializer
from rest_friendship.views import Friend, FriendshipRequest


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

class CharityViewSet(viewsets.ModelViewSet):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

