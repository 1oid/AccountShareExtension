from django.db import models

# Create your models here.


class SessionConfigItem(models.Model):
    cookie_content = models.TextField(verbose_name="cookie内容")
    source_user = models.CharField(max_length=20, verbose_name="来源用户")
    source_url = models.TextField(verbose_name="来源URL")
    source_title = models.CharField(max_length=100, verbose_name="来源标题")
    source_favicon = models.CharField(max_length=100, verbose_name="来源标题")
    create_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    def __str__(self):
        return self.source_user + ""
