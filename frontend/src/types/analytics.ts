export interface AnalyticsSummary {
  totalSolved: number;
  completionRate: number;
  retentionRate: number;
  weakAreas: string[];
}

export interface TopicDistribution {
  topic: string;
  count: number;
}

export interface PatternDistribution {
  pattern: string;
  count: number;
}
