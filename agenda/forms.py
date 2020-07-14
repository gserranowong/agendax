from django import forms
from agenda.models import RegisterDetails, Event
from django.forms.widgets import  DateTimeInput

name_size = 100


class EventRegistrationForm(forms.ModelForm):
    class Meta:
        model = RegisterDetails
        fields = ['name', 'phone_number', 'address', 'email']


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['name', 'cost', 'start_date', 'end_date', 'capacity', 'is_recurrent', 'description']
