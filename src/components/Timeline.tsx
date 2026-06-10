import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent } from 'motion/react'
import * as m from 'motion/react-m'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EXPERIENCES } from '@/lib/experiences'
import { TimelineCard } from './TimelineCard'

const GAP = 360
const LAST = EXPERIENCES.length - 1

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export function Timeline() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [active, setActive] = useState(LAST)
  const [pinned, setPinned] = useState<number | null>(null)

  // Side padding = half the viewport so any node (including the ends) can be
  // centered. Measured from the DOM and kept in sync on resize.
  const [pad, setPad] = useState(0)
  const trackWidth = pad * 2 + LAST * GAP
  const nodeX = (i: number) => pad + i * GAP

  const targetFor = (i: number) => {
    const vp = viewportRef.current
    if (!vp) return 0
    const min = Math.min(0, vp.clientWidth - trackWidth)
    return clamp(vp.clientWidth / 2 - nodeX(i), min, 0)
  }

  // Measure before paint and start showing the last experience (right edge).
  useLayoutEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const p = vp.clientWidth / 2
    setPad(p)
    const width = p * 2 + LAST * GAP
    const min = Math.min(0, vp.clientWidth - width)
    x.set(clamp(vp.clientWidth / 2 - (p + LAST * GAP), min, 0))
  }, [x])

  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const observer = new ResizeObserver(() => setPad(vp.clientWidth / 2))
    observer.observe(vp)
    return () => observer.disconnect()
  }, [])

  // While dragging, the node nearest the viewport center becomes active.
  useMotionValueEvent(x, 'change', (latest) => {
    if (pad === 0 || pinned !== null) return
    const vp = viewportRef.current
    if (!vp) return
    const center = vp.clientWidth / 2 - latest
    let nearest = 0
    EXPERIENCES.forEach((_, i) => {
      if (Math.abs(nodeX(i) - center) < Math.abs(nodeX(nearest) - center)) {
        nearest = i
      }
    })
    setActive(nearest)
  })

  const centerOn = (i: number) =>
    animate(x, targetFor(i), { type: 'spring', stiffness: 260, damping: 30 })

  const select = (i: number) => {
    setPinned((prev) => (prev === i ? null : i))
    setActive(i)
    centerOn(i)
  }

  const go = (dir: -1 | 1) => {
    const next = clamp(active + dir, 0, LAST)
    setPinned(null)
    setActive(next)
    centerOn(next)
  }

  const expandedIndex = pinned ?? active

  return (
    <div className="relative w-full">
      <div ref={viewportRef} className="relative h-[44rem] overflow-hidden">
        <m.div
          drag="x"
          dragConstraints={viewportRef}
          dragElastic={0.06}
          style={{ x, width: trackWidth }}
          className="absolute top-0 left-0 h-full cursor-grab active:cursor-grabbing"
        >
          {/* Axis line with a soft glow */}
          <span
            aria-hidden
            className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-400 to-transparent shadow-[0_0_18px_2px_rgba(228,228,231,0.3)]"
          />
          {EXPERIENCES.map((exp, i) => (
            <TimelineCard
              key={exp.id}
              experience={exp}
              x={nodeX(i)}
              position={i % 2 === 0 ? 'above' : 'below'}
              expanded={expandedIndex === i}
              onSelect={() => select(i)}
            />
          ))}
        </m.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous experience"
          className="rounded-full border border-zinc-600 bg-zinc-800 p-2.5 text-zinc-200 transition-colors hover:border-indigo-400/50 hover:bg-zinc-700 disabled:opacity-25"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span aria-hidden className="h-6 w-px bg-zinc-600" />
        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === LAST}
          aria-label="Next experience"
          className="rounded-full border border-zinc-600 bg-zinc-800 p-2.5 text-zinc-200 transition-colors hover:border-indigo-400/50 hover:bg-zinc-700 disabled:opacity-25"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
