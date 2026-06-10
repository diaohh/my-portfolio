import { useEffect, useState } from 'react'

interface Options {
  /** Milliseconds per character. */
  speed?: number
  /** When false, shows the full text immediately (e.g. reduced motion). */
  enabled?: boolean
  /** Delay before typing starts, in milliseconds. */
  startDelay?: number
}

/**
 * Types `text` character by character, driven by timers. Returns the partial
 * text and whether it finished. With `enabled: false` the full text and
 * `done: true` are returned immediately, without scheduling anything.
 */
export function useTypewriter(
  text: string,
  { speed = 90, enabled = true, startDelay = 350 }: Options = {},
) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) return

    const timers: ReturnType<typeof setTimeout>[] = []
    let typed = 0

    const typeNext = () => {
      typed += 1
      setDisplayed(text.slice(0, typed))
      if (typed < text.length) {
        timers.push(setTimeout(typeNext, speed))
      } else {
        setDone(true)
      }
    }

    timers.push(setTimeout(typeNext, startDelay))
    return () => timers.forEach(clearTimeout)
  }, [text, speed, enabled, startDelay])

  return { displayed, done }
}
