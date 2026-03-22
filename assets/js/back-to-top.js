// Back-to-top button — shows after scrolling 400px, smooth-scrolls to top on click
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  // Hidden by default — keep out of tab order until visible
  btn.setAttribute('aria-hidden', 'true');
  btn.setAttribute('tabindex', '-1');

  window.addEventListener('scroll', function () {
    var visible = window.scrollY > 400;
    btn.classList.toggle('back-to-top--visible', visible);
    btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
    btn.setAttribute('tabindex', visible ? '0' : '-1');
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
