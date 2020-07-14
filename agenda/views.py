from django.shortcuts import render
from django.template.response import TemplateResponse
from django.shortcuts import get_object_or_404
from agenda.models import Event
from agenda.forms import EventRegistrationForm, EventForm
from django.http import HttpResponseRedirect


# Create your views here.

def event(request, event_id):
    event = get_object_or_404(Event, pk=event_id)

    if request.method == 'POST':
        form = EventRegistrationForm(request.POST)

        if form.is_valid():
            registration = form.save()

            event.registers.add(registration)
            event.save()
            return HttpResponseRedirect('/event/thanks')

    form = EventRegistrationForm()
    return TemplateResponse(request, 'agenda/event.html', {"event": event, "form": form})


def index():
    pass


def thanks(request):
    return TemplateResponse(request, 'agenda/thanks.html', {})


def new_event(request):
    form = EventForm()
    return TemplateResponse(request, 'agenda/new.html', {"form":form})
