import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { fadeUp, revealOnView } from '@/lib/motion'

interface Props {
  id: string
  titleKey: string
}

export function ComingSoon({ id, titleKey }: Props) {
  const { t } = useTranslation()

  return (
    <section
      id={id}
      className="mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center px-6 text-center md:px-12"
    >
      <m.h2
        variants={fadeUp}
        {...revealOnView}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {t(titleKey)}
      </m.h2>
      <m.p
        variants={fadeUp}
        {...revealOnView}
        className="mt-3 text-lg text-zinc-500"
      >
        {t('comingSoon')}
      </m.p>
    </section>
  )
}
