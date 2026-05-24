import { useState } from 'react';

const EMOJI_OPTIONS = ['🚶', '💧', '🏃', '🧘', '📚', '🥗', '😴', '💪', '🧹', '✍️'];

export default function HabitEditor({ habits, onSave, onClose }) {
  const [list, setList] = useState(habits.map((h) => ({ ...h })));
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('⭐');

  function updateName(id, name) {
    setList(list.map((h) => (h.id === id ? { ...h, name } : h)));
  }

  function updateEmoji(id, emoji) {
    setList(list.map((h) => (h.id === id ? { ...h, emoji } : h)));
  }

  function removeHabit(id) {
    setList(list.filter((h) => h.id !== id));
  }

  function addHabit() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setList([...list, { id: `habit_${Date.now()}`, name: trimmed, emoji: newEmoji }]);
    setNewName('');
    setNewEmoji('⭐');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Manage Habits</h2>

        <div className="habit-edit-list">
          {list.map((h) => (
            <div key={h.id} className="habit-edit-row">
              <select
                value={h.emoji}
                onChange={(e) => updateEmoji(h.id, e.target.value)}
                className="emoji-select"
              >
                {EMOJI_OPTIONS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <input
                className="habit-name-input"
                value={h.name}
                onChange={(e) => updateName(h.id, e.target.value)}
                placeholder="Habit name"
              />
              <button className="btn-danger" onClick={() => removeHabit(h.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="add-habit-row">
          <select
            value={newEmoji}
            onChange={(e) => setNewEmoji(e.target.value)}
            className="emoji-select"
          >
            {EMOJI_OPTIONS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <input
            className="habit-name-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            placeholder="New habit name…"
          />
          <button className="btn-secondary" onClick={addHabit}>Add</button>
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onSave(list)}>Save</button>
        </div>
      </div>
    </div>
  );
}
