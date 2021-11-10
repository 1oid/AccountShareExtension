from django.contrib import admin

# Register your models here.
from app.models import SessionConfigItem


@admin.register(SessionConfigItem)
class SessionConfigItemSite(admin.ModelAdmin):
    list_display = [
        "source_title", "source_user", "source_url", "create_time"
    ]
