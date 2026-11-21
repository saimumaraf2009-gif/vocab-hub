# Update 2.39 — Hero + "Progress at a glance" arcade motion
- style.css: appended "Home hero + Progress at a glance arcade motion (v2.39)" block (scoped to .hero*, .stats-grid>.stat, .level-card, .goal-card, .section-head).
- script.js: V.dash hero gets two decorative spans (.hero-glow, .hero-sweep); home reveal IIFE extended (level XP count-up, reveal failsafe, hero-copy wrapper, pointer glow/parallax via one delegated listener).
- index.html: cache-bust v=2.39. No data files touched.
## 2.39b — premium finish
- Hero: headline line-by-line mask reveal, gradient shimmer on the accent line, eyebrow rule draw-in, magnetic CTAs (individual `translate`), shine sweep on the primary button, glass proof chips.
- Progress: tabular numerals, stat accent bar grows in, soft tinted tile surface, milestone ticks on level/goal bars, goal ring ping when the daily goal is reached.
- Reduced-motion: all of the above static.
