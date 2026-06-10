import { LazyMotion, MotionConfig, domMax } from 'motion/react'
import { Nav } from '@/components/Nav'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SectionDots } from '@/components/SectionDots'
import { ScrollIndicator } from '@/components/ScrollIndicator'
import { Hero } from '@/sections/Hero'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'

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
          {/* Curtain stage: the sticky hero plus the dark panel that rises
              over it. The wrapper bounds the hero's sticky range and sits
              above the fixed contact layer (inverse curtain at the end). */}
          <div className="relative z-10">
            <Hero />
            <div className="relative z-10 bg-zinc-950 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.45),0_30px_60px_-15px_rgba(0,0,0,0.45)]">
              <Experience />
              <Projects />
            </div>
          </div>
          <Contact />
        </main>
        <ScrollIndicator />
      </MotionConfig>
    </LazyMotion>
  )
}
