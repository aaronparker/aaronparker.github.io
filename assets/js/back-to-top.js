// Back-to-top button — shows after scrolling 400px, smooth-scrolls to top on click
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
