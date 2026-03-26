---
layout: page
title: Changelog
description: A record of changes to the stealthpuppy.com theme and site design.
no_toc: false
permalink: /changelog/
---

This changelog covers changes to the site theme and design. It does not track changes to individual blog posts or article content. **Note**: the site theme is not licensed for copying or modification.

## 2026-03-26

### Post metadata

- **Updated date** — a "Updated" date now appears in the post header metadata strip, sourced from `page.last_modified_at` (via `jekyll-last-modified-at`), showing when the post file was last committed to git; it only renders when the updated date differs from the published date
- **Category icon** — the category icon in post metadata changed from a price-tag shape to a folder icon, better representing the concept of a category
- **Tag pills** — tag pills in the post header now include a small tag SVG icon before the tag name, and each pill links to its tag landing page

### Outdated / content warning

- A new front-matter flag `outdated: true` on a post renders a warning callout below the post header, alerting readers that the content may no longer be accurate
- The warning text is configurable via `outdated_notice` in front matter; a default message is shown if the field is omitted

### Series navigation

- Posts that belong to a series can set `series` and `series_part` in front matter; a series navigation block listing all parts (with the current part highlighted) is rendered between the post summary and the article body
- The duplicate series/part label that previously appeared in the post-meta strip has been removed — series information is now only shown in the dedicated series navigation block

### Post layout order

- The post summary (description callout) is now rendered above the series navigation block, so the description always appears immediately after the post header

### Projects page

- A page-level "Updated" date now appears in the Projects page header, showing when `projects.md` was last committed to git

### Share buttons

- Share buttons now use solid filled brand colours (LinkedIn `#0A66C2`, Bluesky `#1185FE`) instead of the previous ghost/outline style
- The "Copy link" button uses the current accent colour; it briefly turns green on successful copy
- Brand colours are consistent across light and dark modes

## 2026-03-23

### Accessible theme

A new high-contrast accessible theme designed for low vision and colour-blind users:

- **Yellow-on-black palette** — foreground `#fde047` on `#000` background; contrast ratio ~15:1 (exceeds WCAG AAA 7:1 requirement)
- **Dedicated toggle button** — eye icon button in the topbar and sidebar, separate from the light/dark toggle; button shows a filled/pressed state when active
- **Always-underlined links** — all links show underlines regardless of hover, removing colour as the sole link indicator
- **Yellow borders** — all card, callout, sidebar, and code block borders switched to yellow for visibility
- **Visible focus rings** — focus outlines use yellow and are always shown, not suppressed by `:focus-visible`
- **Desaturated hero images** — post hero images rendered in greyscale to reduce visual noise
- **Accent swatches hidden** — the colour accent picker is hidden in accessible mode (accent colour is fixed to yellow)
- **Accessible state persists across reloads** — stored in `localStorage` under key `accessible`, independent of the dark/light `theme` key
- **New icon** — `_includes/icons/eye.svg` (Lucide eye) added for the accessible toggle button

### Theme toggle

- Separated into two independent controls: a binary light/dark toggle (moon/sun icons) and a dedicated accessible theme button (eye icon)
- Previously the single toggle cycled through three states; it is now a simple light ↔ dark binary, with accessible mode enabled and disabled via its own button
- Exiting accessible mode via the dark toggle enters dark mode; exiting via the accessible button restores the previously saved light/dark preference

### Topbar icon consistency

- Fixed a CSS specificity issue where the `<span>` wrappers around moon/sun icons inherited a different colour than the unwrapped search icon in light mode; all three topbar icons now render at the same muted colour

### Accessibility

Improvements for screen readers, keyboard users, and users with visual preferences:

- **Focus management** — focus traps and focus restoration added to search modal, keyboard shortcuts modal, and mobile sidebar; image zoom overlay now uses `role="dialog"` with focus trapped inside and restored on close
- **ARIA fixes** — search results corrected from `role="listbox"`/`role="option"` to `role="list"` (appropriate for link-based results); removed incorrect `role="tooltip"` from hero image credit span
- **ARIA additions** — `aria-label` added to search input (placeholder alone is insufficient for screen readers); `aria-pressed` added to dark mode toggle, grid/list view toggle, and accent swatch buttons; `aria-expanded` added to mobile sidebar toggle; `aria-label` added to TOC aside (`role="navigation"`); descriptive `aria-label` added to blog pagination links
- **Decorative SVGs** — `aria-hidden="true"` added to decorative icons in post metadata (calendar, clock, tag) so screen readers skip them
- **Back-to-top button** — removed from tab order when visually hidden (`aria-hidden` + `tabindex` toggled in JS)
- **Non-colour active state** — TOC active heading link bumped to `font-semibold` so the active state is distinguishable without relying on colour alone
- **High-contrast mode** — added `@media (prefers-contrast: more)` block with stronger borders and text for OS high-contrast mode

