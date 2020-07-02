
from django.urls import path
from . import views

urlpatterns = [
path('', views.home, name='home'),
path('paint/', views.paint, name='paint'),
path('<int:drawing_id>/delete/', views.delete, name='delete'),
path('<int:drawing_id>/update/', views.update, name='update'),
path('<int:drawing_id>/view/', views.view, name='view')
]
