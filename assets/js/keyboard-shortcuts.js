// Global keyboard shortcuts
(function () {
  function isTyping() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  }

  const modal = document.getElementById('keyboard-shortcuts-modal');
  var lastFocus = null;

  // Focus trap
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function trapTab(e) {
    if (e.key !== 'Tab') return;
    var els = modal ? Array.from(modal.querySelectorAll(FOCUSABLE)) : [];
    if (!els.length) { e.preventDefault(); return; }
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function refreshPrefs() {
    setText('pref-theme',         localStorage.getItem('theme')         || 'system default');
    setText('pref-accent',        localStorage.getItem('accent-theme')  || 'indigo (default)');
    setText('pref-blog-view',     localStorage.getItem('blog-view')     || 'grid (default)');
    setText('pref-projects-view', localStorage.getItem('projects-view') || 'grid (default)');
  }

  function openHelp() {
    if (!modal) return;
    lastFocus = document.activeElement;
    refreshPrefs();
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    modal.addEventListener('keydown', trapTab);
    var closeBtn = document.getElementById('keyboard-shortcuts-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeHelp() {
    if (!modal) return;
    modal.removeEventListener('keydown', trapTab);
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function helpIsOpen() {
    return modal && !modal.classList.contains('hidden');
  }

  // Close on overlay click
  modal && modal.addEventListener('click', function (e) {
    if (e.target === modal) closeHelp();
  });

  document.getElementById('keyboard-shortcuts-close') &&
    document.getElementById('keyboard-shortcuts-close').addEventListener('click', closeHelp);

  var resetBtn = document.getElementById('prefs-reset-btn');
  resetBtn && resetBtn.addEventListener('click', function () {
    ['theme', 'accent-theme', 'blog-view', 'projects-view'].forEach(function (k) {
      localStorage.removeItem(k);
    });
    location.reload();
  });

  document.addEventListener('keydown', function (e) {
    // Let browser/search modifier combos through
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    // Escape — close help modal (other modals handled by their own scripts)
    if (e.key === 'Escape' && helpIsOpen()) {
      closeHelp();
      return;
    }

    // '?' — toggle help (Shift+/ on most keyboards)
    if (e.key === '?' && !isTyping()) {
      e.preventDefault();
      helpIsOpen() ? closeHelp() : openHelp();
      return;
    }

    // Remaining shortcuts require no modifier and no active text input
    if (isTyping()) return;

    // '/' — open search
    if (e.key === '/') {
      e.preventDefault();
      var searchBtn = document.getElementById('search-btn');
      searchBtn && searchBtn.click();
      return;
    }

    // 'd' — toggle dark mode
    if (e.key === 'd') {
      if (typeof toggleDark === 'function') toggleDark();
      return;
    }

    // Arrow keys — blog pagination (only when a pagination nav is present)
    var pagNav = document.querySelector('[aria-label="Blog pagination"]');
    if (!pagNav) return;

    if (e.key === 'ArrowLeft') {
      var newer = pagNav.querySelector('div:first-child a');
      if (newer) { e.preventDefault(); window.location.href = newer.href; }
    }

    if (e.key === 'ArrowRight') {
      var older = pagNav.querySelector('div:last-child a');
      if (older) { e.preventDefault(); window.location.href = older.href; }
    }
  });
})();
