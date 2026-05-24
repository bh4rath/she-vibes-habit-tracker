import { computeCompliance, dateStr } from '../utils/streaks';
import { startOfWeek, startOfMonth, startOfYear, endOfDay } from 'date-fns';

function getRanges() {
  const today = new Date();
  return {
    week: {
      label: 'This Week',
      start: dateStr(startOfWeek(today, { weekStartsOn: 1 })),
      end: dateStr(today),
    },
    month: {
      label: 'This Month',
      start: dateStr(startOfMonth(today)),
      end: dateStr(today),
    },
    year: {
      label: 'This Year',
      start: dateStr(startOfYear(today)),
      end: dateStr(today),
    },
  };
}

export default function ComplianceStats({ habits, logs }) {
  const ranges = getRanges();

  return (
    <section className="card">
      <h2>Compliance</h2>
      <div className="compliance-table-wrap">
        <table className="compliance-table">
          <thead>
            <tr>
              <th>Habit</th>
              {Object.values(ranges).map((r) => (
                <th key={r.label}>{r.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td className="habit-cell">
                  <span>{habit.emoji}</span> {habit.name}
                </td>
                {Object.values(ranges).map((r) => {
                  const pct = computeCompliance(habit.id, logs, r.start, r.end);
                  return (
                    <td key={r.label} className="pct-cell">
                      <span className={`pct-badge ${pct >= 80 ? 'high' : pct >= 50 ? 'mid' : 'low'}`}>
                        {pct}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
