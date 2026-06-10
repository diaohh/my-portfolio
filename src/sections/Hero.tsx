import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { useReducedMotion } from 'motion/react'
import { Download } from 'lucide-react'
import { fadeUp, stagger } from '@/lib/motion'
import { scrollToSection } from '@/lib/sections'
import { useTypewriter } from '@/lib/useTypewriter'
import { Photos } from '@/components/Photos'
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from '@/components/icons/BrandIcons'

const SOCIALS = [
  { id: 'github', href: 'https://github.com/diaohh/', Icon: GithubIcon, hover: 'hover:text-zinc-900' },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/diego-andres-vinasco/', Icon: LinkedinIcon, hover: 'hover:text-[#0A66C2]' },
  { id: 'instagram', href: 'https://www.instagram.com/diego_vt1/', Icon: InstagramIcon, hover: 'hover:text-[#E1306C]' },
] as const

export function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const name = t('hero.name')

  const { displayed, done } = useTypewriter(name, { enabled: !reduce })

  // The rest of the hero reveals once the name finishes typing.
  const reveal = done ? 'visible' : 'hidden'

  return (
    <section
      id="home"
      className="sticky top-0 mx-auto flex min-h-svh max-w-7xl items-center px-6 pt-24 md:px-12"
    >
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12">
        {/* Left column — introduction */}
        <m.div
          variants={stagger}
          initial="hidden"
          animate={reveal}
          className="z-10 space-y-7 lg:col-span-7"
        >
          <m.div variants={fadeUp} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-zinc-400" />
            <span className="text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase">
              {t('hero.greeting')}
            </span>
          </m.div>

          {/* Name typewriter — always visible, not gated by the reveal. */}
          <h1 className="text-6xl leading-tight font-extrabold tracking-tighter text-zinc-950 md:text-7xl lg:text-8xl">
            <span aria-hidden="true">{displayed}</span>
            <span className="sr-only">{name}</span>
            <span
              aria-hidden="true"
              className="ml-1 font-light text-zinc-400 animate-blink"
            >
              |
            </span>
          </h1>

          <m.h2
            variants={fadeUp}
            className="text-2xl font-semibold tracking-tight text-zinc-500 md:text-3xl"
          >
            {t('hero.role')}
          </m.h2>

          <m.p
            variants={fadeUp}
            className="max-w-2xl text-lg leading-relaxed font-medium text-zinc-600 md:text-xl"
          >
            {t('hero.description')}
          </m.p>

          <m.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href={t('hero.cvFile')}
              download={t('hero.cvName')}
              className="group inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-4 font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20 active:scale-95"
            >
              {t('hero.cv')}
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="rounded-full border-2 border-zinc-200 bg-white px-8 py-4 font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
            >
              {t('hero.contactCta')}
            </button>

            <div className="mx-2 hidden h-8 w-px bg-zinc-200 sm:block" />

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ id, href, Icon, hover }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`social.${id}`)}
                  className={`rounded-full border border-zinc-200 bg-white p-3 text-zinc-400 transition-all hover:border-zinc-400 hover:shadow-md ${hover}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </m.div>
        </m.div>

        {/* Right column — photos */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={reveal}
          className="flex justify-center lg:col-span-5 lg:justify-end"
        >
          <Photos />
        </m.div>
      </div>
    </section>
  )
}
