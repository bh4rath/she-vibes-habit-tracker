import { computeStreak } from '../utils/streaks';

export default function StreakCards({ habits, logs }) {
  return (
    <section className="card">
      <h2>Current Streaks</h2>
      <div className="streak-grid">
        {habits.map((habit) => {
          const streak = computeStreak(habit.id, logs);
          return (
            <div key={habit.id} className="streak-card">
              <span className="streak-emoji">{habit.emoji}</span>
              <span className="streak-name">{habit.name}</span>
              <span className="streak-count">{streak}</span>
              <span className="streak-label">day{streak !== 1 ? 's' : ''}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
