import { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import type { RevisionTask } from '../../types/revision';
import { getRevisionTasks } from '../../services/revisions';

export function RevisionSummary() {
  const [tasks, setTasks] = useState<RevisionTask[]>([]);

  useEffect(() => {
    getRevisionTasks().then(setTasks);
  }, []);

  const pending = tasks.filter((task) => task.status === 'PENDING').length;
  const overdue = tasks.filter((task) => task.status === 'MISSED').length;

  return (
    <Card className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-500">Today's revisions</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{pending}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-500">Overdue</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{overdue}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-500">Upcoming</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{tasks.length - pending - overdue}</p>
      </div>
    </Card>
  );
}
