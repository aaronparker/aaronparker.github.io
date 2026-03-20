// Dark mode — apply before paint to prevent flash (also called inline in base.html)
(function () {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[id^="dark-toggle"]').forEach(function (btn) {
    btn.addEventListener('click', toggleDark);
  });
});
