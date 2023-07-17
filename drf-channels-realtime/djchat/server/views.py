from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count

from .serializer import ServerSerializer
from .models import Server

class ServerListViewSet(viewsets.ViewSet):
  # Set the queryset to include all Server objects
  queryset = Server.objects.all()

  def list(self, request):
    # Get query parameters
    category = request.query_params.get("category")
    qty = request.query_params.get("qty")
    by_user = request.query_params.get("by_user") == "true"
    by_serverid = request.query_params.get("by_serverid")
    with_num_members = request.query_params.get("with_num_members") == "true"

    # Check authentication for user-specific queries
    if by_user or by_serverid and not request.user.is_authenticated:
      # Raise an AuthenticationFailed exception if user is not authenticated
      raise AuthenticationFailed()

    # Apply category filter if provided
    if category:
      self.queryset = self.queryset.filter(category__name=category)

    # Apply user filter if requested
    if by_user:
      user_id = request.user.id
      self.queryset = self.queryset.filter(member=user_id)

    # Annotate the queryset with the number of members if requested
    if with_num_members:
      self.queryset = self.queryset.annotate(num_members=Count("member"))

    # Apply quantity limit if provided
    if qty:
      self.queryset = self.queryset[:int(qty)]

    # Apply server ID filter if provided
    if by_serverid:
      try:
        self.queryset = self.queryset.filter(id=by_serverid)
        if not self.queryset:
          # Raise a ValidationError if no server with the given ID is found
          raise ValidationError(detail=f"Server with id {by_serverid} not found")
      except ValueError:
        # Raise a ValidationError for invalid value
        raise ValidationError(detail="Value ERROR")

    # Serialize the queryset using ServerSerializer
    serverSerializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})

    # Return the serialized data in the response
    return Response(serverSerializer.data)
