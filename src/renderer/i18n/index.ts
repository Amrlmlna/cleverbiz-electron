import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import id from './locales/id.json';

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'id', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia' },
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number]['code'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cleverbiz_locale',
    },
  });

export default i18n;
