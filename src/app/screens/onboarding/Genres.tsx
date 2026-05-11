import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

const GENRES = [
  { label: 'Thriller', emoji: '🔪' },
  { label: 'Fantasy', emoji: '🧙' },
  { label: 'Romance', emoji: '💕' },
  { label: 'Horror', emoji: '👻' },
  { label: 'Sci-Fi', emoji: '🚀' },
  { label: 'Sachbuch', emoji: '📊' },
  { label: 'Literatur', emoji: '✍️' },
  { label: 'Historical Fiction', emoji: '🏛️' },
];

export function Genres() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (g: string) =>
    setSelected(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const next = () => {
    if (selected.length < 3) return;
    localStorage.setItem('prefs_genres', JSON.stringify(selected));
    navigate('/onboarding/moods');
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
            <div key={i} className={`h-1 flex-1 rounded-full ${i === 0 ? 'bg-black' : 'bg-gray-200'}`} />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-1">Was liest du gerne?</h2>
        <p className="text-gray-500 text-sm">Wähle mindestens 3 Genres</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {GENRES.map((g, i) => {
          const active = selected.includes(g.label);
          return (
            <motion.button
              key={g.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(g.label)}
              className={`rounded-2xl p-4 text-left transition-all border-2 ${
                active
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{g.emoji}</div>
              <div className="font-semibold text-sm">{g.label}</div>
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4">
        <button
          onClick={next}
          disabled={selected.length < 3}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            selected.length >= 3
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selected.length >= 3 ? 'Weiter' : `Noch ${3 - selected.length} auswählen`}
        </button>
      </div>
    </div>
  );
}
