// Image zoom — medium-zoom with blur backdrop
// Requires medium-zoom UMD loaded before this script (assets/js/vendor/medium-zoom.min.js)
document.addEventListener('DOMContentLoaded', function () {
  if (typeof mediumZoom === 'undefined') return;

  mediumZoom('.post-content img:not(.no-zoom)', {
    margin: 24,
    background: 'rgba(0,0,0,0.85)',
  });
});
