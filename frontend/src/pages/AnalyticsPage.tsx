import { Card } from '../components/ui/Card';
import { AnalyticsPanel } from '../components/dashboard/AnalyticsPanel';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand-600">Analytics</p>
            <h1 className="text-2xl font-semibold text-slate-900">Insights and retention metrics</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-500">
            Review the health of your learning journey with topic trends, retention, and revision completion.
          </p>
        </div>
      </Card>
      <AnalyticsPanel />
    </div>
  );
}
