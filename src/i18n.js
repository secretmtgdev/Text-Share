import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import errors from './locales/en/files/errors.json';
import forms from './locales/en/accounts/forms.json';
import modals from './locales/en/accounts/modals.json';
import navDirectories from './locales/en/directories/navDirectories.json';
import options from './locales/en/files/options.json';
import upload from './locales/en/files/upload.json';

const resources = {
    en: {
        'accounts/forms': forms,
        'accounts/modals': modals,
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
