import type { AnalyticsSummary, TopicDistribution, PatternDistribution } from '../types/analytics';

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  return Promise.resolve({
    totalSolved: 75,
    completionRate: 84,
    retentionRate: 76,
    weakAreas: ['Dynamic Programming', 'Graphs', 'Greedy'],
  });
}

export async function getTopicDistribution(): Promise<TopicDistribution[]> {
  return Promise.resolve([
    { topic: 'Arrays', count: 18 },
    { topic: 'Strings', count: 12 },
    { topic: 'Trees', count: 10 },
    { topic: 'Graphs', count: 8 },
  ]);
}

export async function getPatternDistribution(): Promise<PatternDistribution[]> {
  return Promise.resolve([
    { pattern: 'Sliding Window', count: 14 },
    { pattern: 'Two Pointers', count: 11 },
    { pattern: 'DFS', count: 9 },
  ]);
}
