# Design Improvements — Implementation Plan

Source: design critique of the Jekyll theme at stealthpuppy.com (May 2026).

This plan turns the seven priority recommendations into concrete, file-scoped changes you can implement in a future session. Items are ordered by impact-to-effort. Each task includes the file(s) to edit, exact diff hints, and a verification step.

After **any** HTML or CSS change, run:

```sh
npm run build:css
bundle exec jekyll serve
```

Then hard-refresh the browser (or run the cache-bust snippet in `CLAUDE.md`).

## 1. Fix the title-hierarchy inversion

**Problem.** The post page title is `text-2xl sm:text-3xl` (24–30px) but the unlayered override sets `.post-content h1` to `2.25rem` (36px). Any H1 inside a post body therefore renders **larger** than the post's actual title — a real visual-hierarchy bug.

**Files**
- `_layouts/post.html` (line ~71) — the post `<h1>` element.
- `assets/css/main.css` (~line 1796) — the unlayered `.post-content h1` rule.

**Changes**

In `_layouts/post.html`, change:

```html
<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-50 leading-tight mb-4"
    itemprop="name headline">{{ page.title }}</h1>
```

to:

```html
<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-50 leading-tight tracking-tight mb-4 text-balance"
    itemprop="name headline">{{ page.title }}</h1>
```

