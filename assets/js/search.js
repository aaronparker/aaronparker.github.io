// Search — Lunr.js powered client-side search with Cmd+K shortcut
// Requires lunr.js loaded as a global (assets/js/vendor/lunr.min.js)

(function () {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const closeBtn = document.getElementById('search-close');

  if (!overlay || !input || !results) return;

  let index = null;
  let documents = [];
  let indexLoaded = false;
  let loading = false;

  // Load search index on demand
  function loadIndex(callback) {
    if (indexLoaded) { callback(); return; }
    if (loading) { return; }
    loading = true;

    const baseUrl = document.documentElement.dataset.baseurl || '';
    fetch(baseUrl + '/assets/js/search-index.json')
      .then(r => r.json())
      .then(function (data) {
        documents = data;
        index = lunr(function () {
          this.ref('id');
          this.field('title', { boost: 10 });
          this.field('excerpt', { boost: 3 });
          this.field('categories');
          data.forEach(doc => this.add(doc));
        });
        indexLoaded = true;
        loading = false;
        callback();
      })
      .catch(function () {
        loading = false;
        results.innerHTML = '<p class="px-4 py-3 text-sm text-gray-500">Failed to load search index.</p>';
      });
  }

  function openSearch() {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    input.focus();
    loadIndex(function () {
      if (input.value) runSearch(input.value);
    });
  }

  function closeSearch() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    input.value = '';
    results.innerHTML = '';
  }

  function renderResults(hits) {
    if (!hits.length) {
      results.innerHTML = '<p class="px-4 py-3 text-sm text-gray-500">No results found.</p>';
      return;
    }
    results.innerHTML = hits.slice(0, 8).map(function (hit) {
      const doc = documents.find(d => d.id === hit.ref);
      if (!doc) return '';
      return (
        '<a href="' + doc.url + '" class="search-result-item" role="option">' +
          '<span class="search-result-title">' + escapeHtml(doc.title) + '</span>' +
          (doc.excerpt ? '<span class="search-result-excerpt">' + escapeHtml(doc.excerpt.slice(0, 100)) + '…</span>' : '') +
        '</a>'
      );
    }).join('');
  }

  function runSearch(query) {
    if (!query.trim()) { results.innerHTML = ''; return; }
    if (!index) return;
    try {
      const hits = index.search(query + '~1');
      renderResults(hits);
    } catch (e) {
      try {
        const hits = index.search(query);
        renderResults(hits);
      } catch (_) {
        results.innerHTML = '';
      }
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Open triggers
  document.querySelectorAll('[id^="search-btn"]').forEach(function (btn) {
    btn.addEventListener('click', openSearch);
  });

  // Close triggers
  closeBtn && closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  // Keyboard: Cmd+K / Ctrl+K, Escape
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('hidden') ? openSearch() : closeSearch();
    }
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeSearch();
    }
  });

  input.addEventListener('input', function () {
    if (!indexLoaded) {
      loadIndex(function () { runSearch(input.value); });
    } else {
      runSearch(input.value);
    }
  });

  // Keyboard navigation within results
  input.addEventListener('keydown', function (e) {
    const items = results.querySelectorAll('.search-result-item');
    const focused = results.querySelector('.search-result-item:focus');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!focused && items[0]) items[0].focus();
      else if (focused && focused.nextElementSibling) focused.nextElementSibling.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focused && focused.previousElementSibling) focused.previousElementSibling.focus();
      else input.focus();
    }
  });

  results.addEventListener('keydown', function (e) {
    const focused = results.querySelector('.search-result-item:focus');
    if (!focused) return;
    if (e.key === 'ArrowDown' && focused.nextElementSibling) {
      e.preventDefault();
      focused.nextElementSibling.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focused.previousElementSibling) focused.previousElementSibling.focus();
      else input.focus();
    }
  });
})();
