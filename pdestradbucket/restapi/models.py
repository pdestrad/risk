# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class RiskModel(models.Model):
	name = models.CharField(max_length=75)
	def __str__(self):
		return self.name
class BasicDataType(models.Model):
	model = models.ForeignKey(RiskModel, related_name='basics', on_delete=models.CASCADE)
	dataType = models.CharField(max_length=10)
	attrName = models.CharField(max_length=75)
	def __str__(self):
		return self.attrName + " (" + self.dataType + ")  RISK: " + self.model.name
class EnumDataType(models.Model):
	model = models.ForeignKey(RiskModel, related_name='enums', on_delete=models.CASCADE)
	attrName = models.CharField(max_length=75)
	def __str__(self):
		return self.attrName + " RISK: " + self.model.name
class EnumOption(models.Model):
	enumDataType = models.ForeignKey(EnumDataType, related_name='options', on_delete=models.CASCADE)
	option = models.CharField(max_length=75)
	def __str__(self):
		return self.option + "  FROM_OPTION: " + self.enumDataType.attrName + " RISK: " + self.enumDataType.model.name

