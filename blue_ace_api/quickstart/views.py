from rest_framework import viewsets
from django.contrib.auth.models import User
from quickstart.serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt

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

