---
layout: page
title: Projects
description: Open source projects and tools for end-user computing, device management, and automation.
featured: true
---

If you've found any of the projects below useful and wish to show support, I'm partial to a good coffee:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T5A9D44)

<div class="project-grid">
{% for project in site.data.projects %}
<div class="project-card">
  {% if project.image %}
  <div class="project-card__image">
    <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" loading="lazy" class="no-zoom">
  </div>
  {% endif %}
  <div class="project-card__body">
    <h3 class="project-card__title">{{ project.title }}</h3>
    <p class="project-card__description">{{ project.description }}</p>
    {% if project.tags %}
    <div class="project-card__tags">
      {% for tag in project.tags %}
      <span class="category-pill">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
    <a href="{{ project.url }}" class="project-card__link" target="_blank" rel="noopener noreferrer">
      View project {% include icons/external-link.svg %}
    </a>
  </div>
</div>
{% endfor %}
</div>

## Projects at Nerdio

Here's a sample of projects or features that I've worked on at Nerdio:

![nerdio icon](/assets/projects/nerdio.png)

* **Operational Efficiency dashboard** - shows the active time and effort savings that Nerdio Manager provides to a customer in their environment for Azure Virtual Desktop, Windows 365, and Intune
* **Windows 365 migration** - Nerdio Manager enables customers to migrate suitable Azure Virtual Desktop workloads to Windows 365, simplifying personal desktop management without user interruption
* **Nerdio Migrate** - Nerdio Manager simplifies migration of legacy VDI workloads to Azure Virtual Desktop and Windows 365
