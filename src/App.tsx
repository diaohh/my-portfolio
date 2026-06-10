import { LazyMotion, MotionConfig, domMax } from 'motion/react'
import { Nav } from '@/components/Nav'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SectionDots } from '@/components/SectionDots'
import { ScrollIndicator } from '@/components/ScrollIndicator'
import { Hero } from '@/sections/Hero'
import { Experience } from '@/sections/Experience'
import { ComingSoon } from '@/sections/ComingSoon'
import { PLACEHOLDER_SECTIONS } from '@/lib/sections'

export default function App() {
  return (
    // domMax includes the `layout` feature needed for shared-element (layoutId)
    // animations. reducedMotion="user" respects prefers-reduced-motion.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <LanguageSwitcher />
        <Nav />
        <SectionDots />
        <main>
          <Hero />
          {/* Dark panel that rises over the sticky hero like a curtain. */}
          <div className="relative z-10 bg-zinc-950 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.45)]">
            {PLACEHOLDER_SECTIONS.map((section) =>
              section.id === 'experience' ? (
                <Experience key={section.id} />
              ) : (
                <ComingSoon
                  key={section.id}
                  id={section.id}
                  titleKey={section.labelKey}
                />
              ),
            )}
          </div>
        </main>
        <ScrollIndicator />
      </MotionConfig>
    </LazyMotion>
  )
}
