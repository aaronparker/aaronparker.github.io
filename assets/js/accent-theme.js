// Accent colour theme — apply before paint to prevent flash
(function () {
  var t = localStorage.getItem('accent-theme');
  if (t) document.documentElement.classList.add('theme-' + t);
})();

var ACCENT_THEMES = ['blue', 'purple', 'pink', 'red', 'orange', 'amber', 'green', 'rainbow'];

function setAccentTheme(name) {
  ACCENT_THEMES.forEach(function (t) {
    document.documentElement.classList.remove('theme-' + t);
  });
  document.documentElement.classList.add('theme-' + name);
  localStorage.setItem('accent-theme', name);
  document.querySelectorAll('[data-accent]').forEach(function (btn) {
    var active = btn.dataset.accent === name;
    btn.setAttribute('aria-pressed', active);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var current = localStorage.getItem('accent-theme') || 'blue';
  document.querySelectorAll('[data-accent]').forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.dataset.accent === current);
    btn.addEventListener('click', function () {
      setAccentTheme(btn.dataset.accent);
    });
  });
});
