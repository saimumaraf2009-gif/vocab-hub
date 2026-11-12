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
