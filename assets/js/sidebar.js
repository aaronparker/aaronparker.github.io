// Mobile sidebar — hamburger open/close
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');

  function openSidebar() {
    sidebar && sidebar.classList.add('sidebar--open');
    overlay && overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeSidebar() {
    sidebar && sidebar.classList.remove('sidebar--open');
    overlay && overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  toggle && toggle.addEventListener('click', openSidebar);
  overlay && overlay.addEventListener('click', closeSidebar);

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });
});
