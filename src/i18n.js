import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import errors from './locales/en/files/errors.json';
import options from './locales/en/files/options.json';
import upload from './locales/en/files/upload.json';
import navDirectories from './locales/en/directories/navDirectories.json';

const resources = {
    en: {
        'directories/navDirectories': navDirectories,
        'files/errors': errors,
        'files/options': options,
        'files/upload': upload
    }
}

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    }
);

export default i18n;
