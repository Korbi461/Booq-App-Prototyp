import { createHashRouter, Link, Navigate } from 'react-router';
import { User } from 'lucide-react';
import { storageGet } from './utils/storage';
import { Discover } from './screens/Discover';
import { Bookshelf } from './screens/Bookshelf';
import { Search } from './screens/Search';
import { Community } from './screens/Community';
import { Profile } from './screens/Profile';
import { BookDetail } from './screens/BookDetail';
import { ShelfDetail } from './screens/ShelfDetail';
import { Welcome } from './screens/onboarding/Welcome';
import { Genres } from './screens/onboarding/Genres';
import { Moods } from './screens/onboarding/Moods';
import { Format } from './screens/onboarding/Format';
import { BottomNav } from './components/BottomNav';

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const done = storageGet<string | null>('onboardingDone', null);
  return done ? <>{children}</> : <Navigate to="/onboarding/welcome" replace />;
}

function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-white max-w-lg mx-auto">
      <div className="text-5xl mb-4">📖</div>
      <h2 className="text-xl font-bold mb-2">Seite nicht gefunden</h2>
      <p className="text-gray-500 text-sm mb-6">Diese Seite existiert nicht.</p>
      <Link to="/" className="px-6 py-3 bg-black text-white rounded-2xl font-semibold text-sm hover:bg-gray-800 transition-colors">
        Zurück zur App
      </Link>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <header className="flex-none px-6 pt-6 pb-2 flex justify-between items-center max-w-lg mx-auto w-full">
        <div>
          <Link to="/" className="block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent leading-none mb-1">
              booq
            </h1>
          </Link>
          <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Your next great read</p>
        </div>
        <Link
          to="/profile"
          className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-black hover:bg-gray-50 transition-colors"
        >
          <User size={20} strokeWidth={2} />
        </Link>
      </header>

      <main className="flex-1 overflow-hidden relative max-w-lg mx-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

function FullscreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-white max-w-lg mx-auto">
      {children}
    </div>
  );
}

export const router = createHashRouter([
  {
    path: '/onboarding/welcome',
    element: <FullscreenLayout><Welcome /></FullscreenLayout>,
  },
  {
    path: '/onboarding/genres',
    element: <FullscreenLayout><Genres /></FullscreenLayout>,
  },
  {
    path: '/onboarding/moods',
    element: <FullscreenLayout><Moods /></FullscreenLayout>,
  },
  {
    path: '/onboarding/format',
    element: <FullscreenLayout><Format /></FullscreenLayout>,
  },
  {
    path: '/',
    element: <RequireOnboarding><Layout><Discover /></Layout></RequireOnboarding>,
  },
  {
    path: '/search',
    element: <RequireOnboarding><Layout><Search /></Layout></RequireOnboarding>,
  },
  {
    path: '/bookshelf',
    element: <RequireOnboarding><Layout><Bookshelf /></Layout></RequireOnboarding>,
  },
  {
    path: '/community',
    element: <RequireOnboarding><Layout><Community /></Layout></RequireOnboarding>,
  },
  {
    path: '/profile',
    element: <RequireOnboarding><Layout><Profile /></Layout></RequireOnboarding>,
  },
  {
    path: '/book/:id',
    element: <RequireOnboarding><Layout><BookDetail /></Layout></RequireOnboarding>,
  },
  {
    path: '/shelf/dark-twisted',
    element: <RequireOnboarding><Layout><ShelfDetail /></Layout></RequireOnboarding>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
], {
  basename: import.meta.env.BASE_URL,
});
