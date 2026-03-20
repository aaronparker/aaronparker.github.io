// Code blocks — copy-to-clipboard button + language badge
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.highlight').forEach(function (block) {
    // Language badge from Rouge's wrapping <div class="language-xxx highlight">
    const classes = Array.from(block.classList);
    const langClass = classes.find(c => c.startsWith('language-'));
    const lang = langClass ? langClass.replace('language-', '') : null;

    if (lang && lang !== 'plaintext' && lang !== 'text') {
      const badge = document.createElement('span');
      badge.className = 'code-lang-badge';
      badge.textContent = lang;
      block.appendChild(badge);
    }

    // Copy button
    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML =
      '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<rect x="9" y="9" width="13" height="13" rx="2"/>' +
        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
      '</svg>';

    btn.addEventListener('click', function () {
      const code = block.querySelector('code') || block.querySelector('pre');
      const text = code ? code.innerText : block.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML =
          '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<polyline points="20 6 9 17 4 12"/>' +
          '</svg>';
        btn.classList.add('code-copy-btn--copied');
        setTimeout(function () {
          btn.innerHTML =
            '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<rect x="9" y="9" width="13" height="13" rx="2"/>' +
              '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
            '</svg>';
          btn.classList.remove('code-copy-btn--copied');
        }, 2000);
      });
    });

    block.appendChild(btn);
  });
});
