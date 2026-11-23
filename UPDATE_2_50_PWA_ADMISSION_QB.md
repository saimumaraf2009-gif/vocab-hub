# v2.50 — Admission QB + installable app (PWA)

## Rename
"Admission Questions" is now **Admission QB** everywhere the user sees it:
sidebar / mobile menu, page heading, home banner, home quick link, Arcade shortcut card, Practice track card, section eyebrow labels.

## Installable app (PWA)
- `manifest.webmanifest` — name, standalone display, theme colours, icons, and long-press shortcuts (Admission QB, Practice, Revision).
- `sw.js` — service worker: precaches the app shell (HTML, CSS, JS, data files, images) so the app opens offline; pages are network-first so updates arrive automatically; fonts and vocabulary.json cached at runtime.
- `pwa.js` — registers the service worker, shows an "Install VocabHub" banner (Chrome/Edge/Android), and a "Share → Add to Home Screen" hint on iPhone Safari. A dismissed banner stays hidden for 7 days.
- New icons in `assets/icons/`: `icon-192/512.png`, `maskable-192/512.png`; `apple-touch-icon.png` refreshed.
- `index.html` — manifest link, Apple/Android app meta tags, `pwa.js`.
- Cache-bust bumped to `?v=2.50` (also bump `VERSION` in `sw.js` on every future release).

## Hosting note
Install works only over HTTPS (GitHub Pages, Netlify, Vercel, Cloudflare Pages are all fine) or on localhost. Opening `index.html` by double-click (file://) will not offer install.
