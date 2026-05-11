import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { mockBooks } from '../data/books';
import { ChevronRight, Plus, Search } from 'lucide-react';

const challenges = [
  { title: 'Sommer-Leseabenteuer', emoji: '☀️', current: 2, total: 5, color: 'from-yellow-400 to-orange-400' },
  { title: 'Thriller-Marathon', emoji: '🔪', current: 1, total: 3, color: 'from-gray-700 to-gray-900' },
];

const badges = [
  { label: 'Genre Hopper', emoji: '🏆', color: 'bg-yellow-50 text-yellow-700' },
  { label: 'Night Reader', emoji: '🌙', color: 'bg-indigo-50 text-indigo-700' },
  { label: 'Page Turner', emoji: '⚡', color: 'bg-green-50 text-green-700' },
  { label: 'First Swipe', emoji: '✨', color: 'bg-purple-50 text-purple-700' },
];

// Cover IDs per shelf for preview strip
const shelfCovers: Record<string, string[]> = {
  'dark-twisted': ['book-1', 'book-4', 'book-5', 'book-10'],
  'cozy-autumn':  ['book-6', 'book-3', 'book-8'],
  'worlds-escape': ['book-2', 'book-9', 'book-7'],
};

// Sorted descending by book count
const shelves = [
  {
    id: 'worlds-escape',
    username: 'fantasy.finja',
    shelf: 'Worlds to Escape To',
    books: 21,
    followers: 512,
    avatar: 'F',
    gradient: 'from-purple-400 to-indigo-500',
    navigable: false,
  },
  {
    id: 'cozy-autumn',
    username: 'lea.pageturn',
    shelf: 'Cozy Autumn Reads',
    books: 12,
    followers: 247,
    avatar: 'L',
    gradient: 'from-orange-300 to-pink-400',
    navigable: false,
  },
  {
    id: 'dark-twisted',
    username: 'thriller.max',
    shelf: 'Dark & Twisted',
    books: 8,
    followers: 189,
    avatar: 'M',
    gradient: 'from-gray-600 to-gray-900',
    navigable: true,
  },
];

function CoverStrip({ bookIds }: { bookIds: string[] }) {
  const covers = bookIds
    .map(id => mockBooks.find(b => b.id === id))
    .filter(Boolean) as typeof mockBooks;

  return (
    <div className="flex mb-4">
      {covers.map((book, i) => (
        <div
          key={book.id}
          className="w-10 h-14 rounded-lg overflow-hidden border-[2px] border-white shadow-md flex-none"
          style={{ marginLeft: i === 0 ? 0 : -8, zIndex: covers.length - i }}
        >
          <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export function Community() {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 pt-2 pb-32 space-y-6">

        {/* Reading Challenges */}
        <section>
          <h2 className="font-bold text-lg mb-3">Reading Challenges</h2>
          <div className="space-y-3">
            {challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.emoji}</span>
                    <span className="font-semibold text-sm">{c.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{c.current}/{c.total} Bücher</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${c.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(c.current / c.total) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="font-bold text-lg mb-3">Deine Badges</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`flex-none flex flex-col items-center gap-1.5 ${b.color} rounded-2xl px-4 py-3 min-w-[80px]`}
              >
                <span className="text-2xl">{b.emoji}</span>
                <span className="text-xs font-semibold text-center leading-tight">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Public Shelves – sorted by book count */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Öffentliche Shelves</h2>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1.5 rounded-full cursor-not-allowed"
              >
                <Plus size={13} />
                Shelf erstellen
              </button>
              <button
                disabled
                className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1.5 rounded-full cursor-not-allowed"
              >
                <Search size={13} />
                Shelves suchen
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {shelves.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl shadow-sm overflow-hidden ${s.navigable ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
                onClick={s.navigable ? () => navigate('/shelf/dark-twisted') : undefined}
              >
                <div className="bg-white p-4">
                  {/* Cover strip */}
                  <CoverStrip bookIds={shelfCovers[s.id]} />

                  {/* Meta row */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white font-bold flex-none`}>
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">@{s.username}</p>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm">{s.shelf}</p>
                        {s.navigable && <ChevronRight size={14} className="text-gray-400" />}
                      </div>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-xs text-gray-400">📚 {s.books} Bücher</span>
                        <span className="text-xs text-gray-400">👥 {s.followers} Follower</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (s.navigable) navigate('/shelf/dark-twisted');
                    }}
                    className={`mt-3 w-full py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                      s.navigable
                        ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Shelf durchstöbern {s.navigable ? '→' : ''}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
