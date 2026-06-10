import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'

const LANGS = ['es', 'en'] as const

interface Props {
  /** 'floating' = desktop pill fixed at the top-right (hidden on <sm);
      'inline' = compact toggle inside the navbar pill (shown on <sm, only
      the active language). Both can be mounted at once — CSS decides which
      one shows — so each variant uses its own layoutId. */
  variant?: 'floating' | 'inline'
}

export function LanguageSwitcher({ variant = 'floating' }: Props) {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage === 'en' ? 'en' : 'es'
  const floating = variant === 'floating'

  const toggle = () => i18n.changeLanguage(current === 'es' ? 'en' : 'es')

  const langs = LANGS.map((lng) => {
    const active = current === lng
    return (
      <span
        key={lng}
        className={
          'relative rounded-full px-2.5 transition-colors ' +
          (floating ? 'py-1 ' : 'py-1.5 ') +
          (active ? 'text-white' : floating ? 'text-zinc-500' : 'hidden')
        }
      >
        {active && (
          <m.span
            layoutId={floating ? 'lang-active' : 'lang-active-inline'}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="absolute inset-0 -z-10 rounded-full bg-zinc-900"
          />
        )}
        {lng.toUpperCase()}
      </span>
    )
  })

  if (!floating) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle language"
        className="flex items-center text-xs font-semibold"
      >
        {langs}
      </button>
    )
  }

  return (
    <m.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      aria-label="Toggle language"
      className="fixed top-6 right-6 z-50 hidden items-center gap-0.5 rounded-full border border-zinc-200/60 bg-white/60 p-1 text-xs font-semibold shadow-lg shadow-zinc-900/5 backdrop-blur-md sm:flex"
    >
      {langs}
    </m.button>
  )
}
