from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import SupportPIN

class PINLoginView(APIView):
    def post(self, request):
        pin = request.data.get('pin')

        try:
            pin_obj = SupportPIN.objects.get(pin=pin, is_used=False)
        except SupportPIN.DoesNotExist:
            return Response({'error': 'Invalid or used PIN'}, status=400)

        pin_obj.is_used = True
        pin_obj.save()

        refresh = RefreshToken.for_user(pin_obj.user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': pin_obj.user.id,
                'username': pin_obj.user.username
            }
        })
