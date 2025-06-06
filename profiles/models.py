from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(default='avatar.png', upload_to='avatars')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self): # defines what an object prints when call str(object), like toString()
        return f"profile of the user {self.user.username}"
        # for here, the 'f' => formatted string literal, like $ inside the C#