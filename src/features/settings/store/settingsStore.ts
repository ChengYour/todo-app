import { create } from 'zustand';
import type { SupportedLanguage } from '../../../lib/i18n';

const STORAGE_KEY = 'lang';

interface SettingsState {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const initialLanguage = (() => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'zh') return stored;
  const browser = navigator.language.toLowerCase();
  return browser.startsWith('zh') ? 'zh' : 'en';
})();

export const useSettingsStore = create<SettingsState>((set) => ({
  language: initialLanguage,
  setLanguage(lang) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
    set({ language: lang });
  },
}));
