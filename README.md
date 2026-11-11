# VocabHub 2.0

A local-first English–Bengali vocabulary learning studio. Open `index.html` directly or publish the folder with GitHub Pages.

## What's included
- The original 529 vocabulary entries are preserved. Existing `diff` and `cat` collection labels are retained.
- Five difficulty levels: Beginner, Elementary, Intermediate, Advanced and Expert.
- Every practice/game card has its own level selector; all levels are open.
- Level journey dashboard and difficulty filter in the Library.
- Word Manager includes per-word difficulty editing.
- Creator identity: Moshiur Rahman Araf, Founder & Creator.
- Visible VocabHub icon/wordmark treatment across the sidebar, top bar, favicon and About page.
- Existing practice, revision, XP, achievements, themes, backup and restore are retained.

## Creator photo
A portrait was not included with the supplied ZIP, so the About page uses a designed placeholder. Replace `assets/creator-photo-placeholder.svg` with your portrait (keep the filename, or update `D.creatorPhoto` in `script.js`) to show your real photo.

## Difficulty classification note
The five-level metadata is an editorial first-pass classification of the existing words, not an externally certified CEFR rating. You can review and change any word's level in **Word manager → Difficulty classification**. The old `diff` field remains untouched because it stores the original collection label, not difficulty.

## Data and privacy
Progress is stored in this browser on this device. Use Settings → Backup & restore before clearing browser data. No account, cloud sync or server is included.


## Branding & portraits
- Created by: Moshiur Rahman Araf
- Powered by: Shahed's English Hub — by Md. Shahedul Islam, English Department, Chittagong University
- Add portraits using the exact filenames and instructions in `ADD_PHOTOS_BN.md`.

## Vocabulary/game data fix
The embedded vocabulary used by the game engine now includes the same difficulty metadata as `data/vocabulary.json`. This prevents the level selector from finding zero words when the game starts. All 529 supplied entries are retained.
