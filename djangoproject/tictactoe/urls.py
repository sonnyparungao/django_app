from django.conf.urls import url,include
from . import views
from .views import processGameWinner
from .views import users

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^processGameWinner/', processGameWinner, name='processGameWinner'),
	 url(r'^users/', users, name='users'),

];