### Code blocks

- Language label in the header bar is now white in light mode (previously inherited body text colour)
- Moved the copy-to-clipboard button from the header bar into the code listing itself, floating in the top-right corner below the header
- Reduced header bar height with tighter padding
- Fixed corner radii: header top corners are rounded, the join between header and code listing is flush (no gap or double radius), code listing bottom corners are rounded

### Post summary

- Changed from right-side-only rounded corners to fully rounded on all four corners, matching the callout style

### Callouts

- Note, tip, warning, and danger callouts changed from right-side-only rounded corners to fully rounded on all four corners

### Author bio

- Removed social links (GitHub, LinkedIn, Bluesky) from the author bio card at the bottom of posts — social links remain in the sidebar

### Images in posts

- Removed the link hover highlight colour on images wrapped in anchor tags
- Added a magnifying glass icon overlay that appears on hover to indicate the image can be zoomed/enlarged

### Sidebar navigation

- Split the single combined navigation list into two labelled sections: **Navigate** (internal site pages) and **Connect** (external social links)

### Sidebar responsive layout

- Restructured the sidebar into three explicit zones:
  - **Header** (avatar, name, tagline, main nav) — fixed, shrinks at short viewport heights
  - **Navigation** (Navigate + Connect sections) — scrollable when content overflows
  - **Footer** (accent swatches) — fixed, always visible at full size regardless of viewport height
- Accent colour swatches no longer resize at short viewport heights (≤780px) — they remain 20px and centred at the bottom of the sidebar
- Sidebar tagline continues to hide at very short viewports (≤719px)
- Swatches centred horizontally in the footer

## 2026-03-22

### Accent colour swatches

- Removed the indigo swatch and replaced it with a blue swatch as the first option
- Updated all swatch colours to more vivid, saturated values matching standard Tailwind 500-level palette
- Added a gray swatch as the eighth option
- Updated `accent-theme.js` to reflect the new swatch set — blue is now the default fallback theme when no preference is stored

### Topbar glass effect

- Upgraded the top navigation bar from a near-opaque frosted background to a proper glassmorphism effect:
  - Background opacity reduced from 90% to 60% (dark) / 65% (light) so page content bleeds through the blur
  - Blur increased from `backdrop-blur` (~8px) to `backdrop-blur-lg` (16px)
  - Added `backdrop-saturate-150` to boost the colour richness of blurred content behind the bar
  - Softened border opacity to 50–60%
  - Added a hairline inset top-edge highlight (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.06)`) characteristic of glass surfaces

### UI effects and micro-interactions

Added four new interaction effects, all disabled for users with `prefers-reduced-motion: reduce`:

- **Post cards** — cards lift 3px (`translateY(-3px)`) and gain a shadow on hover; hero image zoom increased from 1.02 to 1.05
- **Search modal** — the ⌘K modal now animates open (scale + fade in, 180ms) and closed (scale + fade out, 150ms) instead of appearing instantly
- **TOC active indicator** — the active heading link in the table of contents shows a 2px accent-coloured left border that transitions in, with a subtle `padding-left` nudge to the link text
- **Icon micro-interactions** — the dark mode toggle SVG rotates 15° on hover; sidebar social link icons lift 2px on hover

## 2026-03-21

### Colour highlights

Added targeted colour highlights across the theme to improve visual clarity without introducing a second accent colour.

- **Social icon brand colours** — sidebar and author bio social icons (GitHub, LinkedIn, Bluesky, Ko-fi, Spotify, RSS) now show their platform brand colour on hover
- **Share button brand colours** — LinkedIn and Bluesky share buttons show platform brand colours on hover
- **Post metadata icons** — calendar, clock, and tag icons in the post header now use the accent colour
- **Tag pill background tint** — tag pills gain a subtle accent-tinted background using `color-mix()`
- **View toggle active state** — the active grid/list view button on the blog page now uses the accent colour instead of flat dark grey
- **Callout type differentiation** — three new callout variants alongside the existing `.note` class:
  - `.warning` — amber border and background
  - `.tip` — green border and background
  - `.danger` — red border and background

### Hero image photo attribution

- Added an attribution icon overlay on hero images linking to the original photographer
- Removed the separate attribution page in favour of per-post attribution data in front matter

### Image zoom

- Replaced [medium-zoom](https://github.com/francoischalifour/medium-zoom) with a lightweight custom implementation — removes the vendor script dependency
- Zoomed image is capped at 95 vw × 95 vh and centred in the viewport
- Backdrop uses `backdrop-blur-sm` and `bg-black/60` — matching the search modal blur effect
- Fixed navigation hijack caused by images wrapped in `<a>` links (common in Markdown): click is intercepted and `preventDefault()` called so the browser no longer navigates to the raw image URL

### Mermaid diagrams

- Fixed arrow and edge colours in dark mode — `lineColor` overridden to `slate-400` (`#94a3b8`) so connecting lines are visible against the dark background

