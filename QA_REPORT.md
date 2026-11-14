# QA Report — VocabHub 2.6 vocabulary review and integration

## Vocabulary data checks
- [x] Confirmed the source file contains 529 words.
- [x] Preserved all original word IDs and entry order (529 unique IDs).
- [x] Reviewed Bengali meanings and corrected clear mistranslations / awkward equivalents.
- [x] Added a part of speech to every entry (529/529).
- [x] Added at least two synonyms to every entry (529/529).
- [x] Added antonyms where a reliable direct opposite exists; 63 entries intentionally have no antonym.
- [x] Checked for empty Bengali meanings, missing parts of speech, missing synonym arrays, self-synonyms, duplicate synonyms, duplicate antonyms and invalid difficulty values; none remain.
- [x] Preserved existing example sentences, translations, categories, levels, IPA and dictionary reference URLs.

## Website integration checks
- [x] Updated root `vocabulary.json` and `data/vocabulary.json` with the same 529 reviewed entries.
- [x] Rebuilt the `BUNDLED_WORDS` offline fallback inside `script.js` from the same JSON source.
- [x] Updated startup merge so previously saved vocabulary entries receive reviewed fields while local-only words and extra metadata are retained.
- [x] Changed the hosted refresh path to the project-root `./vocabulary.json`, rather than a fixed external repository URL.
- [x] Updated the word-profile reference note to distinguish editorial review from independent dictionary verification.
- [x] `node --check script.js` passes.

## Scope and limitations
- This is an editorial language review, not independent lexicographic verification by a native Bengali/English dictionary editor.
- Dictionary URLs remain lookup references; the references have not all been individually opened and checked.
- A word without a clear lexical antonym has an empty `ant` array intentionally.
- Only the existing 73 entries that already had example sentences retain examples. New example sentences were not invented as part of this meaning/synonym/antonym task.
- Full interactive browser testing and live deployment still require publishing the folder to the user's hosting service.


## VocabHub 2.10 — two-section library integration
- [x] Confirmed the supplied Class XI–XII text contains 429 numbered entries across 15 units.
- [x] Matched 64 source entries to existing library words; added 365 genuinely new entries.
- [x] Confirmed 894 unique word IDs in the final database.
- [x] Confirmed section membership: With Clues = 529; English 1st Paper (Class XI–XII) = 429; 64 words are shared.
- [x] Preserved source Bengali meanings, POS, synonym/antonym lists, example sentences, translations, unit numbers and unit titles for all 365 new entries.
- [x] Kept existing difficulty classifications for the original library and shared entries; assigned Intermediate as the default difficulty for the 365 new entries.
- [x] Synchronized `vocabulary.json`, `data/vocabulary.json` and the embedded offline `BUNDLED_WORDS` data (all identical).
- [x] Removed the library's topic/category filter and added All sections / With Clues / Class XI–XII section filtering.
- [x] Added section, difficulty and question-count/duration/pair-count controls to practice and arcade setup.
- [x] Added section-scoped round tracking so a word is not repeated within that section's round until eligible words have appeared.
- [x] `node --check script.js` passed.


## VocabHub 2.11.1 — Smart Revision and mobile UX QA
- [x] `node --check script.js` passed after the revision queue and navigation changes.
- [x] Confirmed root `vocabulary.json` and `data/vocabulary.json` remain byte-identical to the supplied 2.10 package (894 entries).
- [x] Confirmed the embedded `BUNDLED_WORDS` collection remains identical to the canonical vocabulary JSON.
- [x] Revision queues now bypass regular game round-history filtering; due queue still uses the due-date predicate.
- [x] Fixed due-review counter ordering in Flashcard Recall.
- [x] Verified all 16 page IDs are covered by desktop navigation or the mobile primary/drawer navigation.
- [x] Confirmed the Learning Space / Dashboard topbar heading is not present in the delivered markup.
- [x] ZIP integrity and extracted file inventory verified.
- [ ] Full interactive browser/device testing could not be completed in this runtime; check the deployed site on a real phone before public release.
