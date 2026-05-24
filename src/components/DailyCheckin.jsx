import { todayStr } from '../utils/streaks';

export default function DailyCheckin({ habits, logs, onToggle }) {
  const today = todayStr();

  return (
    <section className="card">
      <h2>Today's Check-in</h2>
      <p className="date-label">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div className="checkin-list">
        {habits.map((habit) => {
          const done = logs[today]?.[habit.id] === true;
          return (
            <button
              key={habit.id}
              className={`checkin-btn ${done ? 'done' : 'undone'}`}
              onClick={() => onToggle(habit.id)}
              aria-label={`Toggle ${habit.name}`}
            >
              <span className="habit-emoji">{habit.emoji}</span>
              <span className="habit-name">{habit.name}</span>
              <span className="habit-status">{done ? '✅' : '❌'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
