from rest_framework import serializers
from .models import Person

class PeopleSerializers(serializers.ModelSerializer):
  class Meta:
    model = Person
    # fields you want to serialize or Required fields
    # if specific fields -> ["name", "age"]
    # if you want to add all the fields excluding some fields 
    # then exclude = ["age"]
    fields = '__all__'