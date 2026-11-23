# v2.56 — Hero: "Living Vocabulary Studio"
Implements the VocabHub hero proposal (identity → discovery → action).

## Hero (script.js V.dash + style.css, appended v2.56 block)
- Eyebrow is now LEARN · REVISE · MASTER; headline "Build a stronger vocabulary, one word at a time."
- Only two CTAs: primary **Start learning ↗** (mixed session) and secondary **Explore library →** (the old 3–4 link row is gone; "to revise" now lives in the progress strip and links to Revision).
- Right column: interactive **Today's Discovery** word card (word, IPA · part of speech, Bengali meaning) with two cards peeking behind it. "Learn this word" opens the word dialog; "Next ↻" cycles 5 daily words (word of the day first).
- Compact progress strip (greeting, streak, to-revise/mastered, XP, thin daily-goal bar). Full detail stays in "Progress, at a glance" below.
- Faint floating words (Ephemeral, Benevolent, Resilient, Lucid, Eloquent) drift behind the copy on desktop; ticker and creator line kept.
- Mobile (≤700px) has its own copy ("Build your vocabulary. Unlock your potential.") and order: brand → eyebrow → headline → text → full-width CTA → word card → progress. Library is a text link there so the main CTA stays on the first screen.

## Intro splash
- ~2.8 s (was 4.3 s), still skippable (button / tap / Esc / Enter / Space).
- Shows once per day (localStorage `vh_intro_day`) plus once per session, instead of every new session.

## Housekeeping
- Cache-bust ?v=2.56, service worker v2.56.
