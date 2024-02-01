import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from './en/translation_en.json';
import translation_pl from './pl/translation_pl.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation_en,
    },
    pl: {
      translation_pl,
    },
  },
});