### Table of contents

- Active heading link now renders in the current accent colour in light mode — previously the light-mode override rule had higher specificity and suppressed the accent colour

### Sharing

- Fixed LinkedIn share button — updated from the deprecated `/shareArticle` endpoint to `/sharing/share-offsite/`, which correctly pre-populates the LinkedIn post composer with the page URL and Open Graph metadata

### Footer

- Removed the separate attribution page link from the footer
- Added a link to the site changelog

## 2026-03-20

### Keyboard shortcuts

- Added a keyboard shortcuts modal (press `?` to open) listing all available keyboard shortcuts
- Shortcuts include: `⌘K` / `Ctrl+K` for search, `D` for dark mode toggle, `G` for grid/list view, `T` for back to top

### Mermaid diagram support

- Added client-side rendering of [Mermaid](https://mermaid.js.org/) diagrams in posts
- Diagrams are defined in fenced code blocks with the `mermaid` language identifier
- Theme-aware: diagram colours adapt to light and dark mode

### UI refinements

- Compact sidebar layout for short viewport heights (≤780px) such as 720p screens
- Sidebar tagline hidden on very short viewports (≤719px)
- Minor link hover and spacing improvements throughout

## 2026-03-19

### New theme — complete rewrite

Replaced the [Hydejack 9.x](https://hydejack.com/) theme with a fully custom Jekyll layout built on [Tailwind CSS v4](https://tailwindcss.com/) and `@tailwindcss/typography`.

#### Layout and structure

- **Sidebar layout** — fixed sidebar with avatar, navigation links, social links, search, dark mode toggle, and accent colour swatches
- **New layouts** — `base`, `default`, `post`, `blog`, `list`, `page`, `about`, `plain`
- **Post layout** — hero image, metadata bar (date, reading time, category), description summary callout, article body, table of contents sidebar, related posts, and [Utterances](https://utteranc.es/) comments
- **Blog layout** — paginated post grid with grid/list view toggle, persisted to `localStorage`
- **Post cards** — image thumbnail, excerpt, category badge, and estimated reading time

#### Styling

- **Palette** — slate/indigo base with `slate-900` background and `indigo-400` accent
- **Dark mode** — class-based (`.dark` on `<html>`) with `localStorage` persistence; `slate-950` sidebar contrasts against `slate-900` content area
- **Light mode** — white content area, `gray-50` sidebar
- **Accent colour themes** — 8 swappable accent colours (indigo, blue, purple, pink, red, orange, amber, green)
- **Syntax highlighting** — full light and dark token colour overrides for Rouge (Monokai-inspired dark, high-contrast light)
- **Inline code** — accent-coloured pill style with monospace font
- **Article links** — block highlight on hover (accent background, white text)
- **Image spacing** — ~8px above and below inline images via negative margin technique

#### JavaScript

| Script | Purpose |
|---|---|
| `dark-mode.js` | Class-based dark mode toggle with `localStorage` persistence |
| `search.js` | `⌘K` / `Ctrl+K` modal with live fuzzy search via Lunr.js |
| `toc.js` | Dynamic table of contents from article headings with IntersectionObserver active-link tracking |
| `zoom.js` | Custom image zoom lightbox (originally medium-zoom; replaced 2026-03-21) |
| `code-blocks.js` | Language badge injection and one-click copy button on code blocks |
| `sidebar.js` | Mobile sidebar open/close with overlay |

#### Build pipeline

- `npm run build` — full build (fonts + icons + CSS)
- `npm run build:css` — Tailwind CSS compilation only
- `npm run build:icons` — copies SVG icons from npm packages (`simple-icons`, `lucide`)
- Self-hosted [Geist](https://vercel.com/font) variable fonts (sans and mono)

#### Removed

- Hydejack 9.x theme files (SASS partials, legacy JS bundles)
- IcoMoon icon font
- PWA web manifest and app icons
- Category filter bar from blog page (simplified to post grid)
