# VocabHub 2.6

A local-first English–Bengali vocabulary learning studio. Open `index.html` directly or publish the folder with GitHub Pages, Netlify, or another static host.

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
- 529 vocabulary entries across five difficulty levels.
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
