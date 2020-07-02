from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Drawing(models.Model):

    title = models.CharField(max_length=30)
    image = models.TextField()
    artist = models.ForeignKey(User, on_delete=models.CASCADE)
    added_date = models.DateTimeField(default=timezone.now)
    canvas_image = models.TextField()
    background = models.TextField()

    def __str__(self):
        return self.title
    def prettify_datetime(self):
        return self.added_date.strftime('%b %e %y')
