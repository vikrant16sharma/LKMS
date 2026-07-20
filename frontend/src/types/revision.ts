export interface RevisionTask {
  id: string;
  questionTitle: string;
  revisionDay: number;
  scheduledDate: string;
  status: 'PENDING' | 'COMPLETED' | 'MISSED';
}
