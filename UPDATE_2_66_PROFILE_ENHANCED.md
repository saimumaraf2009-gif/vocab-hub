# VocabHub 2.66 — Learner profile redesign

- Rebuilt the Profile page into a richer learner dashboard while retaining the existing local profile fields and browser-only storage model.
- Added a profile-completion indicator, clearer learner identity header, level progress, and compact overview metrics.
- Added a seven-day activity view, daily correct-answer target, chosen learning focus, vocabulary coverage, achievement preview, and recent completed sessions. These values are derived from saved learner data; empty states are shown when no sessions or badges exist.
- Improved the personal-details editor with clearer photo actions, field limits, and a visible local-storage note. Profile edits refresh the displayed profile, and uploaded/removed photos stay synchronized between the profile header and editor.
- Added responsive layouts for desktop, tablet, and mobile, with reduced-motion handling.
- Bumped the stylesheet, application script, and service-worker cache version to 2.66 so the new interface can replace cached assets.
- Kept the 2.65 analytics card sizing fix and existing vocabulary, session, achievement, and backup data structures intact.

## Validation
- `node --check script.js` passed.
- Profile-template render smoke tests passed with both populated and empty progress data.
- HTML asset-version, service-worker cache-version, and responsive CSS checks passed.
- ZIP integrity was checked after packaging.
