import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

const FORMATS = [
  { id: 'print', label: 'Print', emoji: '📖', desc: 'Gedrucktes Buch' },
  { id: 'ebook', label: 'E-Book', emoji: '📱', desc: 'Digital lesen' },
  { id: 'audiobook', label: 'Hörbuch', emoji: '🎧', desc: 'Zuhören & genießen' },
];

export function Format() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const finish = () => {
    if (!selected) return;
    localStorage.setItem('prefs_format', selected);
    localStorage.setItem('onboardingDone', 'true');
    navigate('/');
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
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-black' : 'bg-gray-200'}`} />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-1">In welchem Format liest du?</h2>
        <p className="text-gray-500 text-sm">Wähle dein bevorzugtes Leseformat</p>
      </motion.div>

      <div className="flex-1 space-y-4">
        {FORMATS.map((f, i) => {
          const active = selected === f.id;
          return (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(f.id)}
              className={`w-full rounded-3xl p-6 text-left transition-all border-2 ${
                active
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">{f.emoji}</div>
              <div className="font-bold text-xl mb-1">{f.label}</div>
              <div className={`text-sm ${active ? 'text-gray-300' : 'text-gray-500'}`}>{f.desc}</div>
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4">
        <button
          onClick={finish}
          disabled={!selected}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            selected
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Loslegen 🚀
        </button>
      </div>
    </div>
  );
}
