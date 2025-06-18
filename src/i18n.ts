// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import enTranslation from './locales/en/translation.json';
import idTranslation from './locales/id/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  id: {
    translation: idTranslation,
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language if detection fails
    debug: true, // Enable debug mode for development

    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'], // Order of language detection
      caches: ['localStorage'], // Cache detected language in localStorage
    },
  });

export default i18n;