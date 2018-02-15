# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import RiskModel,BasicDataType,EnumDataType,EnumOption

admin.site.register(RiskModel)
admin.site.register(BasicDataType)
admin.site.register(EnumDataType)
admin.site.register(EnumOption)
