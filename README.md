# VocabHub — Your vocabulary studio

A mobile-first English-to-Bengali vocabulary learning app built with HTML, CSS and vanilla JavaScript. It runs without a build step, package manager or server.

## What's included

- **529 vocabulary entries** with Bengali meanings and a growing set of examples, translations, synonyms and antonyms.
- Topic collections: Academic, Communication, Character, Personal Growth, Society & Life, Science & Nature and the original Core Collection.
- Three visual themes: Midnight, Aurora and Paper, with decorative ambient backgrounds and lightweight motion.
- Dashboard with a daily word, learning snapshot, goal progress and topic shortcuts.
- Vocabulary library with English/Bengali search, topic/status filters, favorites and a full word-profile panel.
- Word profiles with Bengali meaning breakdown, word-class guidance, usage/dictionary examples, synonyms, antonyms, saved personal examples and one-tap word practice.
- Practice: MCQ, typing, fill in the blanks, synonym/antonym, flashcards and mixed practice.
- Arcade: matching, scramble, and timed speed rounds.
- Spaced revision, daily/weekly missions, achievements and activity analytics.
- Local progress, XP, streaks, backup/restore and a vocabulary manager.
- Plus Jakarta Sans + Hind Siliguri typography, enlarged mobile text and a compact 52px bottom navigation.

## Run locally

Open `index.html` in a modern browser. The vocabulary is embedded as a fallback, so it also works when opened directly with `file://`. `data/vocabulary.json` is the editable source list.

## Publish with GitHub Pages

1. Upload the contents of this folder to the root of your GitHub repository.
2. Ensure `index.html` is in the repository root.
3. Open **Settings → Pages** and choose **Deploy from a branch**, `main`, `/(root)`.

## Word detail notes

Some legacy entries contain only a Bengali gloss and no curated part of speech or example. In the profile panel, estimated word classes are marked as inferred and fallback dictionary examples are clearly labeled; curated examples retain their original Bengali translations. Personal examples are saved locally with the rest of the browser data.

## Data and privacy notes

This is a static, local-first app. Learning progress and edits are saved in the current browser's LocalStorage. There are no user accounts, cloud sync, shared database or global leaderboard. Use **Settings → Download backup** before clearing browser data or moving to another device.

## Vocabulary editing

Use **Word manager** to add or import TXT, CSV or JSON vocabulary in the current browser. To change the default published list for all visitors, update `data/vocabulary.json` and the embedded `BUNDLED_WORDS` fallback in `script.js`.
