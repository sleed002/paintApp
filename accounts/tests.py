
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse

signup_path = reverse('signup')
my_username="some_user"
my_password="some_password"
login_path = reverse('login')

class AccountsTest(TestCase):
    #three tests here
    def setUp(self):
        self.user = User(username=my_username)
        self.user.set_password(my_password)
        self.user.save()
        self.client = Client()

    def test_get_signup(self):
       response = self.client.get(signup_path)
       template_names = map(lambda t: t.name, response.templates)
       self.assertIn("signup.html", template_names)

    def test_get(self):
        response = self.client.get(login_path)
        template_names = map(lambda t: t.name, response.templates)
        self.assertIn("login.html", template_names)

    def test_post_success(self):
        response = self.post_login(my_username, my_password)
        self.assertEqual(self.user, response.context['user'])
        # print(response.content)
        self.assertContains(response, "Welcome")

    def post_login(self, some_username, some_password):
        return self.client.post(login_path, {
            'username': some_username,
            'password': some_password
        }, follow=True)
