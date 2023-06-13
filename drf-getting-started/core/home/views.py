from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET", "POST", "PUT"]) # for http methods
def index(request):
  courses = {
    "name":"Arnob",
    "learns":["django", "AI"],
    "course":"AI"
  }

  if request.method == 'GET': #check HTTP Method
    print("GET Method")
    return Response(courses)
  
  elif request.method == 'POST':
    print("POST Method")
    return Response(courses)
  elif request.method == 'PUT':
    print("PUT Method")
    return Response(courses)