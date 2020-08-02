from django.shortcuts import render
from django.template.response import TemplateResponse
from django.shortcuts import get_object_or_404
from agenda.models import (Event, RecurrentSlot)
from agenda.forms import EventRegistrationForm, EventForm
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.forms import inlineformset_factory


# Create your views here.

def event(request, event_id):
    event = get_object_or_404(Event, pk=event_id)

    if request.method == 'POST':
        form = EventRegistrationForm(request.POST)

        if form.is_valid():
            registration = form.save(commit=False)

            registration.event = event

            registration.save()

            return HttpResponseRedirect('/event/thanks')
    else:
        form = EventRegistrationForm()

    return TemplateResponse(request, 'agenda/event.html', {"event": event, "form": form})


def index():
    pass


def thanks(request):
    return TemplateResponse(request, 'agenda/thanks.html', {})


def new_event(request):
    RecurrentInlineFormSet = inlineformset_factory(Event, RecurrentSlot, fields=['week_day', 'start_time', 'end_time'])
    if request.method == 'POST':
        form = EventForm(request.POST)

        if form.is_valid():
            db_event = form.save()

            recurrent = RecurrentInlineFormSet(request.POST, request.FILES, instance=db_event);

            if recurrent.is_valid():
                recurrent.save()
            return HttpResponseRedirect(reverse('event-register', kwargs={"event_id": db_event.id}))
    else:
        form = EventForm()
    return TemplateResponse(request, 'agenda/new.html', {"form": form})
