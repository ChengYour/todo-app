import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void> | void;
  onUpdate: (params: { id: string; title: string }) => Promise<void> | void;
  onRemove: (id: string) => Promise<void> | void;
}

const MAX_EDITOR_HEIGHT = 200;

export function TodoItem({ todo, onToggle, onUpdate, onRemove }: TodoItemProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    const nextHeight = Math.min(textarea.scrollHeight, MAX_EDITOR_HEIGHT);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_EDITOR_HEIGHT ? 'auto' : 'hidden';
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      adjustHeight(inputRef.current);
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      adjustHeight(inputRef.current);
    }
  }, [title, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setTitle(todo.title);
    }
  }, [todo.title, isEditing]);

  const handleToggle = () => {
    void onToggle(todo.id);
  };

  const handleRemove = () => {
    void onRemove(todo.id);
  };

  const handleSave = async () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed === todo.title) {
      setTitle(todo.title);
      setIsEditing(false);
      return;
    }
    await onUpdate({ id: todo.id, title: trimmed });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      void handleSave();
      return;
    }
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <article className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
      <div className="todo-item__main">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={t('todo.toggle')}
        />
        {isEditing ? (
          <textarea
            ref={inputRef}
            className="todo-item__input"
            rows={1}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
          />
        ) : (
          <button
            type="button"
            className="todo-item__title"
            onClick={() => setIsEditing(true)}
            aria-pressed={false}
          >
            {todo.title}
          </button>
        )}
      </div>
      <div className="todo-item__actions">
        {isEditing
          ? [
              <button
                key="save"
                type="button"
                className="todo-item__action is-primary"
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleSave}
              >
                {t('todo.save')}
              </button>,
              <button
                key="cancel"
                type="button"
                className="todo-item__action"
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleCancel}
              >
                {t('todo.cancel')}
              </button>,
            ]
          : [
              <button
                key="remove"
                type="button"
                className="todo-item__action is-danger"
                onClick={handleRemove}
              >
                {t('todo.remove')}
              </button>,
            ]}
      </div>
    </article>
  );
}
