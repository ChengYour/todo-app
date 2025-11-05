import { TodoHeader } from './TodoHeader';
import { TodoComposer } from './TodoComposer';
import { TodoFilters } from './TodoFilters';
import { TodoList } from './TodoList';
import { useTodos, useFilteredTodos } from '../hooks/useTodos';
import type { TodoFilter } from '../types';

export function TodoPage() {
  const { todos, filter, add, toggle, update, remove, setFilter } = useTodos();
  const filteredTodos = useFilteredTodos(filter);

  const counts: Record<TodoFilter, number> = {
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return (
    <main className="todo-page">
      <TodoHeader />
      <section className="todo-card">
        <TodoComposer onAdd={add} />
        <TodoFilters value={filter} counts={counts} onChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={toggle}
          onUpdate={({ id, title }) => update({ id, title })}
          onRemove={remove}
        />
      </section>
    </main>
  );
}
