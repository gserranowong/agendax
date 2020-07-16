# Generated by Django 3.0.8 on 2020-07-14 00:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agenda', '0003_auto_20200713_2333'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='registers',
        ),
        migrations.AddField(
            model_name='registerdetails',
            name='event',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='agenda.Event'),
            preserve_default=False,
        ),
    ]