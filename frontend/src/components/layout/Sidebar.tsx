import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Clock3, ChartBar } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, to: '/' },
  { label: 'Questions', icon: BookOpen, to: '/questions' },
  { label: 'Revisions', icon: Clock3, to: '/revisions' },
  { label: 'Analytics', icon: ChartBar, to: '/analytics' },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-72 border-r border-slate-200 bg-white px-6 py-8 hidden md:block">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-slate-900">AlgoAtlas</h1>
        <p className="mt-2 text-sm text-slate-500">Revision, pattern tracking, and analytics for DSA learners.</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
