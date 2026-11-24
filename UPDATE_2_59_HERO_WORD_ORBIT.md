# v2.59 — Hero "Word Orbit" animation
- New animated scene directly above the progress strip in the home hero (inspired by the ConceptLab hero, themed for VocabHub's black/red palette).
- Glowing red orb that alternates "Aa" ↔ "অ"; two counter-rotating orbit rings carrying a flipping flashcard (English ↔ Bengali, words rotate), a ✓ badge, a flame streak, "+25 XP", a book and a star.
- Dotted arc with a travelling spark, tilted faint ellipse, twinkling stars, floating "Lucid / সুস্পষ্ট" chip and a mini quiz (option C lights up green).
- Header row "VOCABHUB / LIVE LEARNING · LIVE WORDS" and a typewriter line: "Learn with Games / Quizzes / Flashcards / Daily challenges / Streaks & XP".
- Markup: `heroOrbit()` in script.js, wrapped with the strip in `.h2-side`. Behaviour: small IIFE at end of script.js (typewriter, flashcard word swap, pauses when off-screen). CSS: appended v2.59 block.
- Reduced-motion: fully static. Mobile: orbit sits between the CTAs and the progress strip, smaller stage.
- Cache keys + service worker bumped to v2.59.
