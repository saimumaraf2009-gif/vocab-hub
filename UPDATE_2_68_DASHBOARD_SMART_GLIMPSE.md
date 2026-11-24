# Update 2.68 — Dashboard Smart Glimpses

## What changed

- Replaced the tall promotional bento cards below the Dashboard learning snapshot with compact preview cards.
- Kept the same 12 sections: Practice, Arcade, Levels, Library, Revision, Mistakes, Missions, Achievements, Analytics, History, Leaderboard and Profile.
- Each preview reads current values from the app's existing local data rather than maintaining duplicate preview state.
- Preview examples include sample library words, due/difficult words, weak/recovered words, live mission progress, unlocked milestones, accuracy/session summaries, latest session results, XP and profile details.
- The Leaderboard preview only shows the learner's own saved XP record and keeps the existing note that global rankings are not yet available; no fictional rank is shown.
- The entire preview card is a direct link to its matching tab, with a visible **See more →** affordance.
- Added desktop 3-column, tablet 2-column and narrow-mobile 1-column layouts, visible keyboard focus, touch-friendly spacing and reduced-motion handling.
- Bumped the page asset query strings and service-worker cache from 2.67 to 2.68.

## Validation

- `node --check script.js` passed.
- `tinycss2` parsed the full stylesheet without top-level CSS errors.
- A focused Node harness evaluated the live `exploreGrid()` implementation with representative saved data: 12 unique preview cards rendered, all 12 `See more` labels were present, and all expected tab hashes were included.
- Browser rendering could not be completed in this environment because Chromium navigation to local files and localhost was blocked by the runtime (`ERR_BLOCKED_BY_ADMINISTRATOR`). Visual browser screenshots and end-to-end clicks therefore remain unverified here.
