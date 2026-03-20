#!/usr/bin/env node
// Copies Geist and Geist Mono variable fonts from npm packages into assets/fonts/
// This makes fonts self-hosted without depending on external CDNs.
// Run via: npm run build:fonts

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const fontsOutDir = path.join(__dirname, '..', 'assets', 'fonts');
fs.mkdirSync(fontsOutDir, { recursive: true });

const fonts = [
  { pkg: '@fontsource-variable/geist', dest: 'geist' },
  { pkg: '@fontsource-variable/geist-mono', dest: 'geist-mono' },
];

for (const { pkg, dest } of fonts) {
  const src = path.join(__dirname, '..', 'node_modules', pkg);
  const destPath = path.join(fontsOutDir, dest);
  if (fs.existsSync(src)) {
    copyDir(src, destPath);
    console.log(`✓ Copied ${pkg} → assets/fonts/${dest}/`);
  } else {
    console.warn(`  ⚠ Font package not found: ${pkg} (run npm install first)`);
  }
}

// Copy JS vendor libraries to assets/js/vendor/
const vendorDir = path.join(__dirname, '..', 'assets', 'js', 'vendor');
fs.mkdirSync(vendorDir, { recursive: true });

const vendorLibs = [
  {
    src: path.join('medium-zoom', 'dist', 'medium-zoom.min.js'),
    dest: 'medium-zoom.min.js',
  },
  {
    src: path.join('lunr', 'lunr.min.js'),
    dest: 'lunr.min.js',
  },
];

for (const lib of vendorLibs) {
  const srcPath = path.join(__dirname, '..', 'node_modules', lib.src);
  const destPath = path.join(vendorDir, lib.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${lib.src} → assets/js/vendor/${lib.dest}`);
  } else {
    console.warn(`  ⚠ ${lib.src} not found (run npm install first)`);
  }
}
