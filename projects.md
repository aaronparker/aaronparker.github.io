---
layout: page
title: Projects
description: Projects and tools for end-user computing, device management, and automation.
featured: true
hide_description: true
---

<header class="mb-8 flex items-start justify-between gap-4">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-slate-50">Projects</h1>
    <p class="text-gray-600 dark:text-slate-400 mt-1">Projects and tools for end-user computing, device management, and automation.</p>
    <p class="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 mt-2">
      <svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="color: var(--color-accent)"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Updated {{ page.last_modified_at | date: "%b %-d, %Y" }}
    </p>
  </div>
  <!-- View toggle -->
  <div class="flex items-center gap-1 mt-1">
    <button id="proj-grid-btn" class="dark-toggle" aria-label="Grid view" title="Grid view">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    </button>
    <button id="proj-list-btn" class="dark-toggle" aria-label="List view" title="List view">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>
      </svg>
    </button>
  </div>
</header>

<div id="project-grid" class="project-grid">
{% for project in site.data.projects %}
{% if project.url %}
<a href="{{ project.url }}" class="project-card no-underline" target="_blank" rel="noopener noreferrer">
{% else %}
<div class="project-card">
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
  </div>
{% if project.url %}
</a>
{% else %}
</div>
{% endif %}
{% endfor %}
</div>

<script>
(function () {
  var grid    = document.getElementById('project-grid');
  var gridBtn = document.getElementById('proj-grid-btn');
  var listBtn = document.getElementById('proj-list-btn');
  var KEY     = 'projects-view';

  function setView(view) {
    var isList = view === 'list';
    grid.classList.toggle('project-list', isList);
    gridBtn.classList.toggle('view-btn--active', !isList);
    listBtn.classList.toggle('view-btn--active', isList);
    localStorage.setItem(KEY, isList ? 'list' : 'grid');
  }

  gridBtn.addEventListener('click', function () { setView('grid'); });
  listBtn.addEventListener('click', function () { setView('list'); });

  setView(localStorage.getItem(KEY) || 'grid');
})();
</script>
