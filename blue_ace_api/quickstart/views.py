from rest_framework import viewsets, status
from django.contrib.auth.models import User
from serializers import UserSerializer, BetSerializer
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from models import Bet
from rest_framework.response import Response

# Create your views here.
@csrf_exempt
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        queryset = User.objects.filter(user=self.request.user)
        if queryset.exists():
            raise ValidationError('You have already signed up')
        serializer.save(user=self.request.user)

class BetResponseViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = int(request.user.id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Bet.objects.create(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad Request',
            'message': 'Response could not be created with received data'
        }, status=status.HTTP_400_BAD_REQUEST)