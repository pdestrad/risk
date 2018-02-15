# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
# Create your views here.
def index(request):
	return render(request,"home/index.html")

def create(request):
	return render(request,"create/createRisk.html")

def get(request):
	return render(request,"get/getRisk.html")