from .models import Profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save # listen to the event when a model is saved.”
from django.dispatch import receiver

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, *args, **kwargs): 
    print(sender)
    print(instance)
    print(created)
    if created: # Created is a Boolean: True if new, False if updated; Only create a Profile if this is a new user.
        Profile.objects.create(user=instance)