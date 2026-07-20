import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { QuestionItem } from '../../types/question';

interface QuestionListProps {
  questions: QuestionItem[];
  isLoading: boolean;
  errorMessage: string | null;
  onEdit: (question: QuestionItem) => void;
  onDelete: (question: QuestionItem) => void;
}

function formatDifficulty(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(' ');
}

export function QuestionList({ questions, isLoading, errorMessage, onEdit, onDelete }: QuestionListProps) {
  if (isLoading) {
    return <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">Loading saved questions...</div>;
  }

  if (errorMessage) {
    return <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">{errorMessage}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        No questions match your current search or filters. Add a new question or adjust the filters to continue.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">{question.title}</h3>
              <p className="text-sm text-slate-500">{question.topic} · {question.pattern} · {formatDifficulty(question.difficulty)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm" type="button" onClick={() => onEdit(question)}>
                Edit
              </Button>
              <Button variant="secondary" size="sm" type="button" onClick={() => onDelete(question)}>
                Delete
              </Button>
              <a
                href={question.leetcodeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center rounded-2xl border border-slate-200 bg-white px-4 text-sm text-brand-600 transition hover:bg-slate-50"
              >
                View on LeetCode
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-700">Notes</p>
              <p className="mt-2 text-sm text-slate-600">{question.notes || 'No notes added yet.'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Mistakes</p>
              <p className="mt-2 text-sm text-slate-600">{question.mistakes || 'No mistakes recorded.'}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>Date solved: {question.solvedDate || 'Unknown'}</span>
            <span>Difficulty: {formatDifficulty(question.difficulty)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
