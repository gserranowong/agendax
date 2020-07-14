from django import forms


class BootstrapCheckBoxWidget(forms.CheckboxInput):
    template_name = "agenda/checkbox.html"


class BootstrapDateTimePicker(forms.DateTimeInput):
    template_name = "agenda/datetimepicker.html"


class BootstrapText(forms.TextInput):
    template_name = "agenda/input.html"
