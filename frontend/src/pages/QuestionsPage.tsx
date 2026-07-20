import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { QuestionEditModal } from '../components/questions/QuestionEditModal';
import { QuestionForm } from '../components/questions/QuestionForm';
import { QuestionList } from '../components/questions/QuestionList';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Toast } from '../components/ui/Toast';
import type { QuestionItem, QuestionPage, QuestionQueryParams, QuestionRequest } from '../types/question';
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from '../services/questions';

const defaultQuery: QuestionQueryParams = {
  keyword: '',
  difficulty: '',
  topicId: '',
  patternId: '',
  page: 0,
  size: 10,
  sort: 'solvedDate,desc',
};

export function QuestionsPage() {
  const [questionPage, setQuestionPage] = useState<QuestionPage>({
    content: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  });
  const [filters, setFilters] = useState<QuestionQueryParams>(defaultQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<QuestionItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' | 'info' } | null>(null);

  const loadQuestions = async (queryParams: QuestionQueryParams = filters) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const results = await getQuestions(queryParams);
      setQuestionPage(results);
    } catch (error) {
      setErrorMessage('Unable to load questions. Please sign in and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions(defaultQuery);
  }, []);

  const showToast = (message: string, variant: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, variant });
  };

  const handleToastClose = () => setToast(null);

  const handleFilterChange = async (patch: Partial<QuestionQueryParams>) => {
    const nextFilters = { ...filters, ...patch, page: 0 };
    setFilters(nextFilters);
    await loadQuestions(nextFilters);
  };

  const handlePageChange = async (page: number) => {
    const nextFilters = { ...filters, page };
    setFilters(nextFilters);
    await loadQuestions(nextFilters);
  };

  const handleCreateQuestion = async (question: QuestionRequest) => {
    setIsSaving(true);
    setErrorMessage(null);

    const isFirstPage = filters.page === 0;
    const temporaryQuestion: QuestionItem = { ...question, id: -Date.now() };

    if (isFirstPage) {
      setQuestionPage((current) => ({
        ...current,
        content: [temporaryQuestion, ...current.content],
        totalElements: current.totalElements + 1,
      }));
    }

    try {
      const created = await createQuestion(question);

      if (isFirstPage) {
        setQuestionPage((current) => ({
          ...current,
          content: current.content.map((item) => (item.id === temporaryQuestion.id ? created : item)),
        }));
      } else {
        const nextFilters = { ...filters, page: 0 };
        setFilters(nextFilters);
        await loadQuestions(nextFilters);
      }

      showToast('Question saved successfully.', 'success');
    } catch (error) {
      if (isFirstPage) {
        setQuestionPage((current) => ({
          ...current,
          content: current.content.filter((item) => item.id !== temporaryQuestion.id),
          totalElements: Math.max(0, current.totalElements - 1),
        }));
      }
      showToast('Failed to save question. Please try again.', 'error');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateQuestion = async (questionUpdate: QuestionRequest) => {
    if (!selectedQuestion) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    const previousContent = questionPage.content;
    setQuestionPage((current) => ({
      ...current,
      content: current.content.map((item) =>
        item.id === selectedQuestion.id ? { ...item, ...questionUpdate } : item
      ),
    }));

    try {
      const updated = await updateQuestion(selectedQuestion.id, questionUpdate);
      setQuestionPage((current) => ({
        ...current,
        content: current.content.map((item) => (item.id === selectedQuestion.id ? updated : item)),
      }));
      showToast('Question updated successfully.', 'success');
    } catch (error) {
      setQuestionPage((current) => ({ ...current, content: previousContent }));
      showToast('Unable to update the question. Please try again.', 'error');
    } finally {
      setIsSaving(false);
      setSelectedQuestion(null);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!deletingQuestion) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);
    const previousContent = questionPage.content;
    setQuestionPage((current) => ({
      ...current,
      content: current.content.filter((item) => item.id !== deletingQuestion.id),
      totalElements: Math.max(0, current.totalElements - 1),
    }));

    try {
      await deleteQuestion(deletingQuestion.id);
      showToast('Question deleted.', 'success');
    } catch (error) {
      setQuestionPage((current) => ({ ...current, content: previousContent, totalElements: current.totalElements + 1 }));
      showToast('Failed to delete the question. Please try again.', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingQuestion(null);
    }
  };

  const topicOptions = useMemo(
    () => Array.from(new Set(questionPage.content.map((question) => question.topic))).sort(),
    [questionPage.content]
  );

  const patternOptions = useMemo(
    () => Array.from(new Set(questionPage.content.map((question) => question.pattern))).sort(),
    [questionPage.content]
  );

  const sortOptions = [
    { value: 'solvedDate,desc', label: 'Solved date ↓' },
    { value: 'solvedDate,asc', label: 'Solved date ↑' },
    { value: 'title,asc', label: 'Title A → Z' },
    { value: 'title,desc', label: 'Title Z → A' },
  ];

  const currentQuestions = questionPage.content;

  return (
    <div className="space-y-6">
      {toast ? <Toast message={toast.message} variant={toast.variant} onClose={handleToastClose} /> : null}

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand-600">Question Vault</p>
            <h1 className="text-2xl font-semibold text-slate-900">Manage solved problems</h1>
          </div>
          <p className="text-sm text-slate-500">Add problems with notes, patterns, and revision metadata.</p>
        </div>
        <QuestionForm
          submitLabel={isSaving ? 'Saving...' : 'Save question'}
          isSubmitting={isSaving}
          resetAfterSubmit
          onSubmit={handleCreateQuestion}
        />
      </div>

      <div className="space-y-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Saved questions</h2>
              <p className="text-sm text-slate-500">Filter, search, and manage your question vault.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Search</label>
              <Input
                name="keyword"
                value={filters.keyword ?? ''}
                onChange={(event) => setFilters((current) => ({ ...current, keyword: event.target.value }))}
                placeholder="Search title, notes, mistakes, topic..."
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleFilterChange({ keyword: filters.keyword });
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Difficulty</label>
              <select
                name="difficulty"
                value={filters.difficulty ?? ''}
                onChange={(event) => void handleFilterChange({ difficulty: event.target.value })}
                className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Topic</label>
              <select
                name="topicId"
                value={filters.topicId ?? ''}
                onChange={(event) => void handleFilterChange({ topicId: event.target.value })}
                className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">All</option>
                {topicOptions.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Pattern</label>
              <select
                name="patternId"
                value={filters.patternId ?? ''}
                onChange={(event) => void handleFilterChange({ patternId: event.target.value })}
                className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">All</option>
                {patternOptions.map((pattern) => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Sort</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={(event) => void handleFilterChange({ sort: event.target.value })}
                className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Page size</label>
              <select
                name="size"
                value={filters.size}
                onChange={(event) => void handleFilterChange({ size: Number(event.target.value) })}
                className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-500">{questionPage.totalElements} questions found</div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" type="button" onClick={() => {
                setFilters(defaultQuery);
                void loadQuestions(defaultQuery);
              }}>
                Reset filters
              </Button>
              <Button type="button" onClick={() => void loadQuestions(filters)}>
                Apply filters
              </Button>
            </div>
          </div>
        </div>

        <QuestionList
          questions={currentQuestions}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onEdit={(question) => setSelectedQuestion(question)}
          onDelete={(question) => setDeletingQuestion(question)}
        />

        <div className="mt-6 flex flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            Page {questionPage.page + 1} of {questionPage.totalPages || 1}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" type="button" onClick={() => void handlePageChange(Math.max(0, questionPage.page - 1))} disabled={questionPage.first || isLoading}>
              Previous
            </Button>
            <Button variant="secondary" type="button" onClick={() => void handlePageChange(Math.min(questionPage.totalPages - 1, questionPage.page + 1))} disabled={questionPage.last || isLoading}>
              Next
            </Button>
          </div>
        </div>
      </div>

      <QuestionEditModal
        open={Boolean(selectedQuestion)}
        question={selectedQuestion}
        isSaving={isSaving}
        onSave={handleUpdateQuestion}
        onClose={() => setSelectedQuestion(null)}
      />

      <ConfirmDialog
        open={Boolean(deletingQuestion)}
        title="Delete question"
        description="This question will be permanently removed from your vault. Are you sure you want to continue?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteQuestion}
        onCancel={() => setDeletingQuestion(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
