from django.conf.urls import url
from frontend import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create$', views.create, name='create'),
    url(r'^get$', views.get, name='get'),
]
