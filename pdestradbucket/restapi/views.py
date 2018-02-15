# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics

from .models import RiskModel,BasicDataType,EnumDataType,EnumOption
from .serializer import RiskModelSerializer

class risksModels(generics.ListAPIView):
	queryset = RiskModel.objects.all()
	serializer_class = RiskModelSerializer

class riskModel(generics.RetrieveAPIView):
	lookup_field = 'id'
	queryset = RiskModel.objects.all()
	serializer_class = RiskModelSerializer


@csrf_exempt
def createRiskModel(request):
	if request.method == "POST":
		name = request.POST.get("name",None)
		if name != None:
			riskModel = RiskModel(name=str(name))
			riskModel.save()

			createBasicDataType(request.POST, riskModel)
			createEnumDataType(request.POST, riskModel)

			return JsonResponse({'error': False})
	return JsonResponse({'error': True})

def createBasicDataType(data, riskModel):
	i = 0
	for p in data:
		index = "[" + str(i) + "]"
		dataType = data.get("basics"+index+"[dataType]",None)
		attrName = data.get("basics"+index+"[attrName]",None)

		#creating obj
		if dataType != None and attrName != None:
			BasicDataType(model=riskModel, dataType=str(dataType), attrName=str(attrName)).save()
		i += 1


def createEnumDataType(data, riskModel):
	i = 0
	for p in data:
		index = "[" + str(i) + "]"
		attrName = data.get("enums"+index+"[attrName]",None)
		if attrName != None:
			enumType = EnumDataType(model=riskModel, attrName=str(attrName))
			enumType.save()
			j = 0
			for p in data:
				subIndex = "[" + str(j) + "]"
				option = data.get("enums"+index+"[options]"+subIndex+"[option]",None)
				if option != None:
					EnumOption(enumDataType=enumType, option=str(option)).save()
				j += 1
		i += 1



