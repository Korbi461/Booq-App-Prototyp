import { useState, useRef } from 'react';
import { SwipeCard } from '../components/SwipeCard';
import { mockBooks, Book } from '../data/books';
import { X, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { storageGet, storageSet } from '../utils/storage';

function saveToStorage(key: string, book: Book) {
  const stored = storageGet<Book[]>(key, []);
  if (!stored.find(b => b.id === book.id)) {
    storageSet(key, [...stored, book]);
  }
}

export function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiping = useRef(false);

  const idx = currentIndex % mockBooks.length;
  const currentBook = mockBooks[idx];

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (swiping.current) return;
    swiping.current = true;

    if (direction === 'right') saveToStorage('shelfBooks', currentBook);
    if (direction === 'up')    saveToStorage('wishlistBooks', currentBook);

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      swiping.current = false;
    }, 300);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative px-4 pt-4 pb-36 min-h-0">
        <div className="relative h-full max-w-md mx-auto">
          {/* Background card hint */}
          <div className="absolute w-full h-full flex items-start justify-center">
            <div className="w-full h-full bg-white rounded-3xl shadow-md transform scale-95 opacity-40" />
          </div>

          <SwipeCard
            key={currentIndex}
            book={currentBook}
            onSwipe={handleSwipe}
          />

          {/* Action Buttons */}
          <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-10 z-10">
            <div className="flex flex-col items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe('left')}
                className="w-14 h-14 rounded-full bg-red-500 shadow-xl flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X size={28} strokeWidth={3} />
              </motion.button>
              <span className="text-xs text-gray-400 font-medium">Skip</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe('right')}
                className="w-14 h-14 rounded-full bg-green-500 shadow-xl flex items-center justify-center text-white hover:bg-green-600 transition-colors"
              >
                <Check size={28} strokeWidth={3} />
              </motion.button>
              <span className="text-xs text-gray-400 font-medium">Like</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
