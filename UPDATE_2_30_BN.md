# v2.30 — Homepage (Dashboard) premium refinement

**গঠন (উপর থেকে নিচে):** Hero → Progress snapshot → Word of the day → Study collections (HSC · SSC · Admission) → সব সেকশনের গ্রিড → Learning rhythm + Leaderboard (পাশাপাশি) → Creator strip → Footer।

- তিনটি বড় বই-ব্যানার এখন একটি "Study collections" সেকশনে, সমান ও কমপ্যাক্ট কার্ডে।
- ১২টি সেকশন-টাইল এখন একই ৪-কলামের ছন্দে (আগে অসম ২-কলাম টাইল ছিল)।
- অপ্রয়োজনীয় footer-note সরানো হয়েছে; Creator কার্ড স্লিম স্ট্রিপ।
- অ্যানিমেশন শুধু সংযত: হালকা fade-up (opacity + translateY), hover lift, লিংকের underline, sidebar active-indicator। Hero-র ঘূর্ণায়মান/ভাসমান অ্যানিমেশন বন্ধ।
- `prefers-reduced-motion: reduce` সমর্থিত।
- সব নেভিগেশন, Arcade, Practice, মোডাল ও ডেটা অপরিবর্তিত।

পরিবর্তিত ফাইল: `script.js` (V.dash মার্কআপ), `style.css` (শেষের "Homepage" ব্লক), `index.html` (cache version 2.30)।
