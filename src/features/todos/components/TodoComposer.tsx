import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CreateTodoInput } from '../types';

interface TodoComposerProps {
  onAdd: (input: CreateTodoInput) => Promise<void> | void;
}

const MAX_HEIGHT = 240;

export function TodoComposer({ onAdd }: TodoComposerProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    const nextHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  };

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  }, [title]);

  const submit = async () => {
    const trimmed = title.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd({ title: trimmed });
      setTitle('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.overflowY = 'hidden';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <form className="todo-composer" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="todo-composer__input"
        rows={1}
        placeholder={t('composer.placeholder')}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
            event.preventDefault();
            void submit();
          }
        }}
        disabled={isSubmitting}
        aria-label={t('composer.placeholder')}
      />
      <button
        className="todo-composer__submit"
        type="button"
        onClick={() => {
          void submit();
        }}
        disabled={isSubmitting}
      >
        {t('composer.submit')}
      </button>
    </form>
  );
}
