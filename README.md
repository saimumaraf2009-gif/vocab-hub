# VocabHub — Learn. Practice. Remember.

A local-first vocabulary practice website built with plain HTML, CSS and JavaScript. No build step, package installation or backend is required.

## 1. Deploy on GitHub Pages

1. Extract `VocabHub-Fixed.zip`.
2. Open the extracted `VocabHub` folder. Upload the **contents inside this folder** (`index.html`, `style.css`, `script.js`, `assets/`, `data/`, etc.) to the root of a GitHub repository named `VocabHub`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then Save.
6. Wait for GitHub Pages to publish. Your site URL will be `https://YOUR_USERNAME.github.io/VocabHub/`.

Do not upload only the ZIP file. The repository root must contain `index.html`.

## 2. Add your vocabulary

Open the website → **Admin** → paste your list → **Preview** → **Import**.

Accepted line format:

```text
Rightful: বৈধ / ন্যায্য
Precaution: সতর্কতা / পূর্ব সতর্কতা
Abandon: ত্যাগ করা
```

The importer ignores lines beginning with `Page`. It also accepts CSV and JSON. Duplicate English words are merged; Bengali meanings are combined.

The initial `data/vocabulary.json` is intentionally empty. Your vocabulary has not been preloaded.

### Make your list the default for visitors

After importing your list in Admin:

1. Click **Export JSON**.
2. Replace the repository's `data/vocabulary.json` with the exported file.
3. Commit and push the change to GitHub.
4. Visitors with no saved local vocabulary will load the updated list.

If your own browser already has an older local vocabulary saved, use **Admin → Reload from data/vocabulary.json** after updating the repository.

## 3. Progress, backup and privacy

- Personal XP, levels, streaks, revision progress, favorites, achievements and imported words are saved in the current browser's `localStorage`.
- This data does not automatically sync across devices or browsers.
- Use **Settings → Download backup** regularly. **Restore backup** can restore a previous backup.
- **Admin is not password-protected.** This is a static site with no server. Anyone can change data in their own browser, but those changes do not change the GitHub repository or other visitors' data.
- Do not store passwords, private information or secrets in this site.

## 4. What is and isn't included

Included: Dashboard, Library, Practice, Arcade, Smart Revision, Missions, Achievements, Analytics, Profile, Settings, Admin, MCQ, matching, fill-in-the-blanks, typing, synonym/antonym, scramble, speed practice and flashcards.

Not included yet: cloud accounts, real global leaderboards, tournaments, PWA/offline installation, or server-secured admin. These require a backend later.

## 5. Important testing note

The JavaScript passes a Node syntax check and the importer/question-generation/game-flow smoke tests pass with test vocabulary. A full interactive browser/device test could not be completed in this environment. Test the published GitHub Pages site on desktop and mobile before sharing it widely.

## 6. Configuration

Review intervals, XP values, level thresholds and the daily XP cap are constants near the top of `script.js`.
