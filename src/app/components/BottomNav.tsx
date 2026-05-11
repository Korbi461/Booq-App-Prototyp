import { Compass, Search, BookMarked, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';

const navItems = [
  { path: '/', icon: Compass, label: 'Discover' },
  { path: '/search', icon: Search, label: 'Suche' },
  { path: '/bookshelf', icon: BookMarked, label: 'Likes' },
  { path: '/community', icon: Users, label: 'Community' },
];

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
      <nav className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full max-w-sm mx-auto h-16 px-2 flex items-center justify-between pointer-events-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 transition-all duration-300 rounded-full ${
                active
                  ? 'bg-black text-white px-5 py-2.5'
                  : 'text-gray-400 p-2.5 hover:text-gray-600'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              {active && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
