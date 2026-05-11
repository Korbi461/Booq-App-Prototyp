import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

const MOODS = [
  { label: 'Feel-Good', emoji: '😊', desc: 'Aufbauend & wohltuend' },
  { label: 'Dark Vibes', emoji: '🌑', desc: 'Dunkel & intensiv' },
  { label: 'Page-Turner', emoji: '⚡', desc: 'Kann nicht aufhören' },
  { label: 'Emotional', emoji: '😢', desc: 'Berührt & bewegt' },
  { label: 'Mind-Bending', emoji: '🌀', desc: 'Zum Nachdenken' },
];

export function Moods() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (m: string) =>
    setSelected(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  const next = () => {
    if (selected.length === 0) return;
    localStorage.setItem('prefs_moods', JSON.stringify(selected));
    navigate('/onboarding/format');
  };

  return (
    <div className="h-full flex flex-col px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex gap-1 mb-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 1 ? 'bg-black' : 'bg-gray-200'}`} />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-1">Wie soll es sich anfühlen?</h2>
        <p className="text-gray-500 text-sm">Wähle deine bevorzugten Moods</p>
      </motion.div>

      <div className="flex-1 space-y-3">
        {MOODS.map((m, i) => {
          const active = selected.includes(m.label);
          return (
            <motion.button
              key={m.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => toggle(m.label)}
              className={`w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all border-2 ${
                active
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <div>
                <div className="font-semibold">{m.label}</div>
                <div className={`text-xs ${active ? 'text-gray-300' : 'text-gray-500'}`}>{m.desc}</div>
              </div>
              {active && <span className="ml-auto text-white text-lg">✓</span>}
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4">
        <button
          onClick={next}
          disabled={selected.length === 0}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            selected.length > 0
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
