# Generated by Django 2.0.5 on 2018-06-18 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paint', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='drawing',
            name='background',
            field=models.TextField(default='white'),
            preserve_default=False,
        ),
    ]
