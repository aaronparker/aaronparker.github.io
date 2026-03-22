// Code blocks — language header + copy-to-clipboard
document.addEventListener('DOMContentLoaded', function () {

  // Human-readable display names for common language identifiers
  var LANG_NAMES = {
    powershell: 'PowerShell', ps1: 'PowerShell',
    bash: 'Bash', sh: 'Shell', shell: 'Shell', zsh: 'Zsh',
    python: 'Python', py: 'Python',
    javascript: 'JavaScript', js: 'JavaScript',
    typescript: 'TypeScript', ts: 'TypeScript',
    json: 'JSON', yaml: 'YAML', yml: 'YAML',
    xml: 'XML', html: 'HTML', css: 'CSS', scss: 'SCSS',
    sql: 'SQL', ruby: 'Ruby', rb: 'Ruby',
    go: 'Go', rust: 'Rust',
    c: 'C', cpp: 'C++', csharp: 'C#', cs: 'C#',
    java: 'Java', kotlin: 'Kotlin', swift: 'Swift', php: 'PHP',
    dockerfile: 'Dockerfile', docker: 'Docker',
    terraform: 'Terraform', hcl: 'HCL',
    toml: 'TOML', ini: 'INI', conf: 'Config',
    markdown: 'Markdown', md: 'Markdown',
  };

  // Select only the outer .highlight wrapper, not the inner <pre class="highlight">
  document.querySelectorAll('.highlighter-rouge > .highlight').forEach(function (block) {
    // Opt out of Tailwind Typography plugin styles — they add unwanted borders/radius
    var pre = block.querySelector('pre');
    if (pre) pre.classList.add('not-prose');

    // Language class is always on the parent .highlighter-rouge div
    var classes = Array.from(block.parentElement.classList);
    var langClass = classes.find(function (c) { return c.startsWith('language-'); });
    var langKey = langClass ? langClass.replace('language-', '').toLowerCase() : null;
    var showLang = langKey && langKey !== 'plaintext' && langKey !== 'text';
    var langDisplay = showLang ? (LANG_NAMES[langKey] || langKey) : null;

    // Copy button SVG helper
    var COPY_ICON =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<rect x="9" y="9" width="13" height="13" rx="2"/>' +
        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
      '</svg>';
    var CHECK_ICON =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<polyline points="20 6 9 17 4 12"/>' +
      '</svg>';

    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = COPY_ICON;

    btn.addEventListener('click', function () {
      var code = block.querySelector('code') || block.querySelector('pre');
      var text = code ? code.innerText : block.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = CHECK_ICON;
        btn.classList.add('code-copy-btn--copied');
        btn.setAttribute('aria-label', 'Copied!');
        setTimeout(function () {
          btn.innerHTML = COPY_ICON;
          btn.classList.remove('code-copy-btn--copied');
          btn.setAttribute('aria-label', 'Copy code');
        }, 2000);
      });
    });

    if (showLang) {
      // Language detected — header bar with label only; copy button floats in the listing
      var header = document.createElement('div');
      header.className = 'code-header';

      var label = document.createElement('span');
      label.className = 'code-lang-label';
      label.textContent = langDisplay;
      header.appendChild(label);

      var pre = block.querySelector('pre');
      if (pre) block.insertBefore(header, pre);
      else block.prepend(header);

      // Floating copy button sits in the code listing, below the header
      block.classList.add('has-header');
      btn.classList.add('code-copy-btn--floating');
      block.appendChild(btn);
    } else {
      // No language — floating copy button only (no header bar)
      btn.classList.add('code-copy-btn--floating');
      block.appendChild(btn);
    }
  });
});
