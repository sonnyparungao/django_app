from django.http import HttpResponse
from .models import tictactoe
from html.parser import HTMLParser

from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect


import json
# Create your views here.

User = get_user_model()

@login_required(login_url='/')
def index(request):
	#return HttpResponse("Hello FROM TICTACTOE");
	return render(request, 'tictactoe/index.html')

def processGameWinner(request):

	ttt = tictactoe()
	ttt.winner = request.GET.get('winner')
	ttt.user_id = request.user.id
	ttt.save()
	return HttpResponse()



@login_required(login_url='/')
def users(request):
    users = User.objects.select_related('logged_in_user')
    for user in users:
        user.status = 'Online' if hasattr(user, 'logged_in_user') else 'Offline'
    return render(request, 'tictactoe/user_list.html', {'users': users})