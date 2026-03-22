// Mobile sidebar — hamburger open/close
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');

  // Focus trap
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function trapTab(e) {
    if (e.key !== 'Tab') return;
    var els = sidebar ? Array.from(sidebar.querySelectorAll(FOCUSABLE)) : [];
    if (!els.length) { e.preventDefault(); return; }
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
  }

  function openSidebar() {
    sidebar && sidebar.classList.add('sidebar--open');
    overlay && overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    toggle && toggle.setAttribute('aria-expanded', 'true');
    sidebar && sidebar.addEventListener('keydown', trapTab);
    // Move focus to first focusable element inside sidebar
    if (sidebar) {
      var first = sidebar.querySelector(FOCUSABLE);
      if (first) first.focus();
    }
  }

  function closeSidebar() {
    sidebar && sidebar.classList.remove('sidebar--open');
    overlay && overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    sidebar && sidebar.removeEventListener('keydown', trapTab);
    // Restore focus to the toggle button
    if (toggle) toggle.focus();
  }

  toggle && toggle.setAttribute('aria-expanded', 'false');
  toggle && toggle.addEventListener('click', openSidebar);
  overlay && overlay.addEventListener('click', closeSidebar);

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('sidebar--open')) {
      closeSidebar();
    }
  });
});
