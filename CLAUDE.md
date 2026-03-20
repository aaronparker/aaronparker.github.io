# Claude Memory — stealthpuppy.com Jekyll Theme

## Project Overview
Custom Jekyll 4.4.1 theme for stealthpuppy.com, built with Tailwind CSS v4 and `@tailwindcss/typography`.

## Build Pipeline
```
npm run build           # fonts + icons + css (full build)
npm run build:css       # Tailwind only — run after ANY HTML or CSS change
npm run build:icons     # Regenerates SVG icons from npm packages (OVERWRITES manual edits)
bundle exec jekyll serve  # Dev server with auto-rebuild on file changes
```

**Important:** After changing any HTML template, always run `npm run build:css` so Tailwind JIT picks up new utility classes.

## Architecture

### Tailwind CSS v4
- Config: `assets/css/main.css` → compiled to `assets/css/style.css`
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` — class-based via `.dark` on `<html>`
- `@layer components` for component styles; unlayered CSS at the bottom of `main.css` for rules that must beat Tailwind utilities (e.g. image spacing, heading sizes)
- Typography plugin: `@plugin "@tailwindcss/typography"` with `prose` applied to `.post-content`

### Colour Palette (dark / light)
| Role | Dark | Light |
|------|------|-------|
| Page background | `slate-900` | `white` |
| Sidebar background | `slate-950` | `gray-50` |
| Body text | `slate-300` | `gray-900` |
| Headings | `slate-50` | `gray-900` |
| Accent | `indigo-400` (#818cf8) | `indigo-600` (hover) |
| Borders | `slate-700` | `gray-200` |
| Muted text | `slate-400` | `gray-500` |

### Icon SVGs
- Icons live in `_includes/icons/`
- **`npm run build:icons` OVERWRITES icon files** — it runs `scripts/copy-icons.js` which copies fresh SVGs from npm packages
- Simple Icons (GitHub, Bluesky, Ko-fi, Spotify): `scripts/copy-icons.js` injects `fill="currentColor"` on write, so it survives rebuilds
- RSS uses `stroke="currentColor"` / `fill="none"` (Lucide icon, correct)
- LinkedIn: inline SVG fallback with `fill="currentColor"` (removed from simple-icons)

### Layouts
- `_layouts/base.html` — root HTML shell; body: `bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-300`
- `_layouts/default.html` — sidebar + main content wrapper
- `_layouts/post.html` — article with hero image, TOC sidebar, related posts, comments
- `_layouts/blog.html` — paginated post grid with grid/list view toggle
- `_layouts/list.html` — category listing page

### Key Includes
- `_includes/sidebar.html` — fixed sidebar with avatar, nav, social icons (3×2 grid), search + dark-mode toggle
- `_includes/post-card.html` — card used in grid and list views
- `_includes/search-modal.html` — ⌘K modal

## Resolved Issues & Patterns

### Unlayered CSS Override Pattern
When a Tailwind utility (in `@layer utilities`) beats a component rule, add the override **outside any `@layer` block** at the bottom of `main.css`. This unlayered CSS wins the cascade unconditionally.

```css
/* Example — at bottom of main.css, outside any @layer */
.post-content h2 { font-size: 1.75rem; font-weight: 700; }
#posts-container.posts-list { grid-template-columns: 1fr; }
```

### Browser Cache After CSS Rebuild
After `npm run build:css`, the Jekyll dev server serves the new file but the browser may cache the old one. Cache-bust in the console:
```js
document.querySelector('link[rel="stylesheet"]').href = '/assets/css/style.css?v=' + Date.now();
```

### Image Spacing in Posts
Image-only `<p>` paragraphs get special treatment to achieve ~8px spacing above/below instead of prose's default 28px+:
- `margin-top: -20px; padding-top: 0.5rem` on `p:has(> img)` / `p:has(> a > img)` — negative margin cancels preceding paragraph's 20px margin-bottom via collapsing; padding provides the 8px gap
- `line-height: 0` on the `<p>` and wrapping `<a>` eliminates phantom inline gap
- Wrapping `<a>` set to `display: block`

### Related Posts Path Matching
`post.path` in Jekyll includes a prefix (e.g. `_posts/2025-07-29-post.md`). Front matter stores bare filenames (`2025-07-29-post.md`). Use `where_exp` with `contains` rather than `where` with exact match:
```liquid
{% assign related = site.posts | where_exp: "post", "post.path contains related_path" | first %}
```

### Liquid Ternary Operators
Liquid does **not** support `{{ condition ? a : b }}`. Use `{% if %}...{% else %}...{% endif %}` instead.

### Grid/List View Toggle
- Blog homepage (`_layouts/blog.html`) has `#posts-container` with toggle buttons `#view-grid-btn` / `#view-list-btn`
- JavaScript at bottom of `blog.html` adds/removes `.posts-list` class and persists to `localStorage` under key `blog-view`
- List layout CSS is unlayered (to beat `sm:grid-cols-2`): `#posts-container.posts-list { grid-template-columns: 1fr; }`

### Dark-Toggle & Social Link Hover
Both `.dark-toggle` and `.sidebar__social-link` use the same hover pattern: `p-2 rounded-md` background highlight + colour change. Light mode overrides in `html:not(.dark)` block.

### TOC (Table of Contents)
`toc.js` moves kramdown's `#markdown-toc` into `#toc-container` on `DOMContentLoaded`, then uses IntersectionObserver (`rootMargin: '0px 0px -60% 0px'`) to highlight the topmost visible heading. The aside uses `hidden xl:block` — `xl:block` overrides `hidden` at xl+ viewports (correct). Verified working after layout refactors.

