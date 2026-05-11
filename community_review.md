---
layout: about
title: Community
description: 
hide_description: true
---
Selected details of community related content. I have presented at events including **Citrix Synergy**, **BriForum** & **E2EVC** conferences in the US, Europe and Australia since 2011, writing here since 2004 and contributing to the community in a number of other areas. 

## Awards

I am very fortunate to have been awarded the following community recognitions:

<div class="award-timeline">
{% for award in site.data.awards %}
<div class="award-entry">
  <div class="award-entry__header">
    <div class="award-entry__info">
      <img src="{{ award.logo | prepend: site.baseurl }}" alt="{{ award.name }}" class="award-entry__logo">
      <div>
        <p class="award-entry__name">{% if award.url %}<a href="{{ award.url }}">{{ award.name }}</a>{% else %}{{ award.name }}{% endif %}</p>
        {% if award.category %}<p class="award-entry__category">{{ award.category }}</p>{% endif %}
      </div>
    </div>
    <span class="award-entry__dates">{% if award.end == award.start %}{{ award.start }}{% else %}{{ award.start }}–{{ award.end }}{% endif %}</span>
  </div>
</div>
{% endfor %}
</div>

## Speaking & Presentations

Below is a selection of speaking engagements and presentations, with recordings or links where available:

<div class="presentation-timeline">
{% assign grouped = site.data.presentations | group_by: "year" %}
{% for group in grouped %}
<div class="presentation-year-group">
  <span class="presentation-year-group__year">{{ group.name }}</span>
  <div class="presentation-year-group__talks">
    {% for talk in group.items %}
    <div class="presentation-entry">
      <div class="presentation-entry__header">
        <div>
          <p class="presentation-entry__title">{% if talk.url %}<a href="{{ talk.url }}">{{ talk.title }}</a>{% else %}{{ talk.title }}{% endif %}</p>
          <p class="presentation-entry__meta">{{ talk.event }}{% if talk.location %} &middot; {{ talk.location }}{% endif %}</p>
        </div>
        {% if talk.month_name %}<span class="presentation-entry__date">{{ talk.month_name }}</span>{% endif %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endfor %}
</div>

## Publications

Below is a list of publications that I've written, co-authored or contributed to:

<div class="publication-timeline">
{% assign grouped = site.data.publications | group_by_exp: "pub", "pub.date | split: ' ' | last" %}
{% for group in grouped %}
<div class="publication-year-group">
  <span class="publication-year-group__year">{{ group.name }}</span>
  <div class="publication-year-group__items">
    {% for pub in group.items %}
    <div class="publication-entry">
      <div class="publication-entry__header">
        <p class="publication-entry__title">{% if pub.url %}<a href="{{ pub.url }}">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}</p>
        <span class="publication-entry__date">{{ pub.date }}</span>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endfor %}
</div>
