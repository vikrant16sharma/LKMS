export interface QuestionRequest {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  pattern: string;
  leetcodeUrl: string;
  solvedDate: string;
  notes?: string;
  mistakes?: string;
}

export interface QuestionItem extends QuestionRequest {
  id: number;
  userId?: number;
}

export interface QuestionPage {
  content: QuestionItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface QuestionQueryParams {
  keyword?: string;
  difficulty?: string;
  topicId?: string;
  patternId?: string;
  page?: number;
  size?: number;
  sort?: string;
}
