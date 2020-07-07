# Generated by Django 3.0.8 on 2020-07-07 05:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agenda', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('owner', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField(null=True)),
                ('capacity', models.IntegerField()),
                ('is_recurrent', models.BooleanField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='EventRegistration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agenda.Event')),
            ],
        ),
        migrations.CreateModel(
            name='RecurrentSlot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week_day', models.CharField(choices=[('L', 'Lunes'), ('M', 'Martes'), ('MI', 'Miercoles'), ('J', 'Jueves'), ('V', 'Viernes'), ('S', 'Sabado'), ('D', 'Domingo')], max_length=2)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agenda.Event')),
            ],
        ),
        migrations.CreateModel(
            name='RegisterDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='Evento',
        ),
        migrations.AddField(
            model_name='eventregistration',
            name='register_details',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='agenda.RegisterDetails'),
        ),
    ]
