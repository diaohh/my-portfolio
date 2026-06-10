import type { CSSProperties } from 'react'
import * as m from 'motion/react-m'
import { fadeUp, stagger, revealOnView } from '@/lib/motion'
import { SKILLS } from '@/lib/skills'

// Faint background stars that sell the constellation metaphor (x/y in %).
const STARS: Array<[number, number]> = [
  [15, 30],
  [28, 66],
  [44, 28],
  [50, 64],
  [63, 34],
  [76, 68],
  [91, 36],
]

const chipBase =
  'border border-zinc-800 bg-zinc-900/60 transition-all duration-300 hover:border-zinc-600 hover:shadow-[0_0_24px_var(--glow)]'

const glowOf = (color: string): CSSProperties =>
  ({ color, '--glow': `${color}55` }) as CSSProperties

export function SkillsConstellation() {
  return (
    <>
      {/* Constellation: fixed hand-laid layout with a gentle per-chip drift.
          Chips reveal their name in a translucent tooltip on hover. */}
      <m.ul
        variants={stagger}
        {...revealOnView}
        className="relative hidden h-96 md:block"
      >
        {STARS.map(([x, y]) => (
          <li
            key={`${x}-${y}`}
            aria-hidden
            className="absolute h-1 w-1 rounded-full bg-zinc-700/70"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
        {SKILLS.map((skill, i) => (
          <m.li
            key={skill.id}
            variants={fadeUp}
            className="absolute"
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div
                className="animate-drift"
                style={{
                  animationDuration: `${5 + (i % 4) * 0.9}s`,
                  animationDelay: `${-((i * 1.3) % 5)}s`,
                }}
              >
                <div
                  className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl hover:scale-110 ${chipBase}`}
                  style={glowOf(skill.color)}
                >
                  <skill.Icon className="h-7 w-7" />
                  <span className="sr-only">{skill.name}</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-lg border border-zinc-700/60 bg-zinc-900/70 px-2.5 py-1 text-xs whitespace-nowrap text-zinc-200 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            </div>
          </m.li>
        ))}
      </m.ul>

      {/* Touch/small screens have no hover, so the constellation collapses
          into plain icon + name pills. */}
      <m.ul
        variants={stagger}
        {...revealOnView}
        className="flex flex-wrap justify-center gap-2.5 md:hidden"
      >
        {SKILLS.map((skill) => (
          <m.li
            key={skill.id}
            variants={fadeUp}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm ${chipBase}`}
            style={glowOf(skill.color)}
          >
            <skill.Icon className="h-4 w-4" />
            <span className="text-zinc-300">{skill.name}</span>
          </m.li>
        ))}
      </m.ul>
    </>
  )
}
