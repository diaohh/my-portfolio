import { useEffect, useState } from 'react'

/**
 * Returns the id of the section that currently dominates the viewport. Uses
 * viewport-relative rects (not offsetTop) so it stays correct regardless of
 * each section's offsetParent — e.g. the sticky hero and the sections nested
 * inside the relative dark panel live in different coordinate systems.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.4
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}
