from PIL import Image
from django.core.exceptions import ValidationError
import os
 
def validation_icon_image_size(image):
  if image:
    with Image.open(image) as img:
      if img.width>70 or img.height>70:
        raise ValidationError(
          f"The max allowerd dimentions for the image are 70X70 - size of the image uploaded: {img.size}"
        )

def validate_image_file_extension(value):
  # get the file extension. 0 is name of the file. 1 is extension 
  ext = os.path.splitext(value.name)[1]
  valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]

  if not ext.lower() in valid_extensions:
    raise ValidationError("Unsupported file extension")
  