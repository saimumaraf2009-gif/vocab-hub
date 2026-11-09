# VocabHub QA report

## Checks completed
- `script.js`: Node.js syntax check passed.
- Import smoke test: line-based Bengali vocabulary import passed; 4 test words imported.
- Question-generation smoke test: MCQ, typing, scramble, fill-in-the-blanks, synonym/antonym and mixed modes generated questions with test data.
- Game-flow smoke test: MCQ, typing, scramble, fill-in-the-blanks, synonym/antonym, mixed, matching, flashcards and speed mode completed in a mocked JavaScript environment.
- Matching XP and attempt denominator corrected.
- Due-review counting corrected.
- Speed XP farming issue corrected with per-word/day and daily XP caps.

## Not verified
- A full browser run was blocked by the execution environment, so actual rendering, mobile layout, timer interaction, browser storage behavior and GitHub Pages deployment still need a real-browser check.
- The real vocabulary list has not been imported or proofread.
- No live user accounts or global leaderboard exist; this build is local-first by design.

## Recommendation
Deploy to a temporary GitHub Pages repository, test the checklist in `NEXT_STEPS_BN.md`, then import and proofread the full vocabulary list.
