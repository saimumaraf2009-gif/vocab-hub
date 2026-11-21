# Update 2.36 — Analytics section arcade animations
Only the Analytics page was changed (Mistakes, Arcade, Practice, Dashboard and all other sections untouched).
- script.js: `V.analytics` template only — wrapped the hero streak text in `<span class="an-streak">` and added a decorative ▲/▼ `an-trend` cue before the weekly-comparison note. All calculations, charts, state and numbers are unchanged.
- style.css: appended "Analytics · arcade performance-HUD motion" block, scoped to `.analytics-*`, `.daily-study-section`, `.activity-calendar-section`. Stagger boot-up of stat cards, hover/focus elevation, gauge fill (`@property --an-fill`), bar grow-in (scaleX/scaleY), XP line draw-on + popping points, hero sweep + streak pulse, calendar pop-in and today ping.
- Includes `@media (prefers-reduced-motion: reduce)` which disables all of it and shows final values immediately.
- index.html: cache-bust bumped to v=2.36.
