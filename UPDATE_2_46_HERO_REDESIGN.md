# v2.46 — Hero rethought
- Dashboard hero replaced by `.hero2`: a personal "today" hero instead of a generic marketing banner.
  - Left: time-based greeting (+ first name if set), a headline that changes with your state (N words ready to revise / Ready for today's words? / Let's build your vocabulary), one primary CTA "Start today's session", one smart secondary CTA (Revise N words when due, otherwise Play word arcade), quick links incl. "N mistakes to fix" when any.
  - Right: live "Today" panel: animated daily-goal ring, animated streak / revise / mastered chips (reuse the v2.43 icons), level name + XP to next level with progress bar.
  - Background: drifting colour blobs, soft grid, rising dots. Dark in both themes. Reduced-motion = static.
- script.js: V.dash hero markup; hmScan now also runs when `.hero2` exists. style.css: new block at the end. Old `.hero` CSS left in place (unused).
- Cache-bust bumped to ?v=2.46.
