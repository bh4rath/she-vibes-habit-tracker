# ✨ She Vibes — Habit Tracker

A clean, minimal habit tracker built for people who want to stay consistent without the overwhelm. Check off your daily habits, watch your streaks grow, and see your compliance trends over time — all stored locally in your browser, no account needed.

---

## What It Does

She Vibes lets you track two daily habits out of the box — **Walking** 🚶 and **Drinking 5 litres of water** 💧 — and gives you a full picture of how consistent you're being.

### Daily Check-in
- Mark each habit as done (✅) or not done (❌) for today
- One tap to toggle — as simple as it gets

### Streak Tracking
- Your streak grows every day you complete a habit
- **Miss 1 day?** No problem — the streak is forgiven and keeps going
- **Miss 2 days in a row?** Streak resets to zero
- Each habit has its own independent streak counter

### Compliance Stats
- See your completion rate (%) for the **current week**, **month**, and **year**
- Colour-coded badges: green (≥80%), yellow (≥50%), red (<50%)

### Compliance Graph
- A line graph (powered by Recharts) showing your weekly compliance % over the last 12 weeks
- One line per habit so you can compare them at a glance

### Habit Editor
- Add new habits with a name and emoji
- Rename or delete existing habits anytime
- Changes take effect immediately

### Persistent Storage
- Everything is saved to `localStorage` — no backend, no account, no data leaves your device

---

## Who It's For

She Vibes is built for anyone who wants a **lightweight, private habit tracker** they can open in a browser tab and use straight away. No sign-up, no subscription, no noise — just your habits and your progress.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | UI framework and dev tooling |
| Recharts | Compliance line graph |
| date-fns | Date arithmetic (streaks, ranges) |
| localStorage | Persistent storage (no backend) |

---

## Running It Locally

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone the repo
git clone https://github.com/bh4rath/she-vibes-habit-tracker.git
cd she-vibes-habit-tracker

# 2. Switch to the feature branch
git checkout claude/magical-mayer-dgMUQ

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**To build for production:**

```bash
npm run build
# Output goes to the dist/ folder — host it anywhere (Vercel, Netlify, GitHub Pages)
```

---

## Project Structure

```
src/
├── App.jsx                    # Root component — state, localStorage sync
├── index.css                  # Global dark-mode styles
├── utils/
│   ├── storage.js             # Read/write helpers for localStorage
│   └── streaks.js             # Streak logic, compliance %, chart data
└── components/
    ├── DailyCheckin.jsx       # Today's ✅/❌ toggle buttons
    ├── StreakCards.jsx        # Current streak display per habit
    ├── ComplianceStats.jsx    # Week / month / year % table
    ├── ComplianceGraph.jsx    # 12-week line chart (Recharts)
    └── HabitEditor.jsx        # Add / rename / delete habits modal
```

---

## What's Coming Next

- [ ] **Notifications** — optional daily reminders via the Web Notifications API
- [ ] **Custom streak rules** — choose your own "grace period" (e.g. allow 2 misses instead of 1)
- [ ] **Habit categories** — group habits by area of life (health, mindset, productivity)
- [ ] **Calendar heatmap** — a GitHub-style view of your check-in history
- [ ] **Data export** — download your habit log as CSV or JSON
- [ ] **Multiple themes** — light mode and custom accent colours
- [ ] **PWA support** — install She Vibes as a home screen app on mobile

---

## Contributing

Got an idea or found a bug? Open an issue or submit a pull request — contributions are welcome.

---

*Built with love and good vibes.* ✨
