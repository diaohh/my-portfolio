import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from './locales/es.json'
import en from './locales/en.json'

const DEFAULT_LANG = 'es'
const LANG_PARAM = 'lang'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: DEFAULT_LANG,
    supportedLngs: ['es', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      // A shared link (?lang=en) wins over the visitor's own preference.
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: LANG_PARAM,
      caches: ['localStorage'],
    },
  })

// Keep <html lang> (a11y/SEO) and the URL in sync, so the address bar is
// always a shareable link: the default language stays clean, others add ?lang.
const syncLanguage = () => {
  const lang = i18n.resolvedLanguage ?? DEFAULT_LANG
  document.documentElement.lang = lang

  const url = new URL(window.location.href)
  if (lang === DEFAULT_LANG) url.searchParams.delete(LANG_PARAM)
  else url.searchParams.set(LANG_PARAM, lang)
  window.history.replaceState(window.history.state, '', url)
}
syncLanguage()
i18n.on('languageChanged', syncLanguage)

export default i18n
