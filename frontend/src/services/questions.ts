import type { QuestionItem, QuestionPage, QuestionQueryParams, QuestionRequest } from '../types/question';
import { AUTH_TOKEN_KEY, fetcher } from './api';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function buildQuery(params: QuestionQueryParams): string {
  const query = new URLSearchParams();

  if (params.keyword) query.append('keyword', params.keyword);
  if (params.difficulty) query.append('difficulty', params.difficulty);
  if (params.topicId) query.append('topicId', params.topicId);
  if (params.patternId) query.append('patternId', params.patternId);
  if (params.page !== undefined) query.append('page', String(params.page));
  if (params.size !== undefined) query.append('size', String(params.size));
  if (params.sort) query.append('sort', params.sort);

  return query.toString();
}

export async function getQuestions(params: QuestionQueryParams = {}): Promise<QuestionPage> {
  const query = buildQuery(params);
  const path = params.keyword ? `${API_BASE}/questions/search` : `${API_BASE}/questions`;
  return fetcher<QuestionPage>(`${path}${query ? `?${query}` : ''}`, {
    headers: getAuthHeaders(),
  });
}

export async function createQuestion(data: QuestionRequest): Promise<QuestionItem> {
  return fetcher<QuestionItem>(`${API_BASE}/questions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updateQuestion(questionId: number, data: QuestionRequest): Promise<QuestionItem> {
  return fetcher<QuestionItem>(`${API_BASE}/questions/${questionId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
}

export async function deleteQuestion(questionId: number): Promise<void> {
  await fetcher<void>(`${API_BASE}/questions/${questionId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
}
