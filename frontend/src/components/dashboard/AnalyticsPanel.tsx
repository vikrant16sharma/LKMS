import { useEffect, useState } from 'react';
import type { AnalyticsSummary, TopicDistribution, PatternDistribution } from '../../types/analytics';
import { getAnalyticsSummary, getTopicDistribution, getPatternDistribution } from '../../services/analytics';
import { Card } from '../ui/Card';

export function AnalyticsPanel() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [topics, setTopics] = useState<TopicDistribution[]>([]);
  const [patterns, setPatterns] = useState<PatternDistribution[]>([]);

  useEffect(() => {
    getAnalyticsSummary().then(setSummary);
    getTopicDistribution().then(setTopics);
    getPatternDistribution().then(setPatterns);
  }, []);

  if (!summary) {
    return <Card>Loading analytics...</Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">Total solved</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{summary.totalSolved}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Revision completion</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{summary.completionRate}%</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Retention rate</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{summary.retentionRate}%</p>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Topics by solved problems</h3>
          <div className="mt-4 space-y-3">
            {topics.map((topic) => (
              <div key={topic.topic} className="flex items-center justify-between text-sm text-slate-700">
                <span>{topic.topic}</span>
                <span className="font-semibold text-slate-900">{topic.count}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Patterns to practice</h3>
          <div className="mt-4 space-y-3">
            {patterns.map((pattern) => (
              <div key={pattern.pattern} className="flex items-center justify-between text-sm text-slate-700">
                <span>{pattern.pattern}</span>
                <span className="font-semibold text-slate-900">{pattern.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">Weak areas</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {summary.weakAreas.map((area) => (
            <span key={area} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {area}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
