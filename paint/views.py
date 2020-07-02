from django.shortcuts import render, redirect, get_object_or_404
from .models import Drawing
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
import json
import psycopg2

def home(request):
    if request.method == 'GET':
        context = {
        'title':'Welcome To Art-O-Gram!',
        'files': Drawing.objects.order_by('-added_date'),
        }
        return render(request, 'home.html', context)
    elif request.method == 'POST':
        #source =https://nidhinp.wordpress.com/2014/02/19/paint-app-in-django/
        filename = request.POST['save_fname']
        data = request.POST['save_cdata']
        image = request.POST['save_image']
        #included my additional fields below and in the save
        send = request.POST['send']
        other = request.POST['other']
        background = request.POST['background']
        #if the artist selects another user to send the image to this changes the filename and image owner
        if send == 'true':
            artist = get_object_or_404(User, pk=other)
            filename = '{} -sent from {}'.format(filename, request.user)
        else:
            artist = request.user
        #save as new drawing instance
        file_data = Drawing(title=filename, image=data, canvas_image=image, artist=artist, background=background)
        file_data.save()
        return HttpResponseRedirect('/')

@login_required
def delete(request, drawing_id):
    if request.method == 'POST':
        drawing = get_object_or_404(Drawing, pk=drawing_id)
        drawing.delete()
        return redirect('profile', user_id=request.user.id)

@login_required
def paint(request):
    if request.method == 'GET':
        return render(request, 'paint.html', {
        'title':'Welcome To Art-O-Gram!',
        'users': User.objects.order_by('-username'),
        })


@login_required
def update(request, drawing_id):
    drawing = Drawing.objects.get(pk=drawing_id)
    if request.method == 'GET':
        return render(request, 'update.html', {
        'title': 'Update {}'.format(drawing.title),
        'update_file':drawing,
        })

def view(request, drawing_id):
    drawing = Drawing.objects.get(pk=drawing_id)
    if request.method == 'GET':
        return render(request, 'view.html', {
        'title': 'Update {}'.format(drawing.title),
        'view_file':drawing,
        })
