import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { TodoFilter } from '../types';
import { createTodoStore, type TodoStoreState } from '../store';
import { createLocalStorageAdapter } from '../../../lib/storage/localStorageAdapter';
import { createLocalStorageTodoRepository } from '../repository/localStorageTodoRepository';

const repository = createLocalStorageTodoRepository(createLocalStorageAdapter());
const todoStore = createTodoStore({ repository });

export function useTodos() {
  const { todos, filter, add, update, toggle, remove, setFilter, initialize } = todoStore(
    useShallow((state) => ({
      todos: state.todos,
      filter: state.filter,
      add: state.add,
      update: state.update,
      toggle: state.toggle,
      remove: state.remove,
      setFilter: state.setFilter,
      initialize: state.initialize,
    })),
  );

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return { todos, filter, add, update, toggle, remove, setFilter };
}

export function useFilteredTodos(filter: TodoFilter) {
  return todoStore(
    useShallow((state) =>
      state.todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      }),
    ),
  );
}

export type UseTodosReturn = Omit<TodoStoreState, 'initialize'>;
