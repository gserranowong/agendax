from django.db import models

name_length = 50
text_field_length = 50
digit_length = 10


class Event(models.Model):
    name = models.CharField(max_length=name_length, null=False)
    cost = models.DecimalField(max_digits=digit_length, decimal_places=2, null=False)
    start_date = models.DateTimeField(null=False)
    end_date = models.DateTimeField(null=True)
    capacity = models.IntegerField(null=False)
    is_recurrent = models.BooleanField()
    description = models.TextField()

    def remaining(self):
        return self.capacity - self.registerdetails_set.all().count()


class Company(models.Model):
    name = models.CharField(max_length=text_field_length)
    owner = models.CharField(max_length=text_field_length)
    phone_number = models.CharField(max_length=text_field_length)
    address = models.CharField(max_length=text_field_length)
    email = models.CharField(max_length=text_field_length)


class RecurrentSlot(models.Model):
    DAYS_IN_WEEK = [('L', 'Lunes'),
                    ('M', 'Martes'),
                    ('MI', 'Miercoles'),
                    ('J', 'Jueves'),
                    ('V', 'Viernes'),
                    ('S', 'Sabado'),
                    ('D', 'Domingo')
                    ]
    week_day = models.CharField(max_length=2, choices=DAYS_IN_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)


class RegisterDetails(models.Model):
    name = models.CharField(max_length=text_field_length)
    phone_number = models.CharField(max_length=text_field_length)
    address = models.CharField(max_length=text_field_length)
    email = models.CharField(max_length=text_field_length)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
