# Update 2.39 — Homepage Hero + "Progress, at a glance" animation
Matches the Practice/Arcade motion language (arcIn / hmIn): `cubic-bezier(.2,.8,.2,1)`, 40–70ms stagger, transform/opacity (+ individual `translate`/`scale`), pointer glow/tilt on mouse only, loops paused off-screen via `.in-view`, static under `prefers-reduced-motion`.

**Hero** — CSS-only staged entrance (eyebrow → headline lines → copy → 3 CTAs → proof chips; orbits/“Aa”/floating words in depth order) with `backwards` fill so nothing can stay at opacity 0; underline draw on “you further.”; primary-CTA sheen; hover lift + arrow nudge; pointer glow + depth parallax on the art (mouse only).
**Progress at a glance** — heading cascade + accent underline; stat/level/goal cards use the Arcade entrance (scale .96 → 1, 40ms stagger), pointer spotlight (stats also tilt ±½ of Arcade), hover lift, press feedback; icons pop in then bob; XP / % / daily-target numbers count up (`data-cu`); bar sheen after fill; goal ring pings when 100%.
**Safety** — failsafe reveal after 1.6s for anything on-screen the observer missed; no new document listeners per render; reduced-motion shows final values immediately.
Files: `script.js` (V.dash markup hooks, count-up, pointer handler), `style.css` (end-of-file v2.39 block), `index.html` (cache-bust ?v=2.39). Data files untouched.
