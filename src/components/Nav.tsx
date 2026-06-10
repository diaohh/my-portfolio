import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { User, Briefcase, FolderGit2, Mail, type LucideIcon } from 'lucide-react'
import { SECTIONS, SECTION_IDS, scrollToSection } from '@/lib/sections'
import { useActiveSection } from '@/lib/useActiveSection'

const ICONS: Record<string, LucideIcon> = {
  home: User,
  experience: Briefcase,
  projects: FolderGit2,
  contact: Mail,
}

export function Nav() {
  const { t } = useTranslation()
  const active = useActiveSection(SECTION_IDS)

  return (
    <m.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-6 left-1/2 z-50 w-full max-w-fit -translate-x-1/2"
    >
      <nav className="flex items-center gap-1 rounded-full border border-zinc-200/60 bg-white/60 p-1.5 shadow-lg shadow-zinc-900/5 backdrop-blur-md transition-colors hover:bg-white/80 sm:gap-2">
        {SECTIONS.map((section) => {
          const Icon = ICONS[section.id]
          const isActive = active === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section.id)
              }}
              aria-current={isActive ? 'true' : undefined}
              className={
                'relative flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ' +
                (isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900')
              }
            >
              {isActive && (
                <m.span
                  layoutId="nav-active"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-full bg-zinc-100"
                />
              )}
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{t(section.labelKey)}</span>
            </a>
          )
        })}
      </nav>
    </m.header>
  )
}
