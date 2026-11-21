# v2.48
- Practice/game setup: Difficulty level is now a row of small selectable boxes (like Number of questions). Each shows the level name and "N words" (the old "টি উপযোগী শব্দ" / "পর্যাপ্ত নেই" text is gone; unavailable levels are just disabled).
- Number boxes show only the number (no "questions" caption); "Max available" option removed; "All" has no caption. Boxes are smaller and fit one line (levels wrap only under 480px). Applies to every place using countChoiceHTML/questionCountOptions (practice, games, IBA, mistakes exam).
- Home "Your learning rhythm": chart animates on reveal (line draws, area fades in, points pop one by one, today's point pulses, soft shine sweep). Reduced-motion = static.
- countChoiceHTML(id,opts,val,label,cls) got optional label/class args. Cache-bust ?v=2.48.
