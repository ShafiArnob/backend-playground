from rest_framework.decorators import api_view
from rest_framework.response import Response

from home.models import Person
from home.serializers import PeopleSerializers

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

@api_view(['GET', 'POST', "PUT", "PATCH", "DELETE"])
def person(request):
  if request.method == "GET":
    # get all the data from DB
    # if we want to show the persons whose color is not null
    # Person.objects.filter(color__isnull=False)
    objs = Person.objects.all()
    # convert them to JSON
    # many=True bc there are multiple data
    serializer = PeopleSerializers(objs, many=True)
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