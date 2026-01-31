from rest_framework import serializers

class PINLoginSerializer(serializers.Serializer):
    pin = serializers.CharField()
