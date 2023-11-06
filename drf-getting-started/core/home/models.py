from django.db import models
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return "posts/{filename}".format(filename=filename)

# Create your models here.
class Color(models.Model):
    color_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.color_name


class Person(models.Model):
    color = models.ForeignKey(Color, on_delete=models.CASCADE,null=True, blank=True, related_name="color")
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    image = models.ImageField(_("Image"), upload_to=upload_to, default="posts/default.jpg")