import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CreateTodoInput } from '../types';

interface TodoComposerProps {
  onAdd: (input: CreateTodoInput) => Promise<void> | void;
}

export function TodoComposer({ onAdd }: TodoComposerProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd({ title: trimmed });
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="todo-composer" onSubmit={handleSubmit}>
      <input
        className="todo-composer__input"
        type="text"
        placeholder={t('composer.placeholder')}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isSubmitting}
        aria-label={t('composer.placeholder')}
      />
      <button className="todo-composer__submit" type="submit" disabled={isSubmitting}>
        {t('composer.submit')}
      </button>
    </form>
  );
}
