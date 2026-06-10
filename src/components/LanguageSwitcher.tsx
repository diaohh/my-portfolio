import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'

const LANGS = ['es', 'en'] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage === 'en' ? 'en' : 'es'

  const toggle = () => i18n.changeLanguage(current === 'es' ? 'en' : 'es')

  return (
    <m.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      aria-label="Toggle language"
      className="fixed top-6 right-6 z-50 flex cursor-pointer items-center gap-0.5 rounded-full border border-zinc-200/60 bg-white/60 p-1 text-xs font-semibold shadow-lg shadow-zinc-900/5 backdrop-blur-md"
    >
      {LANGS.map((lng) => {
        const active = current === lng
        return (
          <span
            key={lng}
            className={
              'relative rounded-full px-2.5 py-1 transition-colors ' +
              (active ? 'text-white' : 'text-zinc-500')
            }
          >
            {active && (
              <m.span
                layoutId="lang-active"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-zinc-900"
              />
            )}
            {lng.toUpperCase()}
          </span>
        )
      })}
    </m.button>
  )
}
