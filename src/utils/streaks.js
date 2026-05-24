import { format, subDays, parseISO, isValid } from 'date-fns';

export function todayStr() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function dateStr(date) {
  return format(date, 'yyyy-MM-dd');
}

// Streak rule: missing 1 day is OK, missing 2+ consecutive days resets the streak.
// We walk backwards from today and count days where the habit was done OR only 1 consecutive day was missed.
export function computeStreak(habitId, logs) {
  let streak = 0;
  let consecutiveMisses = 0;
  let i = 0;

  while (true) {
    const day = dateStr(subDays(new Date(), i));
    const done = logs[day]?.[habitId] === true;

    if (done) {
      streak++;
      consecutiveMisses = 0;
    } else {
      consecutiveMisses++;
      if (consecutiveMisses >= 2) break;
      // 1 miss is forgiven — don't increment streak but keep going
    }

    // Safety: don't look back more than 1000 days
    if (i > 1000) break;
    i++;
  }

  return streak;
}

// Compliance % for a date range: (days done / total days in range) * 100
export function computeCompliance(habitId, logs, startDate, endDate) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  if (!isValid(start) || !isValid(end)) return 0;

  let total = 0;
  let done = 0;
  let current = start;

  while (current <= end) {
    const day = dateStr(current);
    total++;
    if (logs[day]?.[habitId] === true) done++;
    current = new Date(current.getTime() + 86400000);
  }

  return total === 0 ? 0 : Math.round((done / total) * 100);
}

// Build weekly compliance data points for the line chart (last N weeks)
export function buildWeeklyChartData(habits, logs, weeks = 12) {
  const points = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const endDate = subDays(new Date(), w * 7);
    const startDate = subDays(endDate, 6);
    const label = format(startDate, 'MMM d');
    const point = { week: label };
    habits.forEach((h) => {
      point[h.name] = computeCompliance(h.id, logs, dateStr(startDate), dateStr(endDate));
    });
    points.push(point);
  }
  return points;
}
