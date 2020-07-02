from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from .forms import SignUpForm
from paint.models import Drawing

def signup(request):
    registered = False # <= look! it's template boolean
    # This is totally optional, we'll use it to let the user know they're registered
    if request.method == 'POST':
        signup_form = SignUpForm(data=request.POST)
        if signup_form.is_valid():
            user = signup_form.save()
            user.set_password(user.password)
            user.save()
            registered = True
    else:
        signup_form = SignUpForm()

    return render(request, 'signup.html',{
            'title':'Sign up Below',
            'signup_form':signup_form,
            'registered': registered,
            })

def login(request):
    if request.method == 'POST':
        user = auth.authenticate(
        username=request.POST['username'],
        password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html',{
            'title':'Something Went Wrong',
            'error':'Username or Password Invalid'
            })

    return render(request, 'login.html',{'title':'Please Login'})

def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        return redirect('home')

@login_required
def profile(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    user_drawings = Drawing.objects.filter(artist=user_id).order_by('-added_date')
    context = {
    'title': 'Hi {}'.format(user.first_name),
    'user':user,
    'files': user_drawings,
    }
    return render(request, 'profile.html', context)
