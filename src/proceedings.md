---
layout: _layouts/base.liquid
title: 'Proceedings'
date: '2019-05-23'
---

# 2015

{% for post in collections.year2015 %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endfor %}

# 2016

{% for post in collections.year2016 %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endfor %}

# 2017

## Papers

{% for post in collections.year2017 %}
{% if post.data.type == 'Paper' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Posters

{% for post in collections.year2017 %}
{% if post.data.type == 'Poster' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Demos

{% for post in collections.year2017 %}
{% if post.data.type == 'Demo' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Performances

{% for post in collections.year2017 %}
{% if post.data.type == 'Performance' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Talks

{% for post in collections.year2017 %}
{% if post.data.type == 'Talk' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Posters

{% for post in collections.year2017 %}
{% if post.data.type == 'Poster' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}

## Artworks

{% for post in collections.year2017 %}
{% if post.data.type == 'Artwork' %}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{% endif %}
{% endfor %}