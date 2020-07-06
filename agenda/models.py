from django.db import models
name_length = 50
digit_length = 10
# Create your models here.
class Evento(models.Model):
    nombre=models.fields.CharField(max_length=name_length, null=False)
    costo=models.fields.DecimalField(max_digits=digit_length, decimal_places=2, null=False)
    cupo=models.fields.IntegerField(null=False)
    descripcion=models.fields.TextField()
    fecha_inicio=models.fields.DateTimeField(null=False)
    fecha_termino=models.fields.DateTimeField(null=True)
