import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function TopNav() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Welcome back, student.</p>
          <h2 className="text-xl font-semibold text-slate-900">AlgoAtlas study hub</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300">
            <Bell className="h-5 w-5" />
          </button>
          <Link to="/" className="inline-flex items-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
            My profile
          </Link>
        </div>
      </div>
    </header>
  );
}
