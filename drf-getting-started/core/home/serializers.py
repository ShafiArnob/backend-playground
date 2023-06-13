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

  # def validate_age(self, data):
  #   if data['age'] < 18 :
  #     raise serializers.ValidationError("Age Should Be greater than 18")
  #   return data
  # def validate_name(self, data):
  #   special_chars = "!@#$%^&*()<>_+-=?|`~"
  #   if any(c in special_chars for c in data["name"]):
  #     raise serializers.ValidationError("Name cannot Contain special chars")
  #   return data
  
  # data validation
  def validate(self, data):
    if data['age'] < 18 :
      raise serializers.ValidationError("Age Should Be greater than 18")
    
    special_chars = "!@#$%^&*()<>_+-=?|`~"
    
    if any(c in special_chars for c in data["name"]):
      raise serializers.ValidationError("Name cannot Contain special chars")
    return data
  
