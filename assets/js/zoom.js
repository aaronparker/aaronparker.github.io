// Image zoom — full-viewport blurred backdrop, image capped at 85vw / 85vh
document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var main = document.getElementById('post-main');
  if (!main) return;

  main.querySelectorAll('.post-content img:not(.no-zoom)').forEach(function (img) {
    // If the image is wrapped in an <a>, intercept clicks on the link too
    var trigger = img.closest('a') || img;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var overlay = document.createElement('div');
      overlay.className = 'img-zoom-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Zoomed image — press Escape to close');

      var enlarged = document.createElement('img');
      enlarged.src = img.currentSrc || img.src;
      enlarged.alt = img.alt;
      enlarged.className = 'img-zoom-enlarged';

      overlay.appendChild(enlarged);
      document.body.appendChild(overlay);

      // Animate in on next frame so the CSS transition fires
      requestAnimationFrame(function () {
        overlay.classList.add('img-zoom-overlay--visible');
      });

      function close() {
        overlay.classList.remove('img-zoom-overlay--visible');
        overlay.addEventListener('transitionend', function () {
          overlay.remove();
        }, { once: true });
      }

      overlay.addEventListener('click', close);

      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', onKey);
        }
      });
    });
  });
});
