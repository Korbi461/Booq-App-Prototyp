import { motion, useMotionValue, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { Book } from '../data/books';

interface SwipeCardProps {
  book: Book;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-yellow-400 text-sm tracking-tight">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>{i <= Math.round(value) ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

export function SwipeCard({ book, onSwipe }: SwipeCardProps) {
  const navigate = useNavigate();
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const hasDragged = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-250, -120, 0, 120, 250], [0, 1, 1, 1, 0]);

  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const discardOpacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragStart = (_: unknown, info: { point: { x: number; y: number } }) => {
    dragStartX.current = info.point.x;
    dragStartY.current = info.point.y;
    hasDragged.current = false;
  };

  const handleDrag = (_: unknown, info: { offset: { x: number; y: number } }) => {
    if (Math.abs(info.offset.x) > 8 || Math.abs(info.offset.y) > 8) {
      hasDragged.current = true;
    }
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const { x: ox, y: oy } = info.offset;

    if (ox > 100) {
      x.set(500);
      onSwipe('right');
    } else if (ox < -100) {
      x.set(-500);
      onSwipe('left');
    }
  };

  const handleClick = () => {
    if (!hasDragged.current) {
      navigate(`/book/${book.id}`);
    }
  };

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      <div className="relative w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Book Cover */}
        <div className="h-[58%] overflow-hidden relative bg-gray-900">
          {/* Blurred Spotify-style background */}
          <img
            src={book.coverUrl}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl brightness-[0.55] saturate-[1.8]"
          />
          {/* DIN A4 book cover centered */}
          <div className="absolute inset-0 flex items-center justify-center py-3">
            <img
              src={book.coverUrl}
              alt={book.title}
              draggable={false}
              className="h-full w-auto max-w-[58%] object-contain shadow-[0_12px_40px_rgba(0,0,0,0.5)] rounded-[2px]"
            />
          </div>
          {/* Sponsored badge */}
          {book.sponsored && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
              Sponsored · Indie Verlag
            </div>
          )}
        </div>

        {/* Discard overlay */}
        <motion.div
          style={{ opacity: discardOpacity }}
          className="absolute inset-0 bg-red-500/80 pointer-events-none flex items-center justify-center"
        >
          <div className="text-white font-bold text-5xl -rotate-12 border-4 border-white px-6 py-3 rounded-2xl">
            SKIP ✗
          </div>
        </motion.div>

        {/* Like overlay */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute inset-0 bg-green-500/80 pointer-events-none flex items-center justify-center"
        >
          <div className="text-white font-bold text-5xl rotate-12 border-4 border-white px-6 py-3 rounded-2xl">
            LIKE ✓
          </div>
        </motion.div>

        {/* Book info */}
        <div className="h-[42%] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight line-clamp-1">{book.title}</h3>
                <p className="text-gray-500 text-sm">{book.author}</p>
              </div>
              <span className="text-base font-bold text-gray-800 whitespace-nowrap">{book.price}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {book.genreTags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
              {book.moodTags.map(tag => (
                <span key={tag} className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Rating + BookTok */}
            <div className="flex items-center gap-3">
              <StarRating value={book.averageRating} />
              <span className="text-xs text-gray-500">{book.averageRating.toFixed(1)}</span>
              <span className="text-xs font-semibold text-orange-500">🔥 {book.bookTokScore}%</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-right">Tippe für Details →</p>
        </div>
      </div>
    </motion.div>
  );
}
