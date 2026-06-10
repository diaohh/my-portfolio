import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { fadeUp, revealOnView } from '@/lib/motion'
import { Timeline } from '@/components/Timeline'

export function Experience() {
  const { t } = useTranslation()

  return (
    <section
      id="experience"
      className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 py-24 md:px-12"
    >
      {/* Soft glow to lift the timeline off the near-black panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(129,140,248,0.1),transparent_70%)]"
      />

      <div className="relative">
        <m.h2
          variants={fadeUp}
          {...revealOnView}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {t('experience.title')}
        </m.h2>
        <m.p
          variants={fadeUp}
          {...revealOnView}
          className="mt-2 text-sm tracking-[0.15em] text-zinc-500 uppercase"
        >
          {t('experience.hint')}
        </m.p>

        <div className="mt-10">
          <Timeline />
        </div>
      </div>
    </section>
  )
}
