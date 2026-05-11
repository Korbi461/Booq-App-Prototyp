import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Book } from '../data/books';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { storageGet } from '../utils/storage';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="text-5xl mb-4">🤍</div>
      <h3 className="font-semibold text-gray-700 mb-1">Noch keine Likes</h3>
      <p className="text-gray-400 text-sm">Swipe rechts (✓), um Bücher zu liken.</p>
    </div>
  );
}

export function Bookshelf() {
  const navigate = useNavigate();
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);

  useEffect(() => {
    setLikedBooks(storageGet<Book[]>('shelfBooks', []));
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-2 pb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Meine Likes</h2>
        <button
          disabled
          className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1.5 rounded-full cursor-not-allowed"
        >
          <Plus size={13} />
          Shelf erstellen
        </button>
      </div>

      {/* Books */}
      <div className="flex-1 overflow-y-auto px-6">
        {likedBooks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-32">
            {likedBooks.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer active:scale-95 transition-transform"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className="aspect-[3/4] overflow-hidden relative bg-gray-900">
                  <img
                    src={book.coverUrl}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover blur-xl brightness-50 saturate-150 scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-auto max-w-[75%] object-contain shadow-lg rounded-[1px]"
                    />
                  </div>
                  {book.sponsored && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                      Sponsored
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm line-clamp-1 mb-0.5">{book.title}</h4>
                  <p className="text-gray-500 text-xs mb-2">{book.author}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(book.averageRating))}</span>
                    <span className="text-xs text-gray-400 ml-1">{book.averageRating.toFixed(1)}</span>
                    <span className="text-xs text-orange-500 font-medium ml-auto">🔥 {book.bookTokScore}%</span>
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
