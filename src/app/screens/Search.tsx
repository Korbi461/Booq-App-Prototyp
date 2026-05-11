import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { SearchIcon, ScanLine } from 'lucide-react';
import { mockBooks } from '../data/books';
import { motion } from 'motion/react';

const ALL_GENRES = ['Alle', 'Thriller', 'Fantasy', 'Horror', 'Sci-Fi', 'Romance', 'Drama', 'Mystery', 'Historical Fiction', 'Contemporary'];

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('Alle');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return mockBooks.filter(b => {
      const matchesQuery = !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      const matchesGenre = activeGenre === 'Alle' ||
        b.genreTags.some(t => t.toLowerCase().includes(activeGenre.toLowerCase()));
      return matchesQuery && matchesGenre;
    });
  }, [query, activeGenre]);

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="px-4 pt-2 pb-3 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-3">
            <SearchIcon size={18} className="text-gray-400 flex-none" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Titel oder Autor suchen…"
              className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => alert('ISBN-Scan: Coming soon 📷')}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 rounded-2xl text-gray-500 text-xs font-medium whitespace-nowrap hover:bg-gray-200 transition-colors"
          >
            <ScanLine size={16} />
            ISBN
          </button>
        </div>

        {/* Genre chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {ALL_GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`flex-none text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                activeGenre === genre
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4">
        {!query && activeGenre === 'Alle' ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-sm">Suche nach Titel oder Autor</p>
          </div>
        ) : results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-16">
            <div className="text-5xl mb-4">😕</div>
            <p className="text-gray-500 text-sm">Keine Bücher gefunden</p>
          </div>
        ) : (
          <div className="space-y-3 pb-32">
            {results.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/book/${book.id}`)}
                className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="w-16 h-24 flex-none rounded-xl overflow-hidden bg-gray-100">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h4 className="font-semibold text-sm line-clamp-1 mb-0.5">{book.title}</h4>
                  <p className="text-gray-500 text-xs mb-2">{book.author}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {book.genreTags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{t}</span>
                    ))}
                    {book.moodTags.slice(0, 1).map(t => (
                      <span key={t} className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">#{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(book.averageRating))}</span>
                    <span className="text-xs text-orange-500 font-medium">🔥 {book.bookTokScore}%</span>
                    <span className="text-xs text-gray-700 font-semibold ml-auto">{book.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
