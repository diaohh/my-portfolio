import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { Briefcase, GraduationCap } from 'lucide-react'
import { formatMonthRange, type Experience } from '@/lib/experiences'

interface Props {
  experience: Experience
  x: number
  position: 'above' | 'below'
  expanded: boolean
  onSelect: () => void
}

const COLLAPSED_W = 240
const EXPANDED_W = 340

export function TimelineCard({
  experience,
  x,
  position,
  expanded,
  onSelect,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'es'
  const Icon = experience.kind === 'education' ? GraduationCap : Briefcase
  const isAbove = position === 'above'

  return (
    <div className="absolute top-0 h-full" style={{ left: x }}>
      {/* Node on the axis */}
      <span
        className={
          'absolute top-1/2 left-0 z-20 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 transition-all duration-300 ' +
          (expanded
            ? 'border-indigo-300 bg-indigo-400 text-zinc-950 shadow-[0_0_24px_5px_rgba(129,140,248,0.5)]'
            : 'border-zinc-500 bg-zinc-800 text-zinc-300')
        }
      >
        <Icon className="h-4 w-4" />
      </span>

      {/* Connector from axis to card */}
      <span
        aria-hidden
        className={
          'absolute left-0 h-8 w-px -translate-x-1/2 ' +
          (isAbove
            ? 'bottom-1/2 mb-4 bg-gradient-to-t from-zinc-600 to-transparent'
            : 'top-1/2 mt-4 bg-gradient-to-b from-zinc-600 to-transparent')
        }
      />

      {/* Card */}
      <div
        className={
          'absolute left-0 -translate-x-1/2 ' +
          (isAbove ? 'bottom-1/2 mb-12' : 'top-1/2 mt-12')
        }
      >
        <m.div
          initial={false}
          animate={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className={
            'overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300 ' +
            (expanded
              ? 'border-indigo-400/40 bg-zinc-800/90 shadow-2xl shadow-indigo-950/40 ring-1 ring-white/10'
              : 'border-zinc-700/70 bg-zinc-900/70 opacity-70 hover:opacity-100')
          }
        >
          <button
            type="button"
            onClick={onSelect}
            aria-expanded={expanded}
            className="block w-full p-5 text-left"
          >
            <span className="inline-flex rounded-full bg-zinc-700/60 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-200">
              {formatMonthRange(experience.start, experience.end, lang)}
            </span>
            <h3
              className={
                'mt-3 font-semibold tracking-tight transition-colors duration-300 ' +
                (expanded ? 'text-xl text-white' : 'text-base text-zinc-100')
              }
            >
              {experience.company}
            </h3>
            <p className="mt-1 text-sm font-medium text-indigo-300">
              {t(`experience.items.${experience.id}.role`)}
            </p>

            <AnimatePresence initial={false}>
              {expanded && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-zinc-300">
                    {t(`experience.items.${experience.id}.summary`)}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </button>
        </m.div>
      </div>
    </div>
  )
}
