import { useEffect, useState } from 'react';
import type React from 'react';
import type { QuestionRequest } from '../../types/question';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface QuestionFormProps {
  initialQuestion?: QuestionRequest;
  isSubmitting?: boolean;
  submitLabel?: string;
  resetAfterSubmit?: boolean;
  onSubmit: (question: QuestionRequest) => Promise<void>;
}

const emptyQuestion: QuestionRequest = {
  title: '',
  difficulty: 'Medium',
  topic: '',
  pattern: '',
  leetcodeUrl: '',
  solvedDate: '',
  notes: '',
  mistakes: '',
};

export function QuestionForm({
  initialQuestion,
  isSubmitting = false,
  submitLabel = 'Save question',
  resetAfterSubmit = false,
  onSubmit,
}: QuestionFormProps) {
  const [form, setForm] = useState<QuestionRequest>(initialQuestion ?? emptyQuestion);

  useEffect(() => {
    setForm(initialQuestion ?? emptyQuestion);
  }, [initialQuestion]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);

    if (!initialQuestion && resetAfterSubmit) {
      setForm(emptyQuestion);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Problem title" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            required
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Topic</label>
          <Input name="topic" value={form.topic} onChange={handleChange} placeholder="Arrays, Trees" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Pattern</label>
          <Input name="pattern" value={form.pattern} onChange={handleChange} placeholder="Sliding Window" required />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">LeetCode URL</label>
        <Input
          name="leetcodeUrl"
          value={form.leetcodeUrl}
          onChange={handleChange}
          placeholder="https://leetcode.com/problems/..."
          type="url"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Date solved</label>
          <Input name="solvedDate" type="date" value={form.solvedDate} onChange={handleChange} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Mistakes made</label>
          <Input name="mistakes" value={form.mistakes ?? ''} onChange={handleChange} placeholder="Common pitfalls" />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Notes</label>
        <textarea
          name="notes"
          value={form.notes ?? ''}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          placeholder="What did you learn from this problem?"
        />
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
