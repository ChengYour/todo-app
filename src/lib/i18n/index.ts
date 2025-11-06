import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './resources/en/common.json';
import zhCommon from './resources/zh/common.json';

const resources = {
  en: { translation: enCommon },
  zh: { translation: zhCommon },
} as const;

export const supportedLanguages = ['en', 'zh'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('lang');
  if (stored === 'en' || stored === 'zh') {
    return stored;
  }
  const browser = navigator.language.toLowerCase();
  if (browser.startsWith('zh')) return 'zh';
  return 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
