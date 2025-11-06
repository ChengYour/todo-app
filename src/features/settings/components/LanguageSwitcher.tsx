import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../../lib/i18n';
import { useSettingsStore } from '../store/settingsStore';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === language) return;
    if (value === 'en' || value === 'zh') {
      setLanguage(value);
      void i18n.changeLanguage(value);
    }
  };

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">{t('language.label')}</span>
      <select className="language-switcher__select" value={language} onChange={handleChange}>
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {t(`language.${lang}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
