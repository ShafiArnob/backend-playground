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