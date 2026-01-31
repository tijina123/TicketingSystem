from django.urls import path
from .views import PINLoginView

urlpatterns = [
    path('login/', PINLoginView.as_view(), name='pin-login'),
]