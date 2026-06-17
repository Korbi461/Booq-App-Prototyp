import { useState, useEffect } from 'react';
import { Book } from '../data/books';
import { ChevronRight, Bell, Shield, LogOut } from 'lucide-react';
import { storageGet, storageSet } from '../utils/storage';

export function Profile() {
  const [shelfBooks, setShelfBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [format, setFormat] = useState<string>('');
  const [notifications, setNotifications] = useState(() =>
    storageGet<boolean>('pref_notifications', true)
  );

  useEffect(() => {
    setShelfBooks(storageGet<Book[]>('shelfBooks', []));
    setGenres(storageGet<string[]>('prefs_genres', []));
    setFormat(storageGet<string>('prefs_format', ''));
  }, []);

  const toggleNotifications = () => {
    setNotifications(n => {
      storageSet('pref_notifications', !n);
      return !n;
    });
  };

  const formatLabel: Record<string, string> = {
    print: '📖 Print',
    ebook: '📱 E-Book',
    audiobook: '🎧 Hörbuch',
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 pt-4 pb-32 space-y-5">

        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            L
          </div>
          <div>
            <h2 className="text-xl font-bold">lea.reads</h2>
            <p className="text-gray-500 text-sm">Bücherwurm & Thriller-Fan</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Likes', value: shelfBooks.length },
            { label: 'Shelves', value: 0 },
            { label: 'Follower', value: 0 },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-2xl p-3 text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wide">Präferenzen</h3>
          <div>
            <p className="text-xs text-gray-500 mb-2">Genres</p>
            <div className="flex flex-wrap gap-2">
              {genres.length > 0 ? genres.map(g => (
                <span key={g} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{g}</span>
              )) : (
                <span className="text-xs text-gray-400">Keine Genres gesetzt</span>
              )}
            </div>
          </div>
          {format && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Format</p>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {formatLabel[format] || format}
              </span>
            </div>
          )}
        </div>

        {/* Import */}
        <div className="bg-white rounded-2xl shadow-sm">
          <button
            onClick={() => alert('Goodreads Import: Coming soon 📚')}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors rounded-2xl"
          >
            <span className="text-sm font-medium">Goodreads Import</span>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Benachrichtigungen</span>
            </div>
            <button
              onClick={toggleNotifications}
              className={`w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-black' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <button className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Datenschutz</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-red-100 text-red-500 font-semibold hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Ausloggen
        </button>

      </div>
    </div>
  );
}
