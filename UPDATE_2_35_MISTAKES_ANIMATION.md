# Update 2.35 — Mistakes section arcade animations
Only the Mistakes page was changed (Analytics and everything else untouched).
- script.js: `V.mistakes` / `drawMist` got hook classes (`mist-heading`, `mist-overview`, `mist-row`, `mist-hot`, `mist-fixed`, `--i` stagger) and a decorative `↻ Retry` / `✓ Recovered` cue inside the existing word button. All data, counts, tabs, openWord, exam and boss logic are unchanged.
- style.css: appended "Mistakes · arcade error-buster motion" block (transform/opacity only, reduced-motion safe).
