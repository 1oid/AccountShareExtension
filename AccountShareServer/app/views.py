from django.shortcuts import render
from django.views.generic import View
# Create your views here.
from django.http import JsonResponse

from app.models import SessionConfigItem


class SessionConfigItemView(View):

    colors = [
        '#99CCCC', '#FFCCCC', '#CC9966',
        '#993333', '#CC0033', '#FF0033',
        '#999933', '#FFCC99', '#FF9900',
        '#FFFFCC', '#FF9933', '#FF6600',
        '#CC6600', '#663300', '#FFFF00'
    ]

    def get_object(self, url, user):
        try:
            return SessionConfigItem.objects.get(source_url=url, source_user=user)
        except SessionConfigItem.DoesNotExist as e:
            return None

    def get(self, request):
        return JsonResponse({
            "code": 200,
            "data": [
                {
                    "user": item.source_user,
                    "cookie": item.cookie_content,
                    "url": item.source_url,
                    "favicon": item.source_favicon,
                    "create_time": item.create_time.strftime("%Y-%m-%d"),
                    "title": item.source_title
                } for item in SessionConfigItem.objects.all()
            ]
        })

    def post(self, request):
        user = request.POST.get("user")
        cookie_text = request.POST.get("cookie")
        favicon = request.POST.get("favicon")
        url = request.POST.get("url")
        title = request.POST.get("title")

        print(user, cookie_text, favicon, url)

        _object = self.get_object(url=url, user=user)

        if not _object:
            _object = SessionConfigItem.objects.create(
                source_user=user, cookie_content=cookie_text, source_favicon=favicon, source_url=url
            )
        _object.cookie_content = cookie_text
        _object.source_title = title
        _object.save()

        return JsonResponse({
            "code": 200,
            "msg": "成功"
        })


