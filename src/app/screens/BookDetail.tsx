import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { mockBooks, Book } from '../data/books';

function StarRating({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <span className={`text-yellow-400 ${cls}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>{i <= Math.round(value) ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

function CriteriaRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <StarRating value={value} size="sm" />
    </div>
  );
}

function SimilarBook({ book }: { book: Book }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/book/${book.id}`)}
      className="flex-none w-24 text-left"
    >
      <div className="w-24 h-32 rounded-xl overflow-hidden bg-gray-100 mb-1">
        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <p className="text-xs font-medium line-clamp-2 leading-tight">{book.title}</p>
    </button>
  );
}

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = mockBooks.find(b => b.id === id);
  if (!book) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-3">
        <p className="text-gray-500">Buch nicht gefunden.</p>
        <button onClick={() => navigate(-1)} className="text-sm text-blue-500 underline">Zurück</button>
      </div>
    );
  }

  const similarBooks = mockBooks.filter(
    b => b.id !== book.id && (
      b.genreTags.some(t => book.genreTags.includes(t)) ||
      b.moodTags.some(t => book.moodTags.includes(t))
    )
  ).slice(0, 5);

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm flex items-center px-4 py-3 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="ml-3 font-semibold text-sm line-clamp-1 flex-1">{book.title}</span>
      </div>

      {/* Cover */}
      <div className="w-full h-64 overflow-hidden relative bg-gray-900">
        {/* Blurred Spotify-style background */}
        <img
          src={book.coverUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl brightness-[0.55] saturate-[1.8]"
        />
        {/* DIN A4 book cover centered */}
        <div className="absolute inset-0 flex items-center justify-center py-4">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-auto max-w-[45%] object-contain shadow-[0_16px_48px_rgba(0,0,0,0.6)] rounded-[2px]"
          />
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Title + Author */}
        <div>
          <div className="flex items-start gap-2 mb-1">
            <h1 className="text-2xl font-bold flex-1">{book.title}</h1>
            {book.sponsored && (
              <span className="text-[10px] font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full whitespace-nowrap mt-1">
                Sponsored
              </span>
            )}
          </div>
          <p className="text-gray-500">{book.author}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {book.genreTags.map(t => (
            <span key={t} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">#{t}</span>
          ))}
          {book.moodTags.map(t => (
            <span key={t} className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">#{t}</span>
          ))}
        </div>

        {/* Match Score */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="font-bold text-lg text-purple-700">{book.matchScore}% Match</p>
            <p className="text-xs text-gray-500">basierend auf deinem Geschmack</p>
          </div>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <StarRating value={book.averageRating} />
            <span className="text-sm text-gray-500 font-medium">{book.averageRating.toFixed(1)}</span>
          </div>
          <span className="text-orange-500 font-semibold">🔥 {book.bookTokScore}% BookTok</span>
        </div>

        <hr className="border-gray-100" />

        {/* Synopsis */}
        <div>
          <h2 className="font-semibold mb-2">Klappentext</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{book.synopsis}</p>
        </div>

        <hr className="border-gray-100" />

        {/* Criteria */}
        <div>
          <h2 className="font-semibold mb-1">Bewertungskriterien</h2>
          <CriteriaRow label="Spannung" value={book.criteria.spannung} />
          <CriteriaRow label="Charaktertiefe" value={book.criteria.charaktertiefe} />
          <CriteriaRow label="Schreibstil" value={book.criteria.schreibstil} />
          <CriteriaRow label="Originalität" value={book.criteria.originalitaet} />
          <CriteriaRow label="Emotionale Wirkung" value={book.criteria.emotionaleWirkung} />
        </div>

        <hr className="border-gray-100" />

        {/* Price + Buy Buttons */}
        <div>
          <p className="text-2xl font-bold mb-3">{book.price}</p>
          <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 mb-2 hover:bg-green-700 transition-colors">
            <ExternalLink size={16} />
            Bei Bookshop.org kaufen
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors">
              Thalia
            </button>
            <button className="py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors">
              Amazon
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Reviews */}
        <div>
          <h2 className="font-semibold mb-3">Rezensionen</h2>
          <div className="space-y-3">
            {book.reviews.map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{r.username}</span>
                  <StarRating value={r.stars} size="sm" />
                </div>
                <p className="text-sm text-gray-600 italic">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Books */}
        {similarBooks.length > 0 && (
          <>
            <hr className="border-gray-100" />
            <div>
              <h2 className="font-semibold mb-3">Ähnliche Bücher</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {similarBooks.map(b => (
                  <SimilarBook key={b.id} book={b} />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
}
