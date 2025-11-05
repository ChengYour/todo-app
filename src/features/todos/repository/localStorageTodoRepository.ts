import type { Todo } from '../types';
import type { TodoRepository } from './todoRepository';
import type { StorageAdapter } from '../../../lib/storage/localStorageAdapter';

export function createLocalStorageTodoRepository(storage: StorageAdapter): TodoRepository {
  const STORAGE_KEY = 'todos';

  return {
    async getAll() {
      return storage.getItem<Todo[]>(STORAGE_KEY) ?? [];
    },
    async saveAll(todos: Todo[]) {
      storage.setItem(STORAGE_KEY, todos);
    },
  };
}
