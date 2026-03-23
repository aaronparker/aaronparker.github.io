// Apply theme before paint to prevent flash.
// State: localStorage.theme ('light'|'dark') + localStorage.accessible ('1'|absent)
(function () {
  var html = document.documentElement;
  if (localStorage.getItem('accessible') === '1') {
    html.classList.add('accessible');
  } else {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    }
  }
})();

function updateDarkToggle(isDark) {
  document.querySelectorAll('[id^="dark-toggle"]').forEach(function (btn) {
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  });
}

function updateAccessibleToggle(isAccessible) {
  document.querySelectorAll('[id^="accessible-toggle"]').forEach(function (btn) {
    btn.setAttribute('aria-label', isAccessible ? 'Disable accessible theme' : 'Enable accessible theme');
    btn.setAttribute('aria-pressed', isAccessible ? 'true' : 'false');
  });
}

function toggleDark() {
  var html = document.documentElement;
  // Exit accessible mode if active
  html.classList.remove('accessible');
  localStorage.removeItem('accessible');
  // Toggle dark
  var isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateDarkToggle(isDark);
  updateAccessibleToggle(false);
}

function toggleAccessible() {
  var html = document.documentElement;
  var isNowAccessible = !html.classList.contains('accessible');
  if (isNowAccessible) {
    html.classList.add('accessible');
    html.classList.remove('dark');
    localStorage.setItem('accessible', '1');
  } else {
    html.classList.remove('accessible');
    localStorage.removeItem('accessible');
    // Re-apply saved dark/light preference
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
    }
  }
  updateDarkToggle(html.classList.contains('dark'));
  updateAccessibleToggle(isNowAccessible);
}

// Backward compatibility for keyboard-shortcuts.js ('d' key)
window.toggleDark = toggleDark;

document.addEventListener('DOMContentLoaded', function () {
  var html = document.documentElement;
  updateDarkToggle(html.classList.contains('dark'));
  updateAccessibleToggle(html.classList.contains('accessible'));

  document.querySelectorAll('[id^="dark-toggle"]').forEach(function (btn) {
    btn.addEventListener('click', toggleDark);
  });
  document.querySelectorAll('[id^="accessible-toggle"]').forEach(function (btn) {
    btn.addEventListener('click', toggleAccessible);
  });
});
