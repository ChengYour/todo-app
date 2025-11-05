export interface StorageAdapter {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
}

export function createLocalStorageAdapter(storage: Storage = window.localStorage): StorageAdapter {
  return {
    getItem<T>(key: string) {
      try {
        const raw = storage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
      } catch {
        return null;
      }
    },
    setItem<T>(key: string, value: T) {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch {
        // Ignore write errors (e.g., quota exceeded) to keep UI responsive.
      }
    },
    removeItem(key: string) {
      try {
        storage.removeItem(key);
      } catch {
        // Ignore removal errors for the same reason.
      }
    },
  };
}
