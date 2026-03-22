// Search — Lunr.js powered client-side search with Cmd+K shortcut
// Requires lunr.js loaded as a global (assets/js/vendor/lunr.min.js)

(function () {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const status = document.getElementById('search-status');
  const closeBtn = document.getElementById('search-close');

  if (!overlay || !input || !results) return;

  // Focus trap helpers
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function getFocusable() { return Array.from(overlay.querySelectorAll(FOCUSABLE)); }
  function trapTab(e) {
    if (e.key !== 'Tab') return;
    const els = getFocusable();
    if (!els.length) { e.preventDefault(); return; }
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
  }

  function announce(msg) {
    if (status) status.textContent = msg;
  }

  let index = null;
  let documents = [];
  let indexLoaded = false;
  let loading = false;
  let lastFocus = null;

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
    lastFocus = document.activeElement;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    overlay.addEventListener('keydown', trapTab);
    input.focus();
    loadIndex(function () {
      if (input.value) runSearch(input.value);
    });
  }

  function closeSearch() {
    overlay.removeEventListener('keydown', trapTab);
    overlay.classList.add('search-overlay--closing');
    setTimeout(function () {
      overlay.classList.add('hidden');
      overlay.classList.remove('search-overlay--closing');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');
      input.value = '';
      results.innerHTML = '';
      announce('');
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
      lastFocus = null;
    }, 150);
  }

  function renderResults(hits) {
    if (!hits.length) {
      results.innerHTML = '<p class="px-4 py-3 text-sm text-gray-500">No results found.</p>';
      announce('No results found.');
      return;
    }
    const shown = Math.min(hits.length, 8);
    announce(shown + ' result' + (shown === 1 ? '' : 's') + ' found.');
    results.innerHTML = hits.slice(0, 8).map(function (hit) {
      const doc = documents.find(d => d.id === hit.ref);
      if (!doc) return '';
      return (
        '<a href="' + doc.url + '" class="search-result-item">' +
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
