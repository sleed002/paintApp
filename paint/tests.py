
from django.test import TestCase, Client
from .models import Drawing
from django.contrib.auth.models import User

class PaintTest(TestCase):

    def setUp(self): # this will run on before every test (each `test_` method)
        self.client = Client()
        # four tests here though all under one def
    def test_get_home(self):
        user = self.make_user()
        drawing = self.make_drawing(user)
        response = self.client.get('')
        self.assertEqual(200, response.status_code)
        self.assertContains(response, "Welcome to")
        self.assertContains(response, drawing.title)
        self.assertContains(response, drawing.background)

    def make_user(self):
        user = User(username="MickeyM")
        user.save()
        return user

    def make_drawing(self, user):
        drawing = Drawing(
            title="Art",
            background="red",
            artist=user
        )
        drawing.save()
        return drawing
