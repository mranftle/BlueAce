"""blue_ace_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
import rest_friendship.urls
from django.conf.urls import include, url
from django.contrib import admin
from quickstart.views import UserViewSet, BetViewSet, CharityViewSet, SportsGameViewSet, AnotherUserViewSet
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'signup', UserViewSet, 'signup')
router.register(r'bet', BetViewSet, 'bet')
router.register(r'charity', CharityViewSet, 'charity')
router.register(r'games', SportsGameViewSet, 'games')
router.register(r'ids', AnotherUserViewSet, 'ids')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^', include(rest_friendship.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-token-auth/', obtain_jwt_token)
]