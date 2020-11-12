"""machinevision URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Project app urls

    # IMPORTANT!!!
    # Frontend urls has some regex that allows the frontend to handle routing
    # which is done by using React Router
    # If you need to work on Django REST framework APIs and you want to see
    # the available API endpoints in the browser, then check the comments
    # in frontend.urls
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include('alarms.urls')),
]
