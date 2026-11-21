# Update 2.37 — Exam history arcade animations
Only the History page changed (Analytics, Mistakes, Arcade, Practice and others untouched).
- script.js: `V.history` / `histRow` got hook classes (`hist-count`, `hist-stats`, `hist-t-s|a|b|c`, `hist-hot`, `--i` stagger, `--a`) and a decorative `RANK S/A/B/C` badge derived from the displayed accuracy. Data, filters, Show more, review drawer and scoring logic unchanged.
- style.css: appended "Exam history · arcade score-log motion" block scoped to `#hist-list`, `.hist-stats`, `.hist-count`; reduced-motion safe.
- index.html: cache-bust v=2.37.
