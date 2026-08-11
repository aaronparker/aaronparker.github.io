---
name: stealthpuppy
description: A modern, technical, approachable design system for deep expertise sharing
colors:
  accent-indigo: "#818cf8"
  accent-indigo-dark: "#6366f1"
  accent-indigo-deepest: "#4f46e5"
  accent-blue: "#60a5fa"
  accent-purple: "#c084fc"
  accent-pink: "#f472b6"
  accent-red: "#f87171"
  accent-orange: "#fb923c"
  accent-amber: "#fbbf24"
  accent-green: "#4ade80"
  accent-gray: "#94a3b8"
  accent-accessible: "#fde047"
  surface-dark: "#0f172a"
  surface-dark-sidebar: "#030712"
  surface-dark-secondary: "#1e293b"
  surface-light: "#ffffff"
  surface-light-sidebar: "#f3f4f6"
  surface-light-secondary: "#f9fafb"
  text-dark: "#cbd5e1"
  text-dark-muted: "#94a3b8"
  text-light: "#111827"
  text-light-muted: "#6b7280"
  border-dark: "#334155"
  border-light: "#e5e7eb"
typography:
  sans:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontFeature: "normal"
  mono:
    fontFamily: '"Geist Mono Variable", ui-monospace, "Cascadia Code", monospace'
    fontFeature: "normal"
  display:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(2.25rem, 7vw, 3.75rem)"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.875rem"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "normal"
  title:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.5rem"
    fontWeight: "700"
    lineHeight: "1.3"
    letterSpacing: "normal"
  body:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "normal"
  label:
    fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: "0.025em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  link:
    textColor: "{colors.accent-indigo-dark}"
    textDecoration: "none"
  link-hover:
    textColor: "{colors.accent-indigo-dark}"
  sidebar:
    backgroundColor: "{colors.surface-dark-sidebar}"
    padding: "24px"
  sidebar-hover:
    backgroundColor: "{colors.surface-dark-secondary}"
    rounded: "{rounded.md}"
  post-card:
    backgroundColor: "{colors.surface-dark-secondary}"
    rounded: "{rounded.lg}"
    textColor: "{colors.text-dark}"
    padding: "16px"
  post-card-hover:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-dark}"
  button-primary:
    backgroundColor: "{colors.accent-indigo-deepest}"
    textColor: "{colors.surface-light}"
    padding: "10px 16px"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.accent-indigo-dark}"
---

# Design System: stealthpuppy

## Overview

**Creative North Star: "The Deep Technical Expert"**

stealthpuppy is a digital garden for engineers, architects, and technical leaders. The design embodies modernity, technical sophistication, and accessibility—creating a space where complex topics become digestible and approachable. The visual system uses a layered, contrast-driven aesthetic with intentional accent color flexibility (9 themes + accessible mode), allowing visitors to make the interface their own while maintaining focus on content. Dark mode is the primary experience with high-contrast light mode support; an accessible high-contrast yellow theme overlays at any time.

**Key Characteristics:**
- **Layered by contrast:** depth through tonal shifts, not shadows
- **Accent-flexible:** 8 curated color themes + rainbow, plus forced high-contrast accessible yellow
- **Content-first:** typography and spacing orchestrated for reading clarity
- **Technically refined:** monospace pair for code, feature-complete responsive behavior
- **Dark-first:** optimized for screen time; light mode supported

## Colors

