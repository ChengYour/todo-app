import type { TodoFilter } from '../types';

const FILTER_OPTIONS: Array<{ value: TodoFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

interface TodoFiltersProps {
  value: TodoFilter;
  counts: Record<TodoFilter, number>;
  onChange: (filter: TodoFilter) => void;
}

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  return (
    <nav className="todo-filters" aria-label="Filter todos">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`todo-filters__button ${value === option.value ? 'is-active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          <span>{option.label}</span>
          <span className="todo-filters__count">{counts[option.value]}</span>
        </button>
      ))}
    </nav>
  );
}
