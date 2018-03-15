from django.shortcuts import render
from django.http import HttpResponse
from .models import tictactoe
from html.parser import HTMLParser

import json
# Create your views here.

def index(request):
	#return HttpResponse("Hello FROM TICTACTOE");
	return render(request, 'tictactoe/index2.html')

def processGameWinner(request):

	ttt = tictactoe()
	ttt.winner = request.GET.get('winner')
	ttt.user_id = request.user.id
	ttt.save()
	return HttpResponse()