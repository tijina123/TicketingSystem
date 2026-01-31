from rest_framework import serializers
from .models import Ticket, Attachment


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'uploaded_at']

    # 🔥 File validation (PDF requirement)
    def validate_file(self, file):
        # Limit file size to 5MB
        if file.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("File size must be less than 5MB.")

        # Allow only specific file types
        allowed_types = ['application/pdf', 'image/jpeg', 'image/png',
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

        if file.content_type not in allowed_types:
            raise serializers.ValidationError("Unsupported file type.")

        return file


class TicketSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['created_by']
