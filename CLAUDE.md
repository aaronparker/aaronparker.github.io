# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Custom Jekyll 4.4.1 theme for stealthpuppy.com, built with Tailwind CSS v4 and `@tailwindcss/typography`.

## Build Pipeline
```
npm run build           # fonts + icons + css (full build)
npm run build:css       # Tailwind only — run after ANY HTML or CSS change
npm run build:icons     # Regenerates SVG icons from npm packages (OVERWRITES manual edits)
npm run build:fonts     # Copies Geist fonts + vendor JS (lunr, medium-zoom) from npm
npm run watch           # Tailwind watch mode — auto-recompiles CSS on change
bundle exec jekyll serve  # Dev server with auto-rebuild on file changes
bundle exec jekyll build  # Production build to _site/
```

**Important:** After changing any HTML template, always run `npm run build:css` so Tailwind JIT picks up new utility classes.

## Architecture

### Tailwind CSS v4
- Config: `assets/css/main.css` → compiled to `assets/css/style.css`
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` — class-based via `.dark` on `<html>`
- Accessible mode: `@custom-variant accessible` — `.accessible` class on `<html>` overlays yellow (`#fde047`) accent and high-contrast backgrounds; toggled by accessible-theme button in the topbar
- `@layer components` for component styles; unlayered CSS at the bottom of `main.css` for rules that must beat Tailwind utilities (e.g. image spacing, heading sizes)
- Typography plugin: `@plugin "@tailwindcss/typography"` with `prose` applied to `.post-content`
- Fonts: Geist Variable and Geist Mono Variable, self-hosted in `assets/fonts/` (copied from npm by `npm run build:fonts`)
- `--sidebar-width: 280px` CSS token used by layout offset

### Accent Colour Theme System
8 predefined accent themes + rainbow (animated `hue-rotate` via CSS `@property`):
- Themes: blue, purple, pink, red, orange, amber, green, gray, rainbow
- Applied as `.theme-{name}` class on `<html>`; swatches in sidebar footer
- Three CSS tokens control all accent colouring: `--color-accent`, `--color-accent-dark`, `--color-accent-deepest`
- Stored in `localStorage` under key `accent-theme`; `accent-theme.js` reads and applies on page load

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
- `_layouts/base.html` — root HTML shell; body: `bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-300`; loads all core JS, modals, and conditional features (TOC, Mermaid, zoom)
- `_layouts/default.html` — sidebar + mobile topbar + main content wrapper; includes back-to-top button and search modal
- `_layouts/home.html` — homepage: hero section with site title/tagline, recent posts grid (up to 9), browse-by-category section
- `_layouts/post.html` — full article with hero image (title overlay when present), TOC sidebar, outdated warning, series navigation, share buttons, author bio, related posts, comments
- `_layouts/page.html` — simple page: title, description, `post-content` div, optional comments
- `_layouts/about.html` — about/resume page (max-width 4xl); uses `_data/resume.yml`, `publications.yml`, `presentations.yml`, `awards.yml`
- `_layouts/blog.html` — paginated post grid with grid/list view toggle and pagination controls
- `_layouts/list.html` — category listing page; filters posts by category slug
- `_layouts/tag-list.html` — tag listing page; filters posts by tag slug (mirrors `list.html`)
- `_layouts/not-found.html` — 404 page with accent colour bar and link to home
- `_layouts/redirect.html` — standalone redirect (no `base.html`); meta refresh + JS redirect with canonical link

### Key Includes
- `_includes/head.html` — `<head>` content: theme init script (prevents flash), meta tags, `{% seo %}`, favicon, Tailwind CSS, Geist fonts, RSS link, DNS prefetch
- `_includes/sidebar.html` — fixed sidebar: avatar, nav (from `site.menu`), More section (Archive, RSS), social icons, 8+1 accent colour swatches
- `_includes/footer.html` — copyright, CC BY-SA 4.0 link, Changelog link
- `_includes/post-card.html` — card used in grid and list views; 16:9 hero thumbnail with srcset, category pill, title, excerpt, date + reading time
- `_includes/search-modal.html` — ⌘K modal (Lunr.js, index at `assets/js/search-index.json`)
- `_includes/keyboard-shortcuts-modal.html` — help panel: shortcut table, stored-prefs display, reset button
- `_includes/utterances-comment.html` — Utterances GitHub-issue comments (configured in `_config.yml` under `utterance:`)
- `_includes/mermaid.html` — Mermaid diagram support (included per-post); converts `language-mermaid` code blocks, respects dark/light mode
- `_includes/my-head.html` — Gumroad lazy-loader via IntersectionObserver for product embeds
- `_includes/my-body.html` — Cloudflare email protection decoder (decodes obfuscated `__cf_email__` links/spans)
- `_includes/my-scripts.html` — empty hook file reserved for custom scripts

