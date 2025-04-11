from django.contrib import admin
from .models import Profile
# Register your models here.

# admin.site.register(Profile)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    # When editing a Profile object in the admin, I want the created and updated fields to be visible but not editable.
    readonly_fields = ['created', 'updated']