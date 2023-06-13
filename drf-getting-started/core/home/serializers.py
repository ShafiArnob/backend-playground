from rest_framework import serializers
from .models import Person, Color

class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField()

class ColorSerializers(serializers.ModelSerializer):
  class Meta:
    model = Color
    fields = ["color_name"]

class PeopleSerializers(serializers.ModelSerializer):
  #serializing foreign key data
  color = ColorSerializers()
  #custom serialize method
  color_info = serializers.SerializerMethodField()
  class Meta:
    model = Person
    # fields you want to serialize or Required fields
    # if specific fields -> ["name", "age"]
    # if you want to add all the fields excluding some fields 
    # then exclude = ["age"]
    fields = '__all__'
    # depth shows foreign field data too
    # depth = 1
  
  # custom method
  # same name ( get_* ) as the custom serialize method created above
  def get_color_info(self, obj):
    color_obj = Color.objects.get(id = obj.color.id)
    
    return {"color_name":color_obj.color_name, "hex_code":"#000"}

  # data validation
  def validate(self, data):
    if data['age'] < 18 :
      raise serializers.ValidationError("Age Should Be greater than 18")
    
    special_chars = "!@#$%^&*()<>_+-=?|`~"
    
    if any(c in special_chars for c in data["name"]):
      raise serializers.ValidationError("Name cannot Contain special chars")
    return data
  
  # def validate_age(self, data):
  #   if data['age'] < 18 :
  #     raise serializers.ValidationError("Age Should Be greater than 18")
  #   return data
  # def validate_name(self, data):
  #   special_chars = "!@#$%^&*()<>_+-=?|`~"
  #   if any(c in special_chars for c in data["name"]):
  #     raise serializers.ValidationError("Name cannot Contain special chars")
  #   return data
  