# VocabHub 2.15

A local-first English–Bengali vocabulary learning studio. Open `index.html` directly or publish the folder with GitHub Pages, Netlify, or another static host.

## What's new in 2.11.1 — Smart Revision and mobile navigation
- Reworked Smart Revision guidance so the three queues are clearly explained: Due for revision, Difficult words, and Learned words.
- Clarified the spaced-repetition intervals (1, 2, 4, 7, 15, 30 and 60 days) and the two flashcard self-check actions.
- Fixed revision sessions so their selected queue is not filtered by normal practice round history; due, difficult and learned words can all be reviewed as intended.
- Fixed the revision-session review counter so correctly recalled due words are counted before their next review date is advanced.
- Added an accessible mobile slide-in menu with every secondary section, a close button, tap-outside dismissal, Escape-key dismissal and active-page indication.
- Kept the bottom navigation focused on Home, Practice, Arcade, Library and Profile.
- Removed the repeated partner promotional badge from the non-home navigation/footer; the homepage remains the promotional placement.
- Preserved the vocabulary database, word IDs, local learning-progress structure, images and branding assets.

## What's new in 2.10 — two-section library and session filters
- Consolidated the library into exactly two vocabulary sections: **With Clues** (the existing 529 words) and **English 1st Paper (Class XI–XII) — 2018 Key Words** (429 source-list words).
- The 64 overlapping words belong to both sections; the 365 new entries were added from the supplied unit-wise text file, preserving its Bengali meanings, parts of speech, synonyms, antonyms, examples, translations and unit labels.
- The library defaults to **All sections** and can filter to either section. Previous topic/category filters are removed from the library.
- Practice and arcade setup now includes section, difficulty and question-count (or challenge-duration/pair-count) choices. Section-aware rounds avoid repeating a word until the selected section's round is complete.
- New Class XI–XII entries default to Intermediate difficulty so they can be practised immediately; existing difficulty assignments are retained for overlapping words.

## What's new in 2.6 — vocabulary review
- Reviewed all **529 original headwords** for Bengali meaning, part of speech, synonyms and antonyms.
- Corrected mistranslations and unclear meanings; retained multiple Bengali senses where useful.
- Added part-of-speech labels and at least two relevant synonyms for every entry.
- Added antonyms where a reliable opposite exists. An empty antonym list is intentional for words without a natural direct opposite; the data does not invent one merely to fill the field.
- Preserved all 529 original IDs, categories, difficulty levels, IPA, reference links, and existing example sentences.
- Updated the vocabulary in all three runtime locations: `vocabulary.json`, `data/vocabulary.json`, and the embedded offline fallback in `script.js`.
- Existing saved browser vocabulary is refreshed from the bundled reviewed entries at startup. Learner progress, favourites, sessions, achievements, and locally added words remain intact.
- Hosted copies refresh from the project-root `vocabulary.json`; direct `file://` opening and offline use the embedded fallback.

**Editorial limitation:** this is an editorial review pass, not a native lexicographer's sign-off or a complete word-by-word audit against Cambridge/Oxford. Reference links are supplied for further verification. A word can have different Bengali equivalents in different contexts; the entry gives the main learning sense(s) selected for this collection. Empty antonyms are deliberate where no good direct opposite exists.

## What's included
- 894 vocabulary entries across two sections: 529 With Clues entries and 429 Class XI–XII entries, with 64 shared words; five difficulty levels are available.
- Practice, revision, XP, achievements, themes, backup and restore.
- Word profile with pronunciation (where available), Bengali meanings, part of speech, synonyms, antonyms and dictionary references.
- Practice modes, matching, word games, analytics and local-first progress tracking.
- Existing creator and partner branding, photos, design, and learning progress architecture are retained.

## Files to publish
Upload the **contents** of `VocabHub-Premium/` to the static site host. Keep the following files at the same relative locations:
- `index.html`
- `script.js`
- `style.css`
- `vocabulary.json` (canonical hosted data source)
- `data/vocabulary.json` (maintained bundled data copy)
- `assets/` (logos, icons and portraits)

If your current host/repository serves the site from a nested folder, place `vocabulary.json` beside `index.html` and `script.js` in that folder as shown above.

## Photos
Put portraits in `assets/photos/` named `araf.jpg` and `shahed.jpg`. `.jpg`, `.jpeg`, `.png` and `.webp` are accepted; placeholders are used if a portrait is not present.

## Data and privacy
Learning progress is stored in this browser on this device. Use Settings → Backup & restore before clearing browser data. The vocabulary can refresh from the local project-root JSON file when hosted, while `file://` and offline sessions use the embedded fallback.

## Previous updates
- **2.5:** richer optional profile, learning / arcade separation, updated word-profile cards, improved analytics and responsive styling.
- **2.4:** achievements and analytics improvements.
- **2.3:** additional vocabulary games, mistake tracking and practice refinements.
- **2.2:** matching, exam history, word progress and game improvements.


## 2.14
Unit browsing for the 2026 book (and 2018 key words), premium dropdowns, mobile menu fix (drawer moved outside #nav), home-page promos for every tab. See UPDATE_2_14_BN.md.


## What's new in 2.15 — Medical Admission Vocabulary
- Added **Medical Admission Vocabulary** as a separate Library section, with 109 word/phrase profiles derived from the supplied answered question document.
- Added 111 source-linked vocabulary questions grouped into Word Meaning, Synonym–Antonym, Idioms–Phrases and Spelling–Word Forms.
- Added a Medical Admission question-practice page and quiz-game entry points from Practice and Arcade.
- Word profiles show related original question numbers and let learners practise those exact source questions.
- Original source question numbers, options, answers and supplied explanations are retained. The supplied document contains 111 vocabulary-focused questions selected from a 361-question source bank.

## 2.16
DU IBA Vocabulary section + 155 real IBA MCQs merged on top of the Medical Admission build. See UPDATE_2_16_BN.md and IBA_QUESTION_MAP_BN.md.
