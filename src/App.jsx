import { useState, useCallback } from 'react';
import { loadHabits, saveHabits, loadLogs, saveLogs } from './utils/storage';
import { todayStr } from './utils/streaks';
import DailyCheckin from './components/DailyCheckin';
import StreakCards from './components/StreakCards';
import ComplianceStats from './components/ComplianceStats';
import ComplianceGraph from './components/ComplianceGraph';
import HabitEditor from './components/HabitEditor';

const DEFAULT_HABITS = [
  { id: 'walking', name: 'Walking', emoji: '🚶' },
  { id: 'water', name: 'Drink 5L Water', emoji: '💧' },
];

function initHabits() {
  return loadHabits() ?? DEFAULT_HABITS;
}

export default function App() {
  const [habits, setHabits] = useState(initHabits);
  const [logs, setLogs] = useState(loadLogs);
  const [showEditor, setShowEditor] = useState(false);

  const toggleHabit = useCallback((habitId) => {
    const today = todayStr();
    setLogs((prev) => {
      const dayLog = prev[today] ?? {};
      const updated = {
        ...prev,
        [today]: { ...dayLog, [habitId]: !dayLog[habitId] },
      };
      saveLogs(updated);
      return updated;
    });
  }, []);

  const handleSaveHabits = useCallback((updated) => {
    setHabits(updated);
    saveHabits(updated);
    setShowEditor(false);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-icon">✨</span>
            <h1>She Vibes</h1>
          </div>
          <button className="btn-primary" onClick={() => setShowEditor(true)}>
            Edit Habits
          </button>
        </div>
      </header>

      <main className="app-main">
        <DailyCheckin habits={habits} logs={logs} onToggle={toggleHabit} />
        <StreakCards habits={habits} logs={logs} />
        <ComplianceStats habits={habits} logs={logs} />
        <ComplianceGraph habits={habits} logs={logs} />
      </main>

      {showEditor && (
        <HabitEditor
          habits={habits}
          onSave={handleSaveHabits}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
