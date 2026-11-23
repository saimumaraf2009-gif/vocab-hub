# v2.55 — Intro splash + identity hero
Inspired by the ConceptLab hero (animated entry splash → identity → ticker).

## New: entry splash (index.html + style.css)
- Shows once per browser session, the moment the app opens (before the 4 MB script loads, so it paints instantly).
- Logo pops in with a drawing ring → "VocabHub" letters rise one by one → "Learn · Revise · Master" → a pill that cycles three words (English → বাংলা) → "English → বাংলা vocabulary studio · by Moshiur Rahman Araf".
- Floating vocabulary words drift at the sides, glow pulse, progress bar along the bottom.
- Auto-closes after ~4.3 s. Skip button, tap anywhere, Esc / Enter / Space also close it.
- The dashboard hero's entrance animations are paused while the splash is up and start the instant it leaves.
- `prefers-reduced-motion`: static, closes after 1.5 s. A CSS safety net hides the splash after 9 s even if JS fails.

## Hero (script.js V.dash + style.css)
- New identity row at the top: logo (with soft ping) + VocabHub + "English → বাংলা vocabulary studio".
- New scrolling word ticker (14 words of the day with Bengali meaning, pauses on hover).
- New "Founded & created by Moshiur Rahman Araf" line linking to About.
- Staggered entrance for brand → greeting → headline.

## Housekeeping
- Cache-bust ?v=2.55, service worker VERSION v2.55.
- To see the splash again: close the tab and reopen (it is stored in sessionStorage as `vh_intro`).
