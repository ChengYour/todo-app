export type TodoId = string;

export type TodoFilter = 'all' | 'active' | 'completed';

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  id: TodoId;
  title: string;
  completed?: boolean;
}
