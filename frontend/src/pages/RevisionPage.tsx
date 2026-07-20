import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import type { RevisionTask } from '../types/revision';
import { getRevisionTasks } from '../services/revisions';

export function RevisionPage() {
  const [tasks, setTasks] = useState<RevisionTask[]>([]);

  useEffect(() => {
    getRevisionTasks().then(setTasks);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-sm font-medium text-brand-600">Revision Engine</p>
          <h1 className="text-2xl font-semibold text-slate-900">Your scheduled reviews</h1>
          <p className="mt-2 text-sm text-slate-500">Track pending, completed, and missed revision tasks in one place.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {['Day 3', 'Day 7', 'Day 15', 'Day 30', 'Day 60'].map((label) => (
            <Card key={label} className="space-y-2">
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <p className="text-2xl font-semibold text-slate-900">{tasks.filter((task) => `Day ${task.revisionDay}` === label).length}</p>
            </Card>
          ))}
        </div>
      </div>
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Revision queue</h2>
        <div className="mt-5 space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">{task.questionTitle}</p>
                <p className="text-sm text-slate-600">Scheduled for {task.scheduledDate} · {task.status}</p>
              </div>
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : task.status === 'MISSED' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
