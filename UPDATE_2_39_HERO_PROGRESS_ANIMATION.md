# Update 2.39 — Hero + "Progress at a glance" arcade motion
- style.css: appended "Home hero + Progress at a glance arcade motion (v2.39)" block (scoped to .hero*, .stats-grid>.stat, .level-card, .goal-card, .section-head).
- script.js: V.dash hero gets two decorative spans (.hero-glow, .hero-sweep); home reveal IIFE extended (level XP count-up, reveal failsafe, hero-copy wrapper, pointer glow/parallax via one delegated listener).
- index.html: cache-bust v=2.39. No data files touched.
## 2.39b — premium finish
- Hero: headline line-by-line mask reveal, gradient shimmer on the accent line, eyebrow rule draw-in, magnetic CTAs (individual `translate`), shine sweep on the primary button, glass proof chips.
- Progress: tabular numerals, stat accent bar grows in, soft tinted tile surface, milestone ticks on level/goal bars, goal ring ping when the daily goal is reached.
- Reduced-motion: all of the above static.
## 2.40 — Mistakes learning snapshot (premium arcade)
- script.js: Mistakes "Learning snapshot" now renders four arcade tiles (`mstTile`) with animated stages — radar lock (Words to fix), drawing check ring (Recovered), stamped ✕ tally (Wrong answers), exam sheet + stamp (Mistake exams) — plus a "Recovery rate" bar (`mstRate`, derived from existing counts). Numbers count up; tiles/strip pause off-screen; pointer glow reuses the delegated handler. Counts, data and logic unchanged.
- style.css: appended v2.40 block scoped to `.mist-tile` / `.mist-rate`; reduced-motion shows static resolved art.
