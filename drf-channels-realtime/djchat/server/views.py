from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from drf_spectacular.utils import extend_schema

from .serializer import ServerSerializer, CategorySerializer
from .models import Server, Category
from .schema import server_list_docs

class CategoryListViewSet(viewsets.ViewSet):
  queryset = Category.objects.all()
  
  # @extend_schema(responses=CategorySerializer)
  def list(self, request):
    serializer = CategorySerializer(self.queryset, many=True)

    return Response(serializer.data)
  
class ServerListViewSet(viewsets.ViewSet):
  # Set the queryset to include all Server objects
  queryset = Server.objects.all()
  # permission_classes = [IsAuthenticated]

  @server_list_docs
  def list(self, request):
    """Retrieves a list of servers based on the provided query parameters.

    Args:
        request (Request): The HTTP request object.

    Raises:
        AuthenticationFailed: If the user is not authenticated and attempting
            user-specific queries.

        ValidationError: If the server ID is provided but no server with the
            given ID is found, or if an invalid value is provided.

    Returns:
        Response: The HTTP response object containing the serialized server data.

    Query Parameters:
        - category (str): Filter servers by category name. Only servers with the matching
            category name will be included in the response.

        - qty (int): Limit the number of servers returned. Only the specified number of
            servers will be included in the response. The servers are ordered by default
            based on their internal ordering.

        - by_user (bool): Filter servers by the currently authenticated user. If set to
            True, only the servers where the current user is a member will be included
            in the response.

        - by_serverid (int): Filter servers by server ID. If provided, only the server
            with the matching ID will be included in the response.

        - with_num_members (bool): Include the count of members in the server data. If set
            to True, each server object in the response will include an additional field
            'num_members' indicating the total number of members in the server.
    Note:
        - The query parameters can be used individually or in combination to perform
          complex filtering and retrieval of server data.

        - The resulting server data is serialized using the ServerSerializer, which
          provides a JSON representation of the server objects.
    """
    # Get query parameters
    category = request.query_params.get("category")
    qty = request.query_params.get("qty")
    by_user = request.query_params.get("by_user") == "true"
    by_serverid = request.query_params.get("by_serverid")
    with_num_members = request.query_params.get("with_num_members") == "true"

    # Check authentication for user-specific queries
    # if by_user or by_serverid and not request.user.is_authenticated:
    #   # Raise an AuthenticationFailed exception if user is not authenticated
    #   raise AuthenticationFailed()

    # Apply category filter if provided
    if category:
      self.queryset = self.queryset.filter(category__name=category)

    # Apply user filter if requested
    if by_user:
      if by_user and request.user.is_authenticated:
        user_id = request.user.id
        self.queryset = self.queryset.filter(member=user_id)
      else:
        raise AuthenticationFailed()
      
    # Annotate the queryset with the number of members if requested
    if with_num_members:
      self.queryset = self.queryset.annotate(num_members=Count("member"))

    # Apply quantity limit if provided
    if qty:
      self.queryset = self.queryset[:int(qty)]

    # Apply server ID filter if provided
    if by_serverid:
      if not request.user.is_authenticated:
        raise AuthenticationFailed()
        
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
