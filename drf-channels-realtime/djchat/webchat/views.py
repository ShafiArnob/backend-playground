from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.routers import Response
from .serializer import MessageSerializer
from .models import Conversation

class MessageViewSet(viewsets.ViewSet):
  def list(self, request):
    channel_id = request.query_params.get("channel_id")

    try:
      conversation = Conversation.objects.get(channel_id=channel_id)
      messages = conversation.message.all()

      serializer = MessageSerializer(messages, many=True)
      return Response(serializer.data)
    except Conversation.DoesNotExist:
      return Response([])