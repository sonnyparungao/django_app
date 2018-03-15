from django.conf.urls import url,include
from . import views
from .views import processGameWinner

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^processGameWinner/', processGameWinner, name='processGameWinner'),
];