The palette is grounded in slate neutrals (dark mode baseline) and gray-based light mode, with nine interchangeable accent colors plus a live rainbow option. The accessible mode forces a high-contrast yellow (#fde047) overlay across all surfaces for users who need it.

### Primary (Accent Indigo — Default)

- **Accent Indigo** (#818cf8): Default accent used in links, focus rings, hover states, and accent color swatches. Applied to dark backgrounds where its lighter tone reads clearly.
- **Accent Indigo Dark** (#6366f1): Used on light backgrounds, modals, and hover states to maintain contrast against lighter surfaces.
- **Accent Indigo Deepest** (#4f46e5): Used for button backgrounds and backgrounds under white text where the deepest tone is necessary.

### Secondary (Switchable Themes)

Eight additional curated accent colors (Blue, Purple, Pink, Red, Orange, Amber, Green, Gray) and a **Rainbow** mode (animated hue rotation). Each theme supplies the same three-tone structure (light, dark, deepest) to ensure consistent contrast across all UI. Users select via accent color swatches in the sidebar footer; preference is stored in `localStorage` under key `accent-theme`.

- **Accent Blue** (#60a5fa): Cool, technical, engineering-forward
- **Accent Purple** (#c084fc): Creative, design-adjacent
- **Accent Pink** (#f472b6): Contemporary, warm
- **Accent Red** (#f87171): Alert, decisive
- **Accent Orange** (#fb923c): Energetic, friendly
- **Accent Amber** (#fbbf24): Warm, approachable
- **Accent Green** (#4ade80): Growth, success
- **Accent Gray** (#94a3b8): Minimal, reserved
- **Accent Rainbow** (hsl-animated): Full spectrum, playful

### Neutral (Dark Mode)

- **Surface Dark** (#0f172a / slate-900): Primary page background in dark mode.
- **Surface Dark Sidebar** (#030712 / slate-950): Darkest background, used for the fixed sidebar to create layering depth.
- **Surface Dark Secondary** (#1e293b / slate-800): Secondary layer for cards, modals, and components that need to lift off the page background.
- **Text Dark** (#cbd5e1 / slate-300): Primary body text and content in dark mode; high contrast against #0f172a.
- **Text Dark Muted** (#94a3b8 / slate-400): Tertiary text, labels, metadata, and reduced-prominence copy.
- **Border Dark** (#334155 / slate-700): Dividers, borders, and structural lines in dark mode.

### Neutral (Light Mode)

- **Surface Light** (#ffffff): Primary page background in light mode.
- **Surface Light Sidebar** (#f3f4f6 / gray-50): Secondary light background for the sidebar.
- **Surface Light Secondary** (#f9fafb / gray-100): Tertiary light surface for cards and components.
- **Text Light** (#111827 / gray-900): Primary body text in light mode; maximum contrast.
- **Text Light Muted** (#6b7280 / gray-500): Tertiary text and metadata.
- **Border Light** (#e5e7eb / gray-200): Dividers and structural lines.

### Accessible (High-Contrast Overlay)

- **Accent Accessible** (#fde047): Forced accent across all interactive elements when `.accessible` class is applied to `<html>`. Paired with black backgrounds (#000000) and white text (#ffffff) for maximum WCAG AAA compliance. Forces high-contrast mode across navigation, links, buttons, cards, and all UI.

### Named Rules

**The Accent Rarity Rule.** The primary accent (whichever theme is active) is applied sparingly—typically to links, focus rings, and button backgrounds—never covering more than 8–10% of a screen. Its rarity is the design principle: restraint makes it read as intentional and elevated.

**The Layered Depth Rule.** Contrast is achieved through tonal shifts (slate-900 → slate-800 → slate-700), not drop shadows. This creates a clean, refined aesthetic appropriate to technical content. On hover, subtle elevation is signaled by background color change and a 200ms ease transition, not a shadow.

**The Accessible Override Rule.** When `.accessible` is present on `<html>`, the forced yellow (#fde047) + black (#000) + white (#fff) palette completely replaces all accent colors and surface tones, overriding theme preferences. No exceptions.

## Typography

**Display Font:** Geist Variable (self-hosted, variable weight)
**Body Font:** Geist Variable (same family, tuned for screen reading)
**Monospace Font:** Geist Mono Variable (self-hosted, code and technical elements)

**Character:** Geist Variable is a humanist sans-serif with a slightly warm tone and natural stroke contrast, striking a balance between technical rigor and approachability. The family's optical sizing and variable-weight axis support responsive typography and intentional hierarchy. Paired with Geist Mono Variable, the system handles both editorial and technical content with visual distinction while maintaining cohesion.

### Hierarchy

- **Display** (700, clamp(2.25rem, 7vw, 3.75rem), 1.2): Hero headings and page titles. Used sparingly; typically only on homepage hero or major section breaks. Responsive fluid sizing ensures readability across all screen sizes (36px–60px effective range).
- **Headline** (700, 30px, 1.2): Post titles, major section headings, modal titles. Applied to `<h2>` in `.post-content` (override Tailwind Typography's 24px default).
- **Title** (700, 24px, 1.3): Subsection headings, card titles, sidebar section labels. Applied to `<h3>` and `<h4>` in `.post-content`.
- **Body** (400, 16px, 1.6): Default paragraph text, list items, and standard content. Tuned for screen reading comfort with 65–75 character optimal line length (enforced by container queries on post-content).
- **Label** (500, 14px, 1.4, 0.025em tracking): Metadata, navigation labels, button text, form labels, and callout badges. Uses 0.025em letter-spacing for clarity at smaller sizes.

### Named Rules

**The Prose Body Rule.** Paragraph text in `.post-content` is rendered with `@apply prose prose-invert` (Tailwind Typography plugin) in dark mode, tuned for long-form reading. Max width is unconstrained in the global prose but container-limited to 65–75ch on larger screens (enforced via `.post-content`). Headings are overridden to bold (700) and tighter line-height (1.2) for visual hierarchy.

**The Code Styling Rule.** Inline `<code>` elements are rendered in Geist Mono Variable with background color matching the secondary surface, no backticks (`before`/`after` content removed), and monospace font applied globally. `<pre>` elements for code blocks are styled with a dark background (#1e293b), border, and syntax highlighting (via Highlight.js or Rouge).

## Layout

The layout is a **sidebar + main content** model optimized for reading and navigation. The sidebar is fixed-width (280px) on desktop, hidden (overlay) on mobile, and fixed on tablet. Main content expands to fill available width.

### Sidebar (Fixed, Desktop)

- Width: 280px
- Background: `surface-dark-sidebar` in dark mode, `surface-light-sidebar` in light mode
- Contains: Avatar (80px, 56px on small screens), navigation, "More" section (Archive, RSS), social icons (8 + 1 accent color swatches)
- Scrollable: `.sidebar__nav` section scrolls independently if nav is tall
- Responsive: Hidden below 1024px; overlays on mobile with a 250ms slide-in animation

### Main Content Area

- Margin: 280px left offset (desktop); full width on mobile/tablet
- Padding: 0 horizontal (edge-to-edge) unless inside a `.post-content` container, which uses container queries for readability
- Responsive grid: 1 column (mobile), 2 columns (tablet 640px+), 3 columns (desktop 1024px+)
- Grid gap: 16px; scales to 24px on large screens

### Topbar (Sticky, Mobile + Desktop)

- Height: 56px (h-14 in Tailwind)
- Background: `slate-900/60` with `backdrop-blur-lg` for depth
- Sticky positioning: top-0, z-20 to float above content
- Desktop: Offset by sidebar width on large screens
- Contains: Breadcrumb (optional), dark mode toggle, accessible theme toggle, search trigger

### TOC (Table of Contents) Sidebar

- Hidden below 1280px; sticky on large screens
- Width: 200–240px
- Border-left in `border-dark`
- Lists kramdown-generated `#markdown-toc` with scroll-spy highlighting (IntersectionObserver) and smooth scroll on click
- Active link highlighted with accent color and bold weight

### Spacing & Rhythm

- Base grid: 4px (used in focus rings, micro-spacing)
- Standard gaps: 8px, 16px, 24px, 32px
- Sidebar padding: 24px (px-6 in Tailwind)
- Component padding: 16px standard, 12px compact
- Line spacing (typography): 1.2–1.6 depending on role
- Post content: Max-width enforced via container queries; prose spacing is Tailwind Typography defaults (28px paragraph margin-bottom, tighter on headings)

### Breakpoints

- **Mobile:** < 640px (full-width layout, sidebar overlay)
- **Tablet:** 640px–1023px (2-column grid, sidebar offset but visible)
- **Desktop:** 1024px–1279px (3-column grid, sidebar fixed, no TOC)
- **Large:** 1280px+ (3-column grid, sidebar fixed, TOC sticky on right)

### Mobile-Specific

- Sidebar hidden by default; toggle via hamburger in topbar
- Touch-friendly tap targets: 44px minimum (44px × 44px buttons)
- Full-width content with 24px horizontal padding on mobile
- Single-column post card grid

## Elevation & Depth

This system uses **layered contrast** to express depth, not shadows. Surfaces are arranged in a clear hierarchy using Tailwind's slate scale; no `box-shadow` is employed for structural depth.

### Surface Hierarchy

1. **Base** (`surface-dark` / `surface-light`): Page background, lowest layer
2. **Secondary** (`surface-dark-secondary` / `surface-light-secondary`): Cards, modals, sidebar overlays; 1 stop darker/lighter
3. **Sidebar** (`surface-dark-sidebar`): Darkest layer, creates visual separation and anchors the layout
4. **Focus rings:** 3px solid accent color at 2px offset, no shadow

### State Indication

- **Hover:** Background color shift (e.g., `surface-dark-secondary` → `surface-dark`) + `transition-colors 200ms ease`
- **Active/Pressed:** Accent color applied to background + text color inverted
- **Focus:** 3px solid outline in accent color at 2px offset
- **Disabled:** `opacity-50` and `pointer-events-none`

### No Shadows (Deliberate)

Shadows are not used in this system. Depth is expressed purely through color contrast and state transitions. This choice supports the "technical, refined" aesthetic and ensures the interface works well at all brightness levels and in high-contrast accessible mode.

## Shapes

The design employs subtle, measured rounding to distinguish components without softening the technical character.

### Border Radius Scale

- **sm:** 4px (focus rings, small components like icon buttons)
- **md:** 6px (buttons, input fields, small cards)
- **lg:** 8px (post cards, modals, larger containers)

### Rounded Behavior

- Buttons: `rounded-md` (6px)
- Input fields: `rounded-md` (6px)
- Post cards: `rounded-lg` (8px)
- Modals/panels: `rounded-lg` (8px)
- Sidebar: No rounding (full height, edge-to-edge)
- Avatar: `rounded-full` (80px circle, 56px on compact screens)

### Borders

- Dividers: 1px solid in `border-dark` (dark mode) or `border-light` (light mode)
- Component borders: 1px for visual structure, not emphasis
- Focus rings: 3px solid accent at 2px offset (no border-radius on outline itself)

### Named Rules

**The Modest Radius Rule.** Rounding stops at 8px; no corners approach 12px or beyond. This maintains the technical, deliberate character and prevents the interface from feeling too soft or app-like.

## Components

### Links

- Default: `text-accent-indigo-dark` (or theme-active accent in dark mode)
- No underline (removed via `prose-a:no-underline`)
- Hover: Underline appears on hover
- Focus: 3px accent outline at 2px offset
- Visited: No visual distinction (intentional; reduces noise)

### Buttons

**Primary Button**
- Background: `accent-indigo-deepest` (or theme-active deepest accent)
- Text: `text-white`
- Padding: 10px 16px (compact) or 12px 20px (standard)
- Rounded: 6px
- Hover: Background shifts to `accent-indigo-dark`
- Focus: Outline + background change
- Transition: 200ms ease

**Secondary/Tertiary** (if applicable)
- Ghost button: transparent background, accent text, border on hover

### Post Cards

- Background: `surface-dark-secondary`
- Rounded: 8px
- Padding: 16px (internal content padding)
- Border: 1px solid `border-dark`
- Container: 16:9 aspect ratio hero image at top
- Hover: Background shifts to `surface-dark`, border remains stable
- Transition: transform 200ms ease, box-shadow 200ms ease (though shadow is never applied), border-color 200ms ease, background-color 200ms ease
- Content: Category pill (accent text on secondary background), title (headline weight), excerpt (body text, muted), date + reading time (label size, muted)

### Navigation

**Sidebar Nav Links**
- Default: `text-slate-300`, padding 8px 12px, rounded 6px
- Hover: Background `surface-dark-secondary`, text `text-slate-50`, transition 150ms
- Active: Background `surface-dark-secondary`, text `text-slate-50`, held state
- Icon: 16px, color inherited

**TOC Links** (in-page table of contents)
- Default: `text-slate-400`, no background
- Hover: `text-slate-50`
- Active: Accent color text, bold weight, left border (accent color, 2px), padding-left increases
- Transition: 150ms ease

### Modals & Panels

- Background: `surface-dark-secondary` with 95% opacity backdrop (for search/shortcuts)
- Rounded: 8px
- Border: 1px solid `border-dark`
- Padding: 16px–24px depending on content
- Close button: top-right, accent color on hover
- Keyboard support: ESC closes, Tab traps focus, arrow keys navigate

### Form Inputs

- Background: `surface-dark` (one level darker for input wells)
- Border: 1px solid `border-dark`
- Text: `text-dark`
- Placeholder: `text-dark-muted`
- Rounded: 6px
- Padding: 10px 12px
- Focus: Accent color outline
- Disabled: `opacity-50`

### Metadata & Labels

- Font: Label weight (500, 14px)
- Color: `text-dark-muted`
- Spacing: 4px gap between icon and text
- Icon size: 14px, color inherited

## Do's and Don'ts

### Do's ✓

- **Do** use the sidebar as the primary navigation anchor; always keep it available on desktop.
- **Do** apply accent color sparingly (< 10% of any screen). It's rarer, more powerful.
- **Do** test all eight accent themes plus the rainbow option; ensure contrast holds across them.
- **Do** use the accessible yellow (#fde047) override as a design-wide safety net; never bypass it.
- **Do** prefer color contrast over shadows to express depth.
- **Do** use the prose component styles for `.post-content` to ensure reading comfort.
- **Do** respect dark mode as the primary experience; optimize for it first.
- **Do** use monospace for code, terminal output, and technical terms.
- **Do** maintain 65–75 character line length in body text for readability.
- **Do** use the 4px / 8px / 16px / 24px / 32px spacing scale consistently.
- **Do** apply 200ms ease transitions to interactive state changes (hover, focus, press).
- **Do** test responsive behavior on mobile (< 640px) with the sidebar overlay.

### Don'ts ✗

- **Don't** use more than two accent colors on a single screen (one primary, one for contrast or error states).
- **Don't** apply rounding beyond 8px; keep the interface technically refined.
- **Don't** add shadows; depth is expressed through tonal contrast only.
- **Don't** change the sidebar width without updating the `--sidebar-width` CSS variable and all responsive offsets.
- **Don't** ignore the accessible yellow override; it's not optional—test it.
- **Don't** set line-height below 1.2 for headings or 1.6 for body text; readability suffers.
- **Don't** use the brand colors (accent tones) for error/warning/success without explicit context; use semantic colors (red, yellow, green) if a status system is added.
- **Don't** nest rounded corners beyond one level (e.g., rounded card with rounded inner buttons is fine; rounded card with rounded button with rounded inner badge is noise).
- **Don't** use light font weights (< 400) for body text; readability suffers at screen sizes.
- **Don't** break the sidebar on tablet; keep it visible at 640px+ to maintain navigation clarity.
- **Don't** use color alone to communicate state; always pair with an icon, badge, or label.
- **Don't** remove the focus ring; it's a11y-critical and styled with the accent color for visual integration.
