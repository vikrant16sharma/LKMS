import { Card } from '../components/ui/Card';
import { AnalyticsPanel } from '../components/dashboard/AnalyticsPanel';
import { RevisionSummary } from '../components/dashboard/RevisionSummary';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-brand-600">Performance snapshot</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Your AlgoAtlas dashboard</h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Track your revision schedule, manage solved questions, and discover weak areas to improve your DSA retention.
          </p>
        </Card>
        <RevisionSummary />
      </div>
      <AnalyticsPanel />
      <Card className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Next review window</h2>
          <p className="mt-3 text-sm text-slate-600">
            Your next round of active revision is scheduled for problems solved 3 and 7 days ago. Keep the practice flow consistent.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Focus patterns</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Sliding Window', 'Binary Search', 'Dynamic Programming', 'Graphs'].map((pattern) => (
              <span key={pattern} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                {pattern}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
