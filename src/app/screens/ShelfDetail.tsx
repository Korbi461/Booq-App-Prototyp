import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Users, BookOpen, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockBooks, Book } from '../data/books';

const DARK_BOOK_IDS = ['book-1', 'book-4', 'book-5', 'book-10', 'book-7', 'book-3', 'book-8', 'book-9'];

const SHELF_META = {
  username: 'thriller.max',
  avatar: 'M',
  title: 'Dark & Twisted',
  description: 'Die besten Bücher für dunkle Nächte und kalte Tage. Nichts für schwache Nerven.',
  books: 8,
  followers: 189,
  avatarGradient: 'from-gray-600 to-gray-900',
};

interface ReviewEntry {
  book: Book;
  username: string;
  stars: number;
  text: string;
}

function StarRow({ value }: { value: number }) {
  return (
    <span className="text-yellow-400 text-xs">
      {'★'.repeat(value)}{'☆'.repeat(5 - value)}
    </span>
  );
}

function AllBooksModal({ books, onClose }: { books: Book[]; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-none">
        <h2 className="font-bold text-base">Alle Bücher · Dark & Twisted</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/book/${book.id}`)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer active:scale-95 transition-transform border border-gray-100"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-900">
                <img src={book.coverUrl} alt="" aria-hidden
                  className="absolute inset-0 w-full h-full object-cover blur-xl brightness-50 saturate-150 scale-110" />
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <img src={book.coverUrl} alt={book.title}
                    className="h-full w-auto max-w-[75%] object-contain shadow-lg rounded-[1px]" />
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm line-clamp-1 mb-0.5">{book.title}</h4>
                <p className="text-gray-500 text-xs">{book.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ShelfDetail() {
  const navigate = useNavigate();
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [comment, setComment] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const shelfBooks = DARK_BOOK_IDS
    .map(id => mockBooks.find(b => b.id === id))
    .filter((b): b is typeof mockBooks[number] => b !== undefined);

  const allReviews: ReviewEntry[] = shelfBooks.flatMap(book =>
    book.reviews.map(r => ({ book, ...r }))
  );

  return (
    <div className="h-full flex flex-col overflow-hidden relative">

      {/* Hero Header */}
      <div className="relative overflow-hidden flex-none">
        <div className="absolute inset-0">
          <img src={shelfBooks[0]?.coverUrl} alt="" aria-hidden
            className="w-full h-full object-cover scale-110 blur-2xl brightness-[0.3] saturate-[1.6]" />
        </div>

        <div className="relative z-10 px-5 pt-5 pb-5">
          {/* Back */}
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 hover:bg-white/25 transition-colors">
            <ArrowLeft size={18} className="text-white" />
          </button>

          {/* Avatar + Username */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${SHELF_META.avatarGradient} flex items-center justify-center text-white font-bold text-xs border border-white/30`}>
              {SHELF_META.avatar}
            </div>
            <span className="text-white/70 text-xs font-medium">@{SHELF_META.username}</span>
          </div>

          <h1 className="text-white text-2xl font-bold leading-tight mb-1">{SHELF_META.title}</h1>
          <p className="text-white/55 text-xs leading-relaxed mb-4 max-w-xs">{SHELF_META.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-white/70">
              <BookOpen size={13} />
              <span className="text-xs font-medium">{SHELF_META.books} Bücher</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70">
              <Users size={13} />
              <span className="text-xs font-medium">{SHELF_META.followers} Follower</span>
            </div>
          </div>

          {/* Cover strip + "Alle anzeigen" */}
          <div className="flex items-center gap-3">
            <div className="flex items-end">
              {shelfBooks.slice(0, 5).map((book, i) => (
                <div key={book.id}
                  className="w-10 h-14 rounded-lg overflow-hidden border-[2px] border-gray-900 shadow-xl flex-none"
                  style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 5 - i }}>
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>
              ))}
              <button
                onClick={() => setShowAllBooks(true)}
                className="w-10 h-14 rounded-lg bg-white/25 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold border-[2px] border-gray-900 flex-none hover:bg-white/35 transition-colors"
                style={{ marginLeft: -8 }}
              >
                +{Math.max(0, shelfBooks.length - 5)}
              </button>
            </div>
            <button
              onClick={() => setShowAllBooks(true)}
              className="text-white/80 text-xs font-semibold underline underline-offset-2 hover:text-white transition-colors"
            >
              Alle anzeigen
            </button>
          </div>
        </div>
      </div>

      {/* Community / Reviews */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-5 pt-4 pb-36 space-y-3">
          <h2 className="font-bold text-base text-gray-800">Community · {allReviews.length} Rezensionen</h2>

          {allReviews.map((entry, i) => (
            <motion.div
              key={`${entry.book.id}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-2xl p-3 shadow-sm flex gap-3"
            >
              {/* Book cover thumbnail */}
              <button
                onClick={() => navigate(`/book/${entry.book.id}`)}
                className="flex-none w-12 h-16 rounded-lg overflow-hidden bg-gray-900 relative active:scale-95 transition-transform"
              >
                <img src={entry.book.coverUrl} alt="" aria-hidden
                  className="absolute inset-0 w-full h-full object-cover blur-md brightness-50 scale-110" />
                <div className="absolute inset-0 flex items-center justify-center p-0.5">
                  <img src={entry.book.coverUrl} alt={entry.book.title}
                    className="h-full w-auto object-contain rounded-[1px]" />
                </div>
              </button>

              {/* Review content */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-medium line-clamp-1 mb-0.5">{entry.book.title}</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-800">{entry.username}</span>
                  <StarRow value={entry.stars} />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">"{entry.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instagram-style comment bar — fixed above BottomNav */}
      <div className="absolute bottom-[88px] left-4 right-4 bg-white rounded-2xl px-3 py-2.5 flex items-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xs flex-none">
          L
        </div>
        {/* Input */}
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
          <input
            ref={inputRef}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Kommentar hinzufügen…"
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400 min-w-0"
          />
          {comment.trim() && (
            <button
              onClick={() => setComment('')}
              className="flex-none"
            >
              <Send size={16} className="text-black" />
            </button>
          )}
        </div>
      </div>

      {/* All Books Modal */}
      <AnimatePresence>
        {showAllBooks && (
          <AllBooksModal books={shelfBooks} onClose={() => setShowAllBooks(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
