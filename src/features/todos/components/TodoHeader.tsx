import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../settings';

export function TodoHeader() {
  const { t } = useTranslation();

  return (
    <header className="todo-header">
      <div>
        <h1 className="todo-title">{t('title')}</h1>
        <p className="todo-subtitle">{t('subtitle')}</p>
      </div>
      <LanguageSwitcher />
    </header>
  );
}

export default TodoHeader;
