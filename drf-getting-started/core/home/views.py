from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status

from home.models import Person
from home.serializers import PeopleSerializers, LoginSerializer

@api_view(['POST'])
def login(request):
  data = request.data
  serializer = LoginSerializer(data=data)

  if serializer.is_valid():
    data = serializer.data
    print(data)
    return Response({"message":"success"})
  return Response(serializer.errors)

# APIView class
class PersonAPI(APIView):
  def get(self, request):
    objs = Person.objects.all()
    serializer = PeopleSerializers(objs, many=True)
    return Response(serializer.data)

  def post(self, request):
    data = request.data
    serializer = PeopleSerializers(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)
  
  def put(self, request):
    data = request.data
    serializer = PeopleSerializers(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)

  def patch(self, request):
    data = request.data
    obj = Person.objects.get(id=data['id'])
    serializer = PeopleSerializers(obj, data=data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)

  def delete(self, request):
    data = request.data
    obj = Person.objects.get(id=data["id"])
    obj.delete()
    return Response({"message":"person deleted"})

@api_view(["GET", "POST", "PUT"]) # for http methods
def index(request):
  courses = {
    "name":"Arnob",
    "learns":["django", "AI"],
    "course":"AI"
  }

  if request.method == 'GET': #check HTTP Method
    # query parameter 
    # only works in GET
    print(request.GET.get("search"))
    print("GET Method")
    return Response(courses)
  
  elif request.method == 'POST':
    data = request.data
    print(data)
    print("age", data["age"])
    print("POST Method")
    return Response(courses)
  
  elif request.method == 'PUT':
    print("PUT Method")
    return Response(courses)

# API Decorator
@api_view(['GET', 'POST', "PUT", "PATCH", "DELETE"])
def person(request):

  if request.method == "GET":
    # get all the data from DB
    # if we want to show the persons whose color is not null
    # objs = Person.objects.filter(color__isnull=False)
    objs = Person.objects.all()
    # convert them to JSON
    # many=True bc there are multiple data
    serializer = PeopleSerializers(objs, many=True)

    serializer_context = {
      "request" : (request)
    }
    context = serializer_context

    return Response(serializer.data)
  
  elif request.method == "POST":
    data = request.data
    # convert the JSON to QuerySet
    serializer = PeopleSerializers(data=data)
    # data validation
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    # Error if the data is not valid
    return Response(serializer.errors)
  
  # does full update
  elif request.method == "PUT":
    data = request.data
    # convert the JSON to QuerySet
    serializer = PeopleSerializers(data=data)
    # data validation
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    # Error if the data is not valid
    return Response(serializer.errors)
  
  # supports partial update. only send fields you want to update here
  elif request.method == "PATCH":
    data = request.data

    obj = Person.objects.get(id=data['id'])
    # convert the JSON to QuerySet. data bef, field we want to update
    serializer = PeopleSerializers(obj, data=data, partial=True)
    # data validation
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    # Error if the data is not valid
    return Response(serializer.errors)
  
  # Delete data
  # throws exception in data not found or error
  else:
    data = request.data
    obj = Person.objects.get(id=data["id"])
    obj.delete()
    return Response({"message":"person deleted"})
  
#modelviewset 
class PeopleViewSet(viewsets.ModelViewSet):
  serializer_class = PeopleSerializers
  queryset = Person.objects.all()

  def list(self, request):
    search = request.GET.get("search")
    queryset = self.queryset
    if search:
      queryset = queryset.filter(name__startswith=search)
    serializer = PeopleSerializers(queryset, many=True)
    return Response({"status":200, "data":serializer.data}, status=status.HTTP_200_OK)