// TOC — move kramdown-generated list into sticky sidebar column, highlight active section
document.addEventListener('DOMContentLoaded', function () {
  const desktopContainer = document.getElementById('toc-container');
  const tabletContainer = document.getElementById('toc-container-tablet');
  const tabletToggle = document.getElementById('toc-tablet-toggle');
  if (!desktopContainer && !tabletContainer) return;

  // Kramdown renders {: toc} as an <ul> with id="markdown-toc" inside .post-content
  const tocList = document.getElementById('markdown-toc');
  if (!tocList) {
    document.querySelectorAll('[data-toc-shell]').forEach(function (shell) {
      shell.classList.add('hidden');
    });
    return;
  }

  if (desktopContainer) {
    // Move the TOC into the desktop sidebar container
    desktopContainer.appendChild(tocList);
    // Remove the empty <p> or sibling that kramdown sometimes leaves
    const prev = tocList.previousElementSibling;
    if (prev && prev.tagName === 'P' && prev.textContent.trim() === '') {
      prev.remove();
    }
  }

  let tabletList = null;
  if (tabletContainer) {
    tabletList = tocList.cloneNode(true);
    tabletContainer.appendChild(tabletList);

    if (tabletToggle) {
      tabletToggle.addEventListener('click', function () {
        const isExpanded = tabletToggle.getAttribute('aria-expanded') === 'true';
        tabletToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        tabletContainer.classList.toggle('hidden', isExpanded);
      });
    }
  }

  // Collect all heading anchors from TOC links
  const tocLinks = Array.from(tocList.querySelectorAll('a[href^="#"]'));
  const tabletLinks = tabletList ? Array.from(tabletList.querySelectorAll('a[href^="#"]')) : [];
  const allTocLinks = tocLinks.concat(tabletLinks);
  const headingIds = tocLinks.map(a => a.getAttribute('href').slice(1));
  const headings = headingIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!headings.length) return;

  function setActive(id) {
    allTocLinks.forEach(function (a) {
      const active = a.getAttribute('href') === '#' + id;
      a.classList.toggle('toc-active', active);
    });
  }

  // IntersectionObserver — highlight the topmost visible heading
  let visibleHeadings = new Set();

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      });

      // Pick the first heading (in DOM order) that is visible
      for (const heading of headings) {
        if (visibleHeadings.has(heading.id)) {
          setActive(heading.id);
          return;
        }
      }
    },
    { rootMargin: '0px 0px -60% 0px', threshold: 0 }
  );

  headings.forEach(h => observer.observe(h));
});
