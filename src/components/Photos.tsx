import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { X, ImageIcon } from 'lucide-react'

// Drop real photos in src/assets/photos (photo-1.jpg, photo-2.jpg, ...). They
// are matched to the entries below in sorted filename order; missing files fall
// back to a CSS placeholder, so the build never breaks before they are added.
const photoModules = import.meta.glob(
  '../assets/photos/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
) as Record<string, string>

const PHOTO_SRCS = Object.keys(photoModules)
  .sort()
  .map((key) => photoModules[key])

const PHOTOS = [
  { id: 'one', descKey: 'photos.items.one' },
  { id: 'two', descKey: 'photos.items.two' },
  { id: 'three', descKey: 'photos.items.three' },
].map((photo, i) => ({ ...photo, src: PHOTO_SRCS[i] as string | undefined }))

// The stack is painted in reverse so the first photo sits on top and flies to
// the left when it expands. Resting offset + hover fan-out are driven by Motion
// (not CSS) because each card owns a layoutId and Motion controls its transform.
const STACK_ORDER = [...PHOTOS].reverse()
const STACK_BG = [
  'bg-zinc-200',
  'bg-zinc-300',
  'bg-gradient-to-br from-zinc-100 to-zinc-300',
]
const CARD_VARIANTS = [
  { rest: { x: 24, rotate: 6 }, hover: { x: 52, rotate: 12 } },
  { rest: { x: 12, rotate: 3 }, hover: { x: 26, rotate: 6 } },
  { rest: { x: 0, y: 0, rotate: 0 }, hover: { x: -10, y: -10 } },
]

export function Photos() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <m.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('photos.open')}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="relative block h-80 w-64 sm:h-[450px] sm:w-80"
      >
        {STACK_ORDER.map((photo, i) => {
          const isFront = i === STACK_ORDER.length - 1
          return (
            <m.div
              key={photo.id}
              layoutId={`photo-${photo.id}`}
              variants={CARD_VARIANTS[i]}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border-4 border-white shadow-xl ${STACK_BG[i]}`}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                isFront && (
                  <span className="flex flex-col items-center gap-3">
                    <span className="text-5xl font-extrabold tracking-tighter text-zinc-400">
                      DV
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                      <ImageIcon className="h-3.5 w-3.5" />
                      {t('photos.open')}
                    </span>
                  </span>
                )
              )}
            </m.div>
          )
        })}
      </m.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label={t('photos.open')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/70 p-6 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('photos.close')}
                className="absolute top-6 right-6 rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>

              <ul
                onClick={(e) => e.stopPropagation()}
                className="grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3"
              >
                {PHOTOS.map((photo) => (
                  <li key={photo.id} className="group flex flex-col items-center">
                    <m.div
                      layoutId={`photo-${photo.id}`}
                      whileHover={{ scale: 1.05 }}
                      className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-zinc-200 to-zinc-400 shadow-2xl"
                    >
                      {photo.src ? (
                        <img
                          src={photo.src}
                          alt={t(photo.descKey)}
                          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      ) : (
                        <ImageIcon className="h-10 w-10 text-zinc-500/70" />
                      )}
                    </m.div>
                    <p className="mt-4 max-w-xs text-center text-sm leading-relaxed text-zinc-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t(photo.descKey)}
                    </p>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
