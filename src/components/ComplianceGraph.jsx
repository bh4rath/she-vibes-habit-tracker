import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { buildWeeklyChartData } from '../utils/streaks';

const COLORS = ['#a78bfa', '#34d399', '#f472b6', '#60a5fa', '#fb923c'];

export default function ComplianceGraph({ habits, logs }) {
  const data = buildWeeklyChartData(habits, logs, 12);

  return (
    <section className="card">
      <h2>Weekly Compliance Trend</h2>
      <p className="chart-subtitle">Last 12 weeks — % of days completed</p>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d3a" />
            <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{ background: '#1e1e2e', border: '1px solid #3d3d50', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(val) => [`${val}%`]}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12 }} />
            {habits.map((h, i) => (
              <Line
                key={h.id}
                type="monotone"
                dataKey={h.name}
                stroke={COLORS[i % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
