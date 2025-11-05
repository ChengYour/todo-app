import type { Todo, TodoFilter } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: string) => Promise<void> | void;
  onUpdate: (params: { id: string; title: string }) => Promise<void> | void;
  onRemove: (id: string) => Promise<void> | void;
}

const EMPTY_MESSAGES: Record<TodoListProps['filter'], string> = {
  all: 'No tasks yet.',
  active: 'No active tasks yet.',
  completed: 'No completed tasks yet.',
};

export function TodoList({ todos, filter, onToggle, onUpdate, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="todo-empty">{EMPTY_MESSAGES[filter]}</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
