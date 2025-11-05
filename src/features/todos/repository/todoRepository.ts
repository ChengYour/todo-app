import type { Todo } from '../types';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  saveAll(todos: Todo[]): Promise<void>;
}
