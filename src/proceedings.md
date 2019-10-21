---
layout: _layouts/base.liquid
title: 'Proceedings'
date: '2019-05-23'
---

# 2015

## Papers

{% for post in collections.year2015 %}
{% if post.data.type == 'Paper' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Posters

{% for post in collections.year2015 %}
{% if post.data.type == 'Poster' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

# 2016

{% for post in collections.year2016 %}
<a href="{{ post.url }}">{{ post.data.author }}: {{ post.data.title }}</a>
{% endfor %}

# 2017

## Papers

{% for post in collections.year2017 %}
{% if post.data.type == 'Paper' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Posters

{% for post in collections.year2017 %}
{% if post.data.type == 'Poster' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Demos

{% for post in collections.year2017 %}
{% if post.data.type == 'Demo' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Performances

{% for post in collections.year2017 %}
{% if post.data.type == 'Performance' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Talks

{% for post in collections.year2017 %}
{% if post.data.type == 'Talk' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Artworks

{% for post in collections.year2017 %}
{% if post.data.type == 'Artwork' %}
{{ post.data.author }}:
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}
