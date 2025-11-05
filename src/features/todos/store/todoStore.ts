import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Todo, TodoFilter, CreateTodoInput, UpdateTodoInput } from '../types';
import type { TodoRepository } from '../repository/todoRepository';

export interface TodoStoreDeps {
  repository: TodoRepository;
}

export interface TodoStoreState {
  todos: Todo[];
  filter: TodoFilter;
  initialize: () => Promise<void>;
  add: (input: CreateTodoInput) => Promise<void>;
  update: (input: UpdateTodoInput) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  setFilter: (filter: TodoFilter) => void;
}

export function createTodoStore({ repository }: TodoStoreDeps) {
  let isInitialized = false;

  return create<TodoStoreState>((set, get) => ({
    todos: [],
    filter: 'all',
    async initialize() {
      if (isInitialized) return;
      isInitialized = true;
      const todos = await repository.getAll();
      set({ todos });
    },
    async add({ title }) {
      const trimmed = title.trim();
      if (!trimmed) return;

      const newTodo: Todo = {
        id: nanoid(8),
        title: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({ todos: [newTodo, ...state.todos] }));
      await repository.saveAll(get().todos);
    },
    async update({ id, title, completed }) {
      const trimmed = title.trim();
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                title: trimmed,
                completed: completed ?? todo.completed,
                updatedAt: new Date().toISOString(),
              }
            : todo,
        ),
      }));
      await repository.saveAll(get().todos);
    },
    async toggle(id: string) {
      const todo = get().todos.find((item) => item.id === id);
      if (!todo) return;

      await get().update({ id, title: todo.title, completed: !todo.completed });
    },
    async remove(id: string) {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
      await repository.saveAll(get().todos);
    },
    setFilter(filter) {
      set({ filter });
    },
  }));
}