(`text-balance` ties into task 3; if you don't pull task 3 forward, drop that class.)

Also confirm `_layouts/about.html` (line 8) and `_layouts/blog.html` (line 9) page titles match the new scale — both currently use `text-3xl`, which is now consistent with mobile but should bump to `sm:text-4xl` for visual parity with post pages.

In `assets/css/main.css` (unlayered overrides block), keep `.post-content h1` at 36px or reduce slightly so the page-level title is always the largest text on the page. Consider:

```css
.post-content h1 { font-size: 1.875rem; font-weight: 700; } /* 30px — never overrides the page title */
```

(In practice most posts don't use H1 inside the body — they should start at H2 — so this rule mostly exists as a safety net.)

**Verify**
- Open a post that contains an H1 in the body. The page title at the top must be visibly larger than any H1 in the article.
- Run Lighthouse / a11y audit; heading-order check should still pass.

## 2. Audit accent contrast across all eight themes

**Problem.** Several theme accents fail or borderline-fail WCAG 2.1 AA when used as link text on white or as background for white text/icons.

Specific known issues:
- `theme-amber` light: `--color-accent-dark: #d97706` on white ≈ 4.4:1 — fails 4.5:1 for normal text.
- `.dark-toggle.view-btn--active` (white on `--color-accent`) is ~3.4:1 against indigo-400 — fails AA for icons treated as informational.
- `.skip-link` uses `--color-accent` background (varies per theme) with white text.
- `.back-to-top` button uses `--color-accent` in dark mode — same risk.
- `theme-rainbow` cycles through hues that transiently fall below 4.5:1.

**File**
- `assets/css/main.css` — theme tokens block (~lines 49–57) and component rules that rely on `--color-accent` for backgrounds-with-white-text.

**Changes**

Introduce a third token tier — `--color-accent-deepest` — for surfaces that pair with white text/icons. This always clears 4.5:1 on white *and* preserves enough contrast on dark.

```css
@theme {
  --color-accent: #818cf8;          /* indigo-400 — for text on dark surfaces */
  --color-accent-dark: #6366f1;     /* indigo-500 — for text on light surfaces */
  --color-accent-deepest: #4f46e5;  /* indigo-600 — for backgrounds under white text */
}

html.theme-blue   { --color-accent: #60a5fa; --color-accent-dark: #2563eb; --color-accent-deepest: #1d4ed8; }
html.theme-purple { --color-accent: #c084fc; --color-accent-dark: #9333ea; --color-accent-deepest: #7e22ce; }
html.theme-pink   { --color-accent: #f472b6; --color-accent-dark: #db2777; --color-accent-deepest: #be185d; }
html.theme-red    { --color-accent: #f87171; --color-accent-dark: #dc2626; --color-accent-deepest: #b91c1c; }
html.theme-orange { --color-accent: #fb923c; --color-accent-dark: #ea580c; --color-accent-deepest: #c2410c; }
html.theme-amber  { --color-accent: #fbbf24; --color-accent-dark: #b45309; --color-accent-deepest: #92400e; } /* bumped */
html.theme-green  { --color-accent: #4ade80; --color-accent-dark: #16a34a; --color-accent-deepest: #15803d; }
html.theme-gray   { --color-accent: #94a3b8; --color-accent-dark: #64748b; --color-accent-deepest: #475569; }
```

Then update these specific rules to use `--color-accent-deepest`:

| Rule | Current | New |
|---|---|---|
| `.dark-toggle.view-btn--active` background | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `.skip-link` background-color | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `.back-to-top` background-color | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `.project-card__link` background-color | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `.project-card__tags .category-pill` background | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `.cat-filter-btn.active` background | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `#copy-url-btn` background | `var(--color-accent)` | `var(--color-accent-deepest)` |
| `.code-header` (light mode) | `var(--color-accent-dark)` | `var(--color-accent-deepest)` |

For the rainbow theme, **don't** introduce contrast risk in the rotating accent — but use a fixed deepest for backgrounds:

```css
html.theme-rainbow {
  --accent-hue: 0;
  --color-accent: hsl(var(--accent-hue), 75%, 65%);
  --color-accent-dark: hsl(var(--accent-hue), 75%, 50%);
  --color-accent-deepest: hsl(var(--accent-hue), 75%, 35%);  /* darkened for white-text safety */
  animation: rainbow-hue 6s linear infinite;
}
```

**Verify**
- Use a contrast checker (axe DevTools, Stark, or Chrome DevTools' contrast picker).
- Cycle through every theme and confirm: links in body copy ≥ 4.5:1, white-on-button surfaces ≥ 4.5:1.
- Check both light and dark mode.


## 3. Tighten the reading column + better text wrapping

**Problem.** `max-w-3xl` ≈ 768px → 80–90 characters per line at default prose size. Optimal long-form reading is 60–75. Headlines and paragraph endings have orphans because no `text-wrap` is applied.

**Files**
- `_layouts/post.html` (line 56)
- `assets/css/main.css` — unlayered overrides block (~line 1796 onwards)

**Changes**

In `_layouts/post.html`, change:

```html
<div id="post-main" class="min-w-0 flex-1 max-w-3xl">
```

to:

```html
<div id="post-main" class="min-w-0 flex-1 max-w-[68ch]">
```

`max-w-prose` is ~65ch and would also work — `68ch` is a comfortable middle ground that doesn't feel claustrophobic.

In `assets/css/main.css` (unlayered overrides at the bottom), add:

```css
/* Headline wrapping — balance avoids lonely last lines */
.post-content h1,
.post-content h2,
.post-content h3,
.post-card__title,
.home-hero__title {
  text-wrap: balance;
}

/* Body paragraph wrapping — pretty avoids single-word last lines */
.post-content p,
.post-content li {
  text-wrap: pretty;
}
```

Browser support: `text-wrap: balance` is Chrome 114+, Safari 17.4+, Firefox 121+. `pretty` is narrower but degrades gracefully (browsers ignore unknown values).

**Verify**
- Open three or four representative posts. Lines should feel comfortably narrow; multi-line headlines should split closer to centre rather than leaving a single trailing word.
- Confirm the TOC sidebar at `xl+` viewports still aligns correctly (the flex layout should auto-adjust).

## 4. De-duplicate the sidebar navigation

**Problem.** `_includes/sidebar.html` renders `site.nav` at the top of the sidebar (Blog/Projects/About from `_config.yml`) **and** a "Navigate" section below with hardcoded Home/About/Projects/Archive links. Most of these are duplicates.

**File**
- `_includes/sidebar.html` (lines ~46–67)

**Decision needed.** Pick one of:

**Option A — Keep `site.nav`, slim the "Navigate" section to utility-only links.**

Replace the "Navigate" block (lines 46–67) with:

```liquid
<div>
  <p class="sidebar__section-label">More</p>
  <nav class="flex flex-col gap-1" aria-label="Site utilities">
    <a href="{{ '/archive/' | relative_url }}" class="sidebar__social-link">
      {% include icons/calendar.svg %}
      Archive
    </a>
    <a href="{{ '/tags/' | relative_url }}" class="sidebar__social-link">
      {% include icons/tag.svg %}
      Tags
    </a>
    <a href="{{ '/feed.xml' | relative_url }}" class="sidebar__social-link" data-social="rss">
      {% include icons/rss.svg %}
      RSS
    </a>
  </nav>
</div>
```

This keeps the section pattern but removes duplication. (Adjust to match your actual permalinks — `/tags/` is illustrative.)

**Option B — Remove the entire "Navigate" block.**

Delete lines 46–67. Rely on `site.nav` for primary navigation and the social-icons block (already present) for the rest.

**Recommended:** Option A. It preserves the section structure (which gives the sidebar good rhythm) while removing the duplication.

**Verify**
- Tab through the sidebar with the keyboard; each link should appear once.
- Screen-reader test (VoiceOver, NVDA): no link is announced twice in succession.

## 5. Make the home-hero dot pattern theme-aware

**Problem.** `assets/css/main.css` line ~1051 uses a hardcoded `rgb(99 102 241 / 0.15)` (indigo-500) for the home-hero radial dots. Switching the accent to amber/green/red leaves the homepage dots indigo — breaks the theming contract everywhere else does honour.

**File**
- `assets/css/main.css` — `.home-hero` rule (~line 1048) and the light-mode override (~line 1637).

**Changes**

Replace:

```css
.home-hero {
  @apply px-8 py-16 border-b border-slate-700
         relative overflow-hidden;
  background-image: radial-gradient(circle, rgb(99 102 241 / 0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

with:

```css
.home-hero {
  @apply px-8 py-16 border-b border-slate-700
         relative overflow-hidden;
  background-image: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-accent) 20%, transparent) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}
```

And in the light-mode block (~line 1637):

```css
html:not(.dark) .home-hero {
  background-image: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-accent-dark) 12%, transparent) 1px,
    transparent 1px
  );
  @apply border-gray-200;
}
```

**Verify**
- Cycle through every accent theme and confirm the homepage dot pattern shifts colour to match.
- Watch for the rainbow theme — the dots should subtly hue-shift along with the accent.

## 6. Lift the code-comment colour for AA contrast

**Problem.** `.highlight .c { color: #64748b }` (slate-500) on `#1e293b` (slate-800) ≈ 3.5:1 — fails AA for body text.

**File**
- `assets/css/main.css` (~line 760, dark-mode syntax tokens)

**Change**

```css
.highlight .c, .highlight .c1, .highlight .cm { color: #94a3b8; }   /* Comment — slate-400 (was slate-500) */
```

slate-400 (`#94a3b8`) on slate-800 (`#1e293b`) ≈ 5.4:1 — clears AA.

The light-mode comment colour (`#64748b` on `#f8fafc` ≈ 6:1, line ~782) is fine — leave it.

**Verify**
- Open any post containing a code block. Comments should still read as muted but clearly legible.
- Spot-check with a contrast checker on the actual rendered page.

## 7. Bump touch-target sizes for AA / WCAG 2.5.8

**Problem.** Several interactive elements fall below the 44×44 recommended touch target (and a couple are at risk of failing the 24×24 WCAG 2.2 SC 2.5.8 minimum once outline padding is excluded).

| Element | Current size | Issue |
|---|---|---|
| `.dark-toggle` | `p-2` around 16px svg → ~32px hit area | Below 44px target |
| `.accent-swatch` | `w-5 h-5` = 20px | Below 24px minimum without expanding the hit area |
| `.post-tag-pill` | `py-0.5` ≈ 26px tall | Below 44px |

**File**
- `assets/css/main.css`

**Changes**

```css
.dark-toggle {
  @apply p-2.5 rounded-md text-slate-400 hover:text-slate-50 hover:bg-slate-800
         transition-colors;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

For accent swatches, increase the hit target without changing the visual size:

```css
.accent-swatch {
  @apply w-5 h-5 rounded-full flex-shrink-0 cursor-pointer transition-transform hover:scale-110;
  outline: 2px solid transparent;
  outline-offset: 2px;
  position: relative;
}

/* Invisible expanded hit area */
.accent-swatch::before {
  content: '';
  position: absolute;
  inset: -8px; /* 36px total hit area */
}
```

For post tag pills:

```css
.post-tag-pill {
  @apply inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium  /* py-0.5 → py-1.5 */
         border border-slate-600 text-slate-400 no-underline
         transition-colors;
  background: color-mix(in srgb, var(--color-accent) 8%, transparent);
  min-height: 32px; /* still below 44 but a meaningful lift */
}
```

For pills that are *not* primary actions, 32px is generally accepted; raising to 44px would visually overweight tag chips. If you want strict AA, set `min-height: 44px` with `padding-block: 0.5rem`.

**Verify**
- Use Chrome DevTools' touch-target overlay (Lighthouse a11y audit flags these specifically).
- Manual test on a phone or in DevTools touch emulation.

## Summary checklist

```
[ ] 1. Title-hierarchy fix (post.html, main.css unlayered)
[ ] 2. Add --color-accent-deepest token; update 8 component rules
[ ] 3. max-w-3xl → max-w-[68ch]; add text-wrap: balance/pretty
[ ] 4. Trim sidebar duplication (Option A recommended)
[ ] 5. Theme-aware home-hero dots (color-mix on var(--color-accent))
[ ] 6. Code comment slate-500 → slate-400
[ ] 7. Touch targets: dark-toggle, accent-swatch, post-tag-pill
[ ] Run npm run build:css
[ ] bundle exec jekyll serve and visually verify each change
[ ] Lighthouse + axe pass on a representative post page
[ ] Cycle every accent theme (8 + rainbow + accessible) for regressions
```

## Out-of-scope follow-ups (next pass)

These came up in the critique but aren't in the priority seven. Capture for later:

- 21:9 hero ratio is dominant — consider 16:9 or 5:2 for more balanced post pages.
- Hero image `alt={{ page.title | escape }}` duplicates the H1 below — set `alt=""` for decorative heroes or write a real description.
- Add `scroll-padding-top: 4rem` on `<html>` so TOC anchor jumps land below the sticky topbar.
- Consider View Transitions API for smooth blog-index → post navigation.
- Container queries on `.post-card` for true container-aware responsive layout.
- Search modal: verify focus trap and Esc-close behaviour.
- Decide whether `prose-headings:font-semibold` (in `@apply`) or the unlayered `font-weight: 700` overrides are canonical — they currently disagree.
- `.post-summary` reads like a callout but lacks the icon pattern — either align it with `.note`/`.tip` style or differentiate it more clearly.
- Three different focus-ring widths (default 2px, `prefers-contrast: more` 3px, accessible theme 4px) — consider unifying at 3px.
