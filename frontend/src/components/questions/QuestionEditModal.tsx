import { Button } from '../ui/Button';
import { QuestionForm } from './QuestionForm';
import type { QuestionItem, QuestionRequest } from '../../types/question';

interface QuestionEditModalProps {
  open: boolean;
  question: QuestionItem | null;
  isSaving: boolean;
  onSave: (question: QuestionRequest) => Promise<void>;
  onClose: () => void;
}

export function QuestionEditModal({ open, question, isSaving, onSave, onClose }: QuestionEditModalProps) {
  if (!open || !question) {
    return null;
  }

  const initialQuestion: QuestionRequest = {
    title: question.title,
    difficulty: question.difficulty,
    topic: question.topic,
    pattern: question.pattern,
    leetcodeUrl: question.leetcodeUrl,
    solvedDate: question.solvedDate,
    notes: question.notes,
    mistakes: question.mistakes,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Edit Question</h2>
            <p className="text-sm text-slate-500">Update your solution notes, topic, and difficulty.</p>
          </div>
          <Button variant="secondary" onClick={onClose} type="button">
            Close
          </Button>
        </div>
        <div className="p-6">
          <QuestionForm
            initialQuestion={initialQuestion}
            submitLabel={isSaving ? 'Saving...' : 'Save changes'}
            isSubmitting={isSaving}
            onSubmit={async (questionData) => {
              await onSave(questionData);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
