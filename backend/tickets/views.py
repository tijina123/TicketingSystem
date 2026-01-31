from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Ticket, Attachment
from .serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # 👈 important for file upload

    def get_queryset(self):
        return Ticket.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        ticket = serializer.save(created_by=self.request.user)

        # Get multiple files
        files = self.request.FILES.getlist('attachments')

        for file in files:
            Attachment.objects.create(ticket=ticket, file=file)
