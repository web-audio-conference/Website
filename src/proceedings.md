---
layout: _layouts/general.liquid
title: 'Proceedings'
date: '2019-05-23'
---

## 2018

### Papers

{% for post in collections.year2018 %}
{% if post.data.type == 'Paper' %}
<i class="fas fa-file-pdf" style="font-size:22px;color:red;display:inline"></i>
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Keynotes

{% for post in collections.year2018 %}
{% if post.data.type == 'Keynote' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Videos

{% for post in collections.year2018 %}
{% if post.data.type == 'Video' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## 2017

### Papers

{% for post in collections.year2017 %}
{% if post.data.type == 'Paper' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Posters

{% for post in collections.year2017 %}
{% if post.data.type == 'Poster' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Demos

{% for post in collections.year2017 %}
{% if post.data.type == 'Demo' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Performances

{% for post in collections.year2017 %}
{% if post.data.type == 'Performance' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Talks

{% for post in collections.year2017 %}
{% if post.data.type == 'Talk' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Artworks

{% for post in collections.year2017 %}
{% if post.data.type == 'Artwork' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Keynotes

{% for post in collections.year2017 %}
{% if post.data.type == 'Keynote' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Videos

{% for post in collections.year2017 %}
{% if post.data.type == 'video' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## 2016

### Papers

{% for post in collections.year2016 %}
{% if post.data.type == 'Paper' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Demos

{% for post in collections.year2016 %}
{% if post.data.type == 'Demo' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Performances

{% for post in collections.year2016 %}
{% if post.data.type == 'Performance' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Talks

{% for post in collections.year2016 %}
{% if post.data.type == 'Talk' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Artworks

{% for post in collections.year2016 %}
{% if post.data.type == 'Artwork' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Keynotes

{% for post in collections.year2016 %}
{% if post.data.type == 'Keynote' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Tutorials

{% for post in collections.year2016 %}
{% if post.data.type == 'Tutorial' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## 2015

### Papers

{% for post in collections.year2015 %}
{% if post.data.type == 'Paper' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Posters

{% for post in collections.year2015 %}
{% if post.data.type == 'Poster' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Keynotes

{% for post in collections.year2015 %}
{% if post.data.type == 'Keynote' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

### Videos

{% for post in collections.year2015 %}
{% if post.data.type == 'Video' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}
