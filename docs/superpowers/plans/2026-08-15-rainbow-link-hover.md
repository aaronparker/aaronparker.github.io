# Rainbow Link Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a rainbow horizontal gradient pill hover/focus treatment to rainbow-theme article content links without changing sidebar, nav, card, or share-link behavior.

**Architecture:** Keep the existing `.post-content a` base styling, split the current hover rule into a non-rainbow fallback and a rainbow-specific override, and scope the new gradient treatment to content links only. The change stays entirely in `assets/css/main.css`, then verifies with the existing Tailwind build and manual visual checks.

**Tech Stack:** Jekyll, Tailwind CSS v4, plain CSS in `assets/css/main.css`

## Global Constraints

- Target only content hyperlinks in reading surfaces such as `.post-content`
- Apply the treatment only when `html.theme-rainbow` is active
- Keep existing non-content links unchanged
- Keep the current non-hover state unchanged
- Use a horizontal gradient that runs blue, purple, pink, red, orange, amber, and green
- White foreground text on the gradient background must remain legible across the full color run
- Keyboard focus gets the same treatment as hover
- Rebuild CSS with `npm run build:css`

---

## File map

- Modify: `assets/css/main.css`
  - Keeps the existing rainbow theme token block near lines 66-87
  - Keeps the existing `.post-content a` base style near lines 610-617
  - Replaces the generic content-link hover rule near lines 619-623 with a non-rainbow fallback plus a rainbow-specific hover/focus rule
- Verify with: `npm run build:css`

### Task 1: Add a rainbow gradient hover/focus treatment for content links

**Files:**
- Modify: `assets/css/main.css:610-623`
- Verify: `assets/css/main.css:66-87`

**Interfaces:**
- Consumes: Existing `.post-content a` base styling, existing rainbow palette values (`#60a5fa`, `#c084fc`, `#f472b6`, `#f87171`, `#fb923c`, `#fbbf24`, `#4ade80`), and existing rainbow theme selector `html.theme-rainbow`
- Produces: A non-rainbow content-link hover selector and a rainbow-only content-link `:hover, :focus-visible` selector that applies the gradient pill treatment without affecting nav or share links

- [ ] **Step 1: Keep the current base content-link styling unchanged**

Confirm this block remains the base style and is not moved into rainbow-only scope:

```css
.post-content a {
  color: var(--color-accent);
  padding: 0.05em 0.25em;
  margin: 0 -0.1em;
  border-radius: 0.2em;
  transition: background-color 150ms ease, color 150ms ease;
  text-decoration: none;
}
```

- [ ] **Step 2: Replace the current generic content-link hover rule with a non-rainbow fallback**

Replace this existing rule:

```css
.post-content a:not(.project-card):not(:has(> img)):hover {
  background-color: var(--color-accent-dark);
  color: #ffffff;
  text-decoration: none;
}
```

with this fallback so non-rainbow themes keep the current behavior:

```css
html:not(.theme-rainbow) .post-content a:not(.project-card):not(:has(> img)):hover {
  background-color: var(--color-accent-dark);
  color: #ffffff;
  text-decoration: none;
}
```

- [ ] **Step 3: Add the rainbow-only gradient hover/focus rule for content links**

Insert this block immediately after the non-rainbow fallback rule:

```css
html.theme-rainbow .post-content a:not(.project-card):not(:has(> img)):is(:hover, :focus-visible) {
  background-image: linear-gradient(
    90deg,
    #60a5fa 0%,
    #c084fc 16.66%,
    #f472b6 33.33%,
    #f87171 50%,
    #fb923c 66.66%,
    #fbbf24 83.33%,
    #4ade80 100%
  );
  color: #ffffff;
  text-decoration: none;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
```

- [ ] **Step 4: Expand the transition so the gradient animates cleanly**

Update the base link transition from:

```css
transition: background-color 150ms ease, color 150ms ease;
```

to:

```css
transition: background-color 150ms ease, background-image 150ms ease, color 150ms ease;
```

- [ ] **Step 5: Rebuild the generated CSS**

Run:

```bash
npm run build:css
```

Expected: Tailwind completes successfully and rewrites `assets/css/style.css` with no errors.

- [ ] **Step 6: Verify the scope manually**

Check these cases in the browser:

- A standard inline article link inside `.post-content` shows the rainbow gradient pill on hover
- A keyboard-focused inline article link inside `.post-content` shows the same rainbow gradient pill
- A wrapped inline article link renders clean gradient fragments on each line rather than one broken background block
- Sidebar navigation links still use the teal hover color and do not get the gradient background
- Social links still use the teal hover color and do not get the gradient background
- Share badges keep their current button styling and white text rule

- [ ] **Step 7: Commit the implementation**

```bash
git add assets/css/main.css assets/css/style.css
git commit -m "feat: add rainbow content link hover gradient"
```
