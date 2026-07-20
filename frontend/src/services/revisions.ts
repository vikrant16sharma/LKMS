import type { RevisionTask } from '../types/revision';

const mockRevisions: RevisionTask[] = [
  { id: 'r1', questionTitle: 'Two Sum', revisionDay: 3, scheduledDate: '2026-06-03', status: 'PENDING' },
  { id: 'r2', questionTitle: 'Longest Substring Without Repeating Characters', revisionDay: 7, scheduledDate: '2026-06-07', status: 'PENDING' },
  { id: 'r3', questionTitle: 'Binary Tree Inorder Traversal', revisionDay: 15, scheduledDate: '2026-06-15', status: 'COMPLETED' },
];

export async function getRevisionTasks(): Promise<RevisionTask[]> {
  return Promise.resolve(mockRevisions);
}
