import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { ChevronDown } from 'lucide-react'
import { PLACEHOLDER_SECTIONS, scrollToSection } from '@/lib/sections'

export function ScrollIndicator() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(true)

  // Hide once the user has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < window.innerHeight * 0.4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          onClick={() => scrollToSection(PLACEHOLDER_SECTIONS[0].id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
          className="fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-800"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            {t('scroll')}
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </m.button>
      )}
    </AnimatePresence>
  )
}
