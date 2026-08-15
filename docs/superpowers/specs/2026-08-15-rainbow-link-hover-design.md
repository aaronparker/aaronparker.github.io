## Summary

Add a rainbow-only hover and focus treatment for article/content hyperlinks.
In the rainbow theme, links inside article content will show a horizontal
rainbow gradient pill behind the text while keeping sidebar, nav, and share
controls unchanged.

## Scope

- Target only content hyperlinks in reading surfaces such as `.post-content`
- Apply the treatment only when `html.theme-rainbow` is active
- Keep existing non-content links unchanged
- Keep the current non-hover state unchanged

## Interaction design

### Hover and focus treatment

- On `:hover` and `:focus-visible`, content links receive a horizontal
  gradient that uses the existing rainbow theme hues in sequence: blue,
  purple, pink, red, orange, amber, and green
- Link text switches to white for contrast on the gradient background
- The treatment uses a small border radius and horizontal padding so the link
  reads as a compact pill rather than a full-width block
- Wrapped links use `box-decoration-break: clone` so each line fragment renders
  cleanly

### Exclusions

- Sidebar navigation links stay on the existing teal hover treatment
- Social links stay on the existing teal hover treatment
- Share badges keep their current button styling and white text rule

## CSS approach

- Add rainbow-theme-specific selectors for content links only
- Use `linear-gradient(90deg, ...)` for the hover background image
- Limit the selector so post cards, nav links, and button-like anchors do not
  inherit the pill treatment unintentionally
- Include matching `:focus-visible` styling so keyboard users get the same
  affordance as pointer users

## Accessibility

- White foreground text on the gradient background must remain legible across
  the full color run
- Keyboard focus gets the same treatment as hover
- The interaction is decorative enhancement only; links remain identifiable
  without hover through existing text styling

## Verification

- Rebuild CSS with `npm run build:css`
- Confirm the rainbow hover treatment appears only on article/content links
- Confirm sidebar/nav/share links are unchanged
- Confirm wrapped inline links render cleanly across multiple lines
