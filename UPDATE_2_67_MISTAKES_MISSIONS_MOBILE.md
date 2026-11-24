# VocabHub 2.67 — Mistakes recovery hero & clarified missions

- Moved Recovery Rate to the top of the Mistakes page, directly below the page heading, as a prominent animated card with a circular progress ring, current recovery percentage, recovered/active counts and a clear explanation of the 3-consecutive-correct recovery rule.
- Kept the existing recovery calculation: recovered words divided by all tracked weak words (active + recovered). Wrong-answer totals and Mistakes Exam counts remain separate metrics.
- Reworked Missions into a clear daily/weekly dashboard with overall completion, claimable XP and rewards collected; grouped objectives by their reset window; and added an explicit description, target, live progress, completion state and claim action to each card.
- Clarified the exact rules: daily goals reset at local midnight; weekly goals run Sunday–Saturday; only completed non-mission learning sessions count; correct answers are summed from those sessions; the accuracy mission requires one 10+ question session at 80%+ accuracy.
- Corrected weekly mission calculations to use the same Sunday–Saturday calendar period as the reward key, rather than a rolling 7-day count. Existing daily and weekly claim-key formats are retained. Claim actions now re-check completion before awarding XP and remain one-time per period.
- Added narrow-screen layouts for the recovery ring, Mistakes summary/exam rows, mission summaries, grouped cards and full-width mobile claim buttons. Added reduced-motion support.
- Bumped app assets and service-worker caches to v2.67.

## Validation

- `node --check script.js` passed.
- Verified that the recovery card is rendered before the Mistakes overview tiles.
- Verified that daily and weekly mission calculations exclude reward-claim records and use the stated local calendar periods.
- Desktop and mobile browser smoke tests and ZIP integrity checks are included in the release validation.
