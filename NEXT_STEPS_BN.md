# VocabHub 2.1 — বাংলা নির্দেশিকা

## এই আপডেটে কী ঠিক হয়েছে
১. **গেম খেলতে গেলে "শব্দ নেই" সমস্যা ঠিক করা হয়েছে।** কারণ ছিল — সাইটের ভেতরে বসানো শব্দগুলোর Level তথ্য ছিল না। এখন ৫২৯টি শব্দেরই Level আছে (Level 1: ৪২, 2: ২৩৫, 3: ১২২, 4: ৯৪, 5: ৩৬)। আগে সেভ হয়ে থাকা ডেটাও নিজে থেকেই ঠিক হয়ে যাবে।
২. "Explore topics / Popular study paths / Study paths" বাদ দেওয়া হয়েছে।
৩. **Powered by Shahed's English Hub** — by Md. Shahedul Islam, English Department, Chittagong University — সাইডবার, ফুটার ও About পেজে যোগ হয়েছে, ছবিসহ।

## ছবি কীভাবে যোগ করবে (সবচেয়ে সহজ)
`assets/photos/` ফোল্ডারে ছবি রাখো:

| কার ছবি | ফাইলের নাম |
|---|---|
| তোমার (Moshiur Rahman Araf) | `araf.jpg` |
| Md. Shahedul Islam স্যারের | `shahed.jpg` |

- ফাইলের নাম হুবহু এটাই হতে হবে। `.jpg`, `.jpeg`, `.png`, `.webp` — যেকোনো একটা হলেই চলবে।
- ছবি না থাকলে আপাতত ডিজাইন করা placeholder দেখাবে (`araf.svg`, `shahed.svg`)।
- ভালো দেখাতে ছবি চারকোনা (square) ও ৪০০×৪০০ পিক্সেল বা তার বেশি হলে ভালো। মুখ মাঝখানে রাখো।
- GitHub Pages ব্যবহার করলে ছবি আপলোড করে commit করলেই হবে।

## অন্য নির্দেশ
- `index.html` ওপেন করলেই ওয়েবসাইট চালু হবে।
- Word Manager → Difficulty classification থেকে প্রতিটি শব্দের Level বদলানো যায়।
- নতুন শব্দ যোগ করলে ডিফল্ট Level 3 (Intermediate) হবে; পরে বদলানো যাবে।
- Settings থেকে নিয়মিত Backup ডাউনলোড করো।

**নোট:** Level 5 (Expert)-এর শব্দগুলোতে উদাহরণ বাক্য ও সমার্থক শব্দ নেই, তাই "Fill in the blank" ও "Synonym" গেম ওই Level-এ সব Level থেকে প্রশ্ন নেবে (একটা বার্তা দেখাবে)।
