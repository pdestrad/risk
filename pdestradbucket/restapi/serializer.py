from rest_framework import serializers

from .models import RiskModel,BasicDataType,EnumDataType,EnumOption

class BasicDataTypeSerializer(serializers.ModelSerializer):
	class Meta: 
		model = BasicDataType
		fields = '__all__'

class EnumOptionSerializer(serializers.ModelSerializer):
	class Meta: 
		model = EnumOption
		fields = '__all__'

class EnumDataTypeSerializer(serializers.ModelSerializer):
	options = EnumOptionSerializer(many=True)
	class Meta:
		model = EnumDataType
		fields = '__all__'

class RiskModelSerializer(serializers.ModelSerializer):
	basics = BasicDataTypeSerializer(many=True)
	enums = EnumDataTypeSerializer(many=True)
	class Meta: 
		model = RiskModel
		fields = '__all__'

	def create(self, validated_data):
		enums_data = validated_data.pop('enums')
		basics_data = validated_data.pop('basics')
		riskModel = RiskModel.objects.create(**validated_data)

		for basic_data in basics_data:
			BasicDataType.objects.create(model=riskModel, **basic_data)

		for enum_data in enums_data:
			enum = EnumDataType.objects.create(model=riskModel, **enum_data)
			options_data = enum_data.pop('options')
			for option_data in options_data:
				EnumOption.objects.create(enumDataType=enum, **option_data)

		return riskModel