### JavaScript Modules (`assets/js/`)
Each file is standalone (no bundler):
- `dark-mode.js` — detects system preference vs. `localStorage.theme`; sets `.dark` on `<html>`; prevents white flash via early inline script
- `accent-theme.js` — reads `localStorage['accent-theme']`, applies `.theme-{name}` class to `<html>`; exposes `setAccentTheme()` for sidebar swatches
- `sidebar.js` — mobile sidebar toggle; focus trapping within open overlay; closes on Escape or backdrop click
- `search.js` — Lunr.js client-side search powering the ⌘K modal; live results on keypress; Tab trapping; ESC to close
- `toc.js` — moves kramdown's `#markdown-toc` into `#toc-container`; IntersectionObserver scroll-spy (`rootMargin: '0px 0px -60% 0px'`) for active highlight; smooth scroll on TOC link click
- `code-blocks.js` — language label above `<pre>` tags; copy-to-clipboard button with "Copied!" feedback; maps language slugs to readable names
- `keyboard-shortcuts.js` — global hotkeys: `/` opens search, `?` opens help modal, `d` toggles dark mode, arrow keys paginate, Esc closes modals
- `back-to-top.js` — shows scroll-to-top button after 400px scroll; smooth behaviour on click
- `zoom.js` — medium-zoom image lightbox; capped 85vw/85vh; respects `prefers-reduced-motion`

**Vendor libraries** (copied to `assets/js/` by `npm run build:fonts`):
- `lunr.min.js` — full-text search engine (v2.3.9)
- `medium-zoom.min.js` — image zoom library (v1.1.0)

### Collections & Permalinks
- `featured_categories` → `/:name/` — category landing pages in `_featured_categories/`
- `featured_tags` → `/tag-:name/` — tag pages in `_featured_tags/`
- Posts permalink: `/:categories/:year-:month-:day-:title/`
- Pagination: 10 posts per page at `/:num/`

### Data Files (`_data/`)
- `authors.yml` — author profiles (name, picture with srcset, social links)
- `resume.yml`, `publications.yml`, `presentations.yml`, `awards.yml` — used on the About/resume page
- `projects.yml` — project listing data

### Post Front Matter
```yaml
layout: post
description: >
  A short ~160 character description for SEO/social previews.
permalink: "/url/"
categories:
  - Evergreen
image:
  path: /assets/img/folder/image.jpg
  srcset:
    1920w: /assets/img/folder/image.jpg
    960w:  /assets/img/folder/image@0,5x.jpg
    480w:  /assets/img/folder/image@0,25x.jpg
  attribution:
    photographer:     "First Last"
    photographer_url: "https://unsplash.com/@name"
    source:           "Unsplash"
    source_url:       "https://unsplash.com/photos/photourl"
comments: true      # default true for posts; set false to disable Utterances
outdated: true      # optional; force-shows "potentially outdated" warning regardless of age
series: "series-slug"   # optional; enables series navigation panel
series_part: 1          # part number within the series (used for ordering)
```

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

### Post Hero Title Overlay
The post hero (`_layouts/post.html`) uses dual-path rendering:
- **With hero** (`page.image.path` set): title, metadata, and tags are rendered as an overlay on the image using a `linear-gradient(transparent → dark)` gradient background. Hero height is `clamp(360px, 48vw, 580px)`.
- **Without hero**: traditional full header is shown below the topbar.

Attribution pin (`.post-hero-credit`) sits top-right on the hero with a hover tooltip. Performance attributes on the hero `<img>`: `fetchpriority="high" loading="eager" decoding="auto"`.

### Outdated Content Warning
Auto-shows in the post body if the publish date is >2 years ago OR if `outdated: true` is in front matter. Rendered before the article body inside `.post-content`.

### Series Navigation
If `page.series` is defined, `post.html` filters `site.posts` by matching `series` value and sorts by `series_part`. The current post is bold and non-linked; all others are linked. Rendered before the article body.

### Social Share Buttons
LinkedIn, Bluesky, and copy-link buttons are rendered after the post body. The copy-link button shows a "Copied!" state with visual feedback using JS.

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

### Responsive Breakpoints
| Breakpoint | Post cards | TOC | Sidebar |
|------------|-----------|-----|---------|
| Mobile (<640px) | 1 column | hidden | overlay |
| Tablet (640–1023px) | 2 columns | hidden | fixed |
| Desktop (1024–1279px) | 3 columns | hidden | fixed |
| Large (1280px+) | 3 columns | sticky right column | fixed |
