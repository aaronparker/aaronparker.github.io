// TOC — move kramdown-generated list into sticky sidebar column, highlight active section
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('toc-container');
  if (!container) return;

  // Kramdown renders {: toc} as an <ul> with id="markdown-toc" inside .post-content
  const tocList = document.getElementById('markdown-toc');
  if (!tocList) {
    container.closest('aside') && container.closest('aside').classList.add('hidden');
    return;
  }

  // Move the TOC into the sidebar container
  container.appendChild(tocList);
  // Remove the empty <p> or sibling that kramdown sometimes leaves
  const prev = tocList.previousElementSibling;
  if (prev && prev.tagName === 'P' && prev.textContent.trim() === '') {
    prev.remove();
  }

  // Collect all heading anchors from TOC links
  const tocLinks = Array.from(tocList.querySelectorAll('a[href^="#"]'));
  const headingIds = tocLinks.map(a => a.getAttribute('href').slice(1));
  const headings = headingIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!headings.length) return;

  function setActive(id) {
    tocLinks.forEach(function (a) {
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
