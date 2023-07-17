# Generated by Django 4.2.3 on 2023-07-17 14:38

from django.db import migrations, models
import server.models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="icon",
            field=models.FileField(
                blank=True, null=True, upload_to=server.models.category_icon_upload_path
            ),
        ),
        migrations.AlterField(
            model_name="server",
            name="description",
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
