import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void> | void;
  onUpdate: (params: { id: string; title: string }) => Promise<void> | void;
  onRemove: (id: string) => Promise<void> | void;
}

export function TodoItem({ todo, onToggle, onUpdate, onRemove }: TodoItemProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

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

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      void handleSave();
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
          <input
            className="todo-item__input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
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
        {isEditing ? (
          <>
            <button
              type="button"
              className="todo-item__action"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleSave}
            >
              {t('todo.save')}
            </button>
            <button
              type="button"
              className="todo-item__action"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleCancel}
            >
              {t('todo.cancel')}
            </button>
          </>
        ) : (
          <button type="button" className="todo-item__action is-danger" onClick={handleRemove}>
            {t('todo.remove')}
          </button>
        )}
      </div>
    </article>
  );
}
