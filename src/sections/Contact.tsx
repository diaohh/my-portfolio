import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Send } from 'lucide-react'
import { EMAIL, SOCIALS } from '@/lib/socials'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputStyles =
  'w-full rounded-xl border border-zinc-300 bg-white/80 px-4 py-3 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none'

export function Contact() {
  const { t } = useTranslation()
  const anchorRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  // The fixed layer would otherwise paint behind the transparent hero at the
  // top of the page; it only becomes visible (and tabbable) once its anchor
  // enters the viewport — i.e. when the dark curtain starts lifting.
  useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor) return
    const observer = new IntersectionObserver(([entry]) =>
      setRevealed(entry.isIntersecting),
    )
    observer.observe(anchor)
    return () => observer.disconnect()
  }, [])

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Without an access key the form degrades to the visitor's mail client.
    if (!accessKey) {
      const subject = `Portfolio — ${data.get('name')}`
      const body = `${data.get('message')}\n\n${data.get('name')} (${data.get('email')})`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      data.append('access_key', accessKey)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const ok = (await response.json()).success === true
      setStatus(ok ? 'sent' : 'error')
      if (ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    /* In-flow anchor: provides the scroll length, the #contact target and the
       active-section geometry, while the actual content lives in a fixed
       layer underneath the dark panel (inverse curtain). */
    <div ref={anchorRef} id="contact" className="relative h-svh">
      <section
        aria-label={t('nav.contact')}
        className={`fixed inset-x-0 bottom-0 flex h-svh flex-col justify-center px-6 md:px-12 ${revealed ? 'visible' : 'invisible'}`}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left column — typographic echo of the hero */}
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-zinc-400" />
              <span className="text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase">
                {t('contact.eyebrow')}
              </span>
            </div>

            <h2 className="text-5xl font-extrabold tracking-tighter text-zinc-950 md:text-6xl lg:text-7xl">
              {t('contact.title')}
              <span
                aria-hidden="true"
                className="ml-1 font-light text-zinc-400 animate-blink"
              >
                |
              </span>
            </h2>

            <p className="max-w-md text-lg leading-relaxed font-medium text-zinc-600">
              {t('contact.description')}
            </p>

            <a
              href={`mailto:${EMAIL}`}
              aria-label={t('contact.email')}
              className="inline-flex rounded-full border border-zinc-200 bg-white p-3 text-zinc-400 transition-all hover:border-zinc-400 hover:text-zinc-900 hover:shadow-md"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Right column — contact form + socials */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-zinc-200 bg-white/70 p-7 shadow-lg shadow-zinc-900/5 backdrop-blur-md sm:p-9"
            >
              {/* Honeypot for Web3Forms spam filtering. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold tracking-wider text-zinc-600 uppercase"
                  >
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                    className={inputStyles}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold tracking-wider text-zinc-600 uppercase"
                  >
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('contact.form.emailPlaceholder')}
                    className={inputStyles}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold tracking-wider text-zinc-600 uppercase"
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={`${inputStyles} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3.5 font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20 active:scale-95 disabled:opacity-60"
              >
                {status === 'sending'
                  ? t('contact.form.sending')
                  : t('contact.form.send')}
                <Send className="h-4 w-4" />
              </button>

              <p aria-live="polite" className="min-h-5 text-center text-sm">
                {status === 'sent' && (
                  <span className="text-emerald-600">
                    {t('contact.form.sent')}
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-red-600">{t('contact.form.error')}</span>
                )}
              </p>
            </form>

            <div className="mt-6 flex items-center justify-center gap-3">
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
          </div>
        </div>

        <p className="absolute inset-x-0 bottom-5 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} · {t('contact.footer')}
        </p>
      </section>
    </div>
  )
}
