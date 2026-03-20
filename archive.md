---
layout: page
title: Archive
description: All articles, grouped by year.
sitemap: false
no_toc: true
---

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year_group in posts_by_year %}
<h2 class="archive-year">{{ year_group.name }}</h2>
<ul class="archive-list">
{% for post in year_group.items %}
  <li class="archive-item">
    <time class="archive-item__date">{{ post.date | date: "%b %-d" }}</time>
    <a href="{{ post.url | relative_url }}" class="archive-item__title">{{ post.title }}</a>
    {% if post.categories.first %}
    <span class="archive-item__cat">{{ post.categories.first }}</span>
    {% endif %}
  </li>
{% endfor %}
</ul>
{% endfor %}
