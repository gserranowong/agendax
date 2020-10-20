from django import forms
from agenda.models import RegisterDetails, Event
from django.forms import widgets
from agenda.widget import BootstrapCheckBoxWidget, BootstrapDateTimePicker, BootstrapText

name_size = 100


class EventRegistrationForm(forms.ModelForm):
    class Meta:
        model = RegisterDetails
        fields = ['name', 'phone_number', 'address', 'email']
        form_attrs = {
            "class": "form-control"
        }
        widgets = {
            'name': forms.TextInput(attrs=form_attrs),
            'phone_number': forms.NumberInput(attrs=form_attrs),
            'address': forms.TextInput(attrs=form_attrs),
            'email': forms.TextInput(attrs=form_attrs),
        }


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['name', 'cost', 'start_date', 'end_date', 'capacity', 'is_recurrent', 'description']
        form_attrs = {
            "class" : "form-control"
        }
        widgets = {
            'name': forms.TextInput(attrs=form_attrs),
            'cost': forms.NumberInput(attrs=form_attrs),
            'capacity': forms.NumberInput(attrs=form_attrs),
            'start_date': BootstrapDateTimePicker(attrs={
                "class": "datepicker"
            }),
            'end_date': BootstrapDateTimePicker(attrs={
                "class": "datepicker"
            }),
            'description': widgets.Textarea(attrs={
                "class": "form-control"
            }),
            'is_recurrent': BootstrapCheckBoxWidget(attrs={
                "id": "is_recurrent",
                "onclick": "toogleTypeEvent()"
            })
        }
