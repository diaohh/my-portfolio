import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from './locales/es.json'
import en from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

// Keep the <html> lang attribute in sync (a11y/SEO).
const applyLang = (lng: string) => {
  document.documentElement.lang = lng
}
applyLang(i18n.resolvedLanguage ?? 'es')
i18n.on('languageChanged', applyLang)

export default i18n
