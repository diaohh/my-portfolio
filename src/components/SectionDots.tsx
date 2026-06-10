import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { SECTIONS, SECTION_IDS, scrollToSection } from '@/lib/sections'
import { useActiveSection } from '@/lib/useActiveSection'

export function SectionDots() {
  const { t } = useTranslation()
  const active = useActiveSection(SECTION_IDS)
  // Home and contact are the light sections (the curtain's two ends).
  const onDark = active !== 'home' && active !== 'contact'

  return (
    <m.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      aria-label="Section navigation"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = active === section.id
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-label={t(section.labelKey)}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-center p-1"
          >
            <span
              className={
                'block rounded-full transition-all duration-300 ' +
                (isActive
                  ? `h-2.5 w-2.5 ${onDark ? 'bg-white' : 'bg-zinc-900'}`
                  : onDark
                    ? 'h-2 w-2 bg-zinc-600 group-hover:bg-zinc-400'
                    : 'h-2 w-2 bg-zinc-300 group-hover:bg-zinc-500')
              }
            />
          </button>
        )
      })}
    </m.nav>
  )
}
