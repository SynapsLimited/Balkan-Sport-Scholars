import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import translationEN from './locales/en/translation.json';
import translationAL from './locales/sq/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  al: {
    translation: translationAL,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
