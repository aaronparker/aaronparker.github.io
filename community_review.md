---
layout: about
title: Community
description: A list of community awards, and speaking engagements and presentations.
hide_description: true
---
Selected details of community related content. I have presented at events including **Citrix Synergy**, **BriForum** & **E2EVC** conferences in the US, Europe and Australia since 2011, writing here since 2004 and contributing to the community in a number of other areas. 

## Awards

I am very fortunate to have been awarded the following community recognitions:

{% for award in site.data.awards %}* <img src="{{ award.logo | prepend: site.baseurl }}" alt="{{ award.name }}" style="height:1.25rem;display:inline;vertical-align:middle;margin-right:0.4rem;"> {% if award.url %}[{{ award.name }}]({{ award.url }}){% else %}{{ award.name }}{% endif %}{% if award.category %} — {{ award.category }}{% endif %} ({{ award.years }})
{% endfor %}

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

{% for pub in site.data.publications %}* {{ pub.date }}: {% if pub.url %}[{{ pub.title }}]({{ pub.url }}){% else %}{{ pub.title }}{% endif %}
{% endfor %}
