# v2.31 — Homepage polish

- Homepage (`V.dash`) now uses the Arcade/Practice motion language: one-time staggered reveal (opacity + translateY, 45ms stagger, `cubic-bezier(.2,.8,.2,1)`), progress bars fill via `scaleX`, gentle tile/chip/stat lift + border highlight on hover-capable pointers, press feedback on touch.
- Hero loops calmed (slower orbit, smaller float, no tilt) and paused when the hero is off-screen (`.in-view`).
- Mobile (≤560px): readable hero/banner type, 44–46px tap targets, 2×2 stats, single-column spotlight/dashboard cards, no horizontal overflow at 360–480px.
- `prefers-reduced-motion: reduce` shows everything static (no hidden states, no loops).
- Only `style.css` (end of file), a small block in `script.js` (home reveal observer) and cache-bust `?v=2.31` changed.
