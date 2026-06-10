import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { ArrowUpRight, Globe } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { fadeUp, stagger, revealOnView } from '@/lib/motion'
import { PROJECTS } from '@/lib/projects'

const iconLink =
  'rounded-full border border-zinc-700 bg-zinc-900/60 p-3 text-zinc-400 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white active:scale-95'

export function Projects() {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 py-24 md:px-12"
    >
      <m.h2
        variants={fadeUp}
        {...revealOnView}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {t('projects.title')}
      </m.h2>
      <m.p
        variants={fadeUp}
        {...revealOnView}
        className="mt-2 text-sm tracking-[0.15em] text-zinc-500 uppercase"
      >
        {t('projects.hint')}
      </m.p>

      {/* Editorial index: hovering one row dims its siblings. */}
      <m.ol
        variants={stagger}
        {...revealOnView}
        className="mt-14 [&:hover>li:not(:hover)]:opacity-40"
      >
        {PROJECTS.map((project, i) => {
          const primaryUrl = project.liveUrl ?? project.repoUrl

          return (
            <m.li
              key={project.id}
              variants={fadeUp}
              className="group border-t border-zinc-800 transition-opacity duration-300 last:border-b"
            >
              <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-[5rem_1fr_auto] md:gap-6">
                <span
                  aria-hidden
                  className="pt-1 text-sm font-semibold tracking-widest text-zinc-600 tabular-nums"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {project.name}
                      <ArrowUpRight
                        aria-hidden
                        className="h-6 w-6 -translate-x-1 translate-y-1 text-zinc-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      />
                    </a>
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">
                    {t(`projects.items.${project.id}`)}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-3 md:pt-1">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — ${t('projects.viewCode')}`}
                      className={iconLink}
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — ${t('projects.viewLive')}`}
                      className={iconLink}
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </m.li>
          )
        })}
      </m.ol>
    </section>
  )
}
