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
