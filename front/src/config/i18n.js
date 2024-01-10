import { initReactI18next } from 'react-i18next';

import enUs from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';
import i18n from 'i18next';

import translationEN from '../locales/en.json';
import translationFR from '../locales/fr.json';

export const antdLocales = {
  en: enUs,
  fr: frFR,
};

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: 'fr',
    react: {
      useSuspense: false,
    },
    resources,
    returnNull: false,
  });

export default i18n;
