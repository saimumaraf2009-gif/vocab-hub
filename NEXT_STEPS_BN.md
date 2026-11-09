# VocabHub — পরবর্তী করণীয়

## ধাপ ১: GitHub-এ প্রকাশ

1. `VocabHub-Fixed.zip` ডাউনলোড করে Extract করো।
2. Extract করা `VocabHub` ফোল্ডারের ভেতরে ঢোকো।
3. ভেতরের সব ফাইল ও ফোল্ডার (`index.html`, `style.css`, `script.js`, `assets`, `data` ইত্যাদি) GitHub-এর `VocabHub` repository-এর root-এ Upload করো।
4. Repository → **Settings → Pages**।
5. **Deploy from a branch** নির্বাচন করো।
6. Branch `main`, folder `/(root)` নির্বাচন করে **Save** করো।
7. GitHub Pages প্রকাশ করতে কিছুক্ষণ অপেক্ষা করো। লিংক হবে `https://তোমার-ইউজারনেম.github.io/VocabHub/`।

**সতর্কতা:** ZIP ফাইলটিকে সরাসরি repository-তে upload করলেই ওয়েবসাইট চালু হবে না। ZIP Extract করে ভেতরের ফাইলগুলো root-এ দিতে হবে।

## ধাপ ২: নিজের Vocabulary Import

1. ওয়েবসাইটে গিয়ে **Admin** খোলো।
2. তোমার শব্দের তালিকা Paste করো।
3. **Preview** চাপ দিয়ে কতগুলো শব্দ যুক্ত হবে দেখো।
4. সব ঠিক থাকলে **Import** চাপো।

এই ফরম্যাট গ্রহণ করে:

```text
Rightful: বৈধ / ন্যায্য
Precaution: সতর্কতা / পূর্ব সতর্কতা
Abandon: ত্যাগ করা
```

`Page No` দিয়ে শুরু হওয়া লাইন বাদ দেওয়া হয়। একই ইংরেজি শব্দ একাধিকবার থাকলে আলাদা entry না বানিয়ে অর্থগুলো একত্র করে।

## ধাপ ৩: সবার জন্য একই Vocabulary প্রকাশ

Import করলে শব্দগুলো প্রথমে শুধু তোমার বর্তমান Browser-এ থাকবে। সব নতুন Visitor-এর জন্য Default Vocabulary করতে:

1. Admin → **Export JSON**।
2. ডাউনলোড করা `vocabulary.json` দিয়ে GitHub repository-এর `data/vocabulary.json` ফাইল Replace করো।
3. GitHub-এ Commit changes করো।
4. নিজের Browser-এ পুরোনো Local data থাকলে Admin → **Reload from data/vocabulary.json** চাপো।

## ধাপ ৪: প্রকাশের পর পরীক্ষা

- Admin থেকে কয়েকটি শব্দ Import করে দেখো।
- Library-তে Search ও Favorite পরীক্ষা করো।
- Practice-এর MCQ, Typing, Fill in the Blanks, Synonym/Antonym চালাও।
- Arcade-এর Matching, Scramble ও Speed পরীক্ষা করো।
- Revision, XP, Streak, Missions এবং Analytics পরীক্ষা করো।
- Theme পরিবর্তন করে Desktop ও Mobile—দুই জায়গায় দেখো।
- Settings থেকে Backup Download করে Restore-ও পরীক্ষা করো।

## গুরুত্বপূর্ণ সীমাবদ্ধতা

- XP, Streak, Progress ও Import করা শব্দ এই Browser/Device-এ LocalStorage-এ থাকে।
- অন্য Device-এ নিজে থেকে Sync হবে না।
- প্রকৃত Global Leaderboard, Account/Login ও নিরাপদ Admin-এর জন্য ভবিষ্যতে Backend (যেমন Supabase) লাগবে।
- Admin-এ Login নেই। কেউ নিজের Browser-এ শব্দ পরিবর্তন করতে পারবে, কিন্তু এতে GitHub-এর মূল ফাইল বা অন্য Visitor-এর তথ্য পরিবর্তন হবে না।
- `data/vocabulary.json` এখন ইচ্ছাকৃতভাবে খালি। তোমার মূল শব্দতালিকা এখনো যুক্ত করা হয়নি।

## এই সংস্করণে কী সংশোধন হয়েছে

- Matching-এর XP এখন প্রতিটি সঠিক Pair-এর জন্য দেওয়া হয়; একেবারে শেষে শুধু একটি শব্দের XP দেওয়া হয় না।
- Matching-এ ভুল Pair-ও Accuracy হিসাবের মধ্যে ধরা হয়।
- Flashcard/Practice-এ Due Revision গণনা করার সময় সংশোধন করা হয়েছে।
- Speed Challenge-এ XP এখন দৈনিক ও প্রতি-শব্দ সীমা মেনে চলে, যাতে একই শব্দ বারবার করে XP বাড়ানো না যায়।
- Speed Challenge-এ একই শব্দ এক সেশনে বারবার এলে SRS Progress বারবার পরিবর্তিত হয় না।
- Keyboard focus ও ছোট স্ক্রিনের জন্য CSS উন্নত করা হয়েছে।

