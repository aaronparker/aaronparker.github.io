---
layout: page
title: Changelog
description: A record of changes to the stealthpuppy.com theme and site design.
no_toc: false
permalink: /changelog/
---

This changelog covers changes to the site theme and design. It does not track changes to individual blog posts or article content.

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
| `zoom.js` | [medium-zoom](https://github.com/francoischalifour/medium-zoom) image lightbox |
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
