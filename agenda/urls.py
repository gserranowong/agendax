from django.urls import path
from . import views

urlpatterns = [
    path('<int:event_id>', views.event, name='event-register'),
    path('new', views.new_event,name="new_event"),
    path('thanks', views.thanks),
    path('', views.index)
]
