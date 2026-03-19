#!/usr/bin/env node
// Copies specific icons from lucide-static and simple-icons into _includes/icons/
// Run via: npm run build:icons

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', '_includes', 'icons');
fs.mkdirSync(outDir, { recursive: true });

// --- Lucide Icons (UI icons) ---
// Files are at: node_modules/lucide-static/icons/{name}.svg
const lucideDir = path.join(__dirname, '..', 'node_modules', 'lucide-static', 'icons');

const lucideIcons = [
  'file-text',       // Nav: Blog
  'folder-open',     // Nav: Projects
  'user',            // Nav: About
  'rss',             // Social: RSS
  'calendar',        // Post: Date
  'clock',           // Post: Reading time
  'tag',             // Post: Category
  'info',            // Callout: Note/Info
  'triangle-alert',  // Callout: Warning
  'lightbulb',       // Callout: Tip
  'sun',             // Dark mode: Light
  'moon',            // Dark mode: Dark
  'external-link',   // UI: External link
  'menu',            // UI: Mobile hamburger
  'x',               // UI: Close
  'search',          // UI: Search
  'copy',            // UI: Copy code button
  'check',           // UI: Copy confirmed
  'chevron-right',   // UI: Breadcrumb/nav
];

let lucideCount = 0;
for (const name of lucideIcons) {
  const src = path.join(lucideDir, `${name}.svg`);
  const dest = path.join(outDir, `${name}.svg`);
  if (fs.existsSync(src)) {
    let svg = fs.readFileSync(src, 'utf8');
    // Ensure currentColor so Tailwind text-* utilities control the color
    svg = svg.replace(/stroke="[^"]*"/, 'stroke="currentColor"');
    fs.writeFileSync(dest, svg);
    lucideCount++;
  } else {
    console.warn(`  ⚠ Lucide icon not found: ${name}.svg`);
  }
}
console.log(`✓ Copied ${lucideCount} Lucide icons → _includes/icons/`);

// --- Simple Icons (brand/social icons) ---
// Files are at: node_modules/simple-icons/icons/{slug}.svg
const simpleDir = path.join(__dirname, '..', 'node_modules', 'simple-icons', 'icons');

// Map from output filename → simple-icons slug
// Note: linkedin was removed from simple-icons (C&D); handled separately below
const simpleIcons = {
  'github': 'github',
  'bluesky': 'bluesky',
  'kofi': 'kofi',
  'spotify': 'spotify',
};

// Inline SVGs for icons no longer in simple-icons
const inlineSvgs = {
  'linkedin': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
};

let simpleCount = 0;
for (const [outName, slug] of Object.entries(simpleIcons)) {
  const src = path.join(simpleDir, `${slug}.svg`);
  const dest = path.join(outDir, `${outName}.svg`);
  if (fs.existsSync(src)) {
    let svg = fs.readFileSync(src, 'utf8');
    // Simple Icons have no fill on the root <svg>; inject fill="currentColor" so
    // CSS text-* / color utilities control the icon colour.
    if (!/<svg[^>]*\bfill=/.test(svg)) {
      svg = svg.replace('<svg ', '<svg fill="currentColor" ');
    } else {
      svg = svg.replace(/(<svg[^>]*)\bfill="[^"]*"/, '$1fill="currentColor"');
    }
    fs.writeFileSync(dest, svg);
    simpleCount++;
  } else {
    console.warn(`  ⚠ Simple Icon not found: ${slug}.svg`);
  }
}
console.log(`✓ Copied ${simpleCount} Simple Icons → _includes/icons/`);

// Write inline SVG fallbacks
for (const [outName, svg] of Object.entries(inlineSvgs)) {
  const dest = path.join(outDir, `${outName}.svg`);
  fs.writeFileSync(dest, svg);
  console.log(`✓ Wrote inline fallback → _includes/icons/${outName}.svg`);
}
