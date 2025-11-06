import { useTranslation } from 'react-i18next';
import type { TodoFilter } from '../types';

interface TodoFiltersProps {
  value: TodoFilter;
  counts: Record<TodoFilter, number>;
  onChange: (filter: TodoFilter) => void;
}

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  const { t } = useTranslation();
  const options: Array<{ value: TodoFilter; label: string }> = [
    { value: 'all', label: t('filters.all') },
    { value: 'active', label: t('filters.active') },
    { value: 'completed', label: t('filters.completed') },
  ];
  const formatCount = (count: number) => (count >= 1000 ? '999+' : count);

  return (
    <nav className="todo-filters" aria-label="Filter todos">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`todo-filters__button ${value === option.value ? 'is-active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          <span>{option.label}</span>
          <span className="todo-filters__count">{formatCount(counts[option.value])}</span>
        </button>
      ))}
    </nav>
  );
}
