# Diego Vinasco — Portfolio

Personal portfolio: a single-page app focused on aesthetics, motion, minimalism and
performance. Bilingual (Spanish / English).

## Stack

- **Vite 8** + **React 19** + **TypeScript** (React Compiler enabled)
- **Tailwind CSS v4** (CSS-first config)
- **Motion** for animations (shared-element transitions, draggable timeline, sliding indicators)
- **react-i18next** (es default, en)
- **lucide-react** icons · **Inter** (self-hosted via Fontsource)
- Deployed on **Vercel** · package manager **pnpm**

## Getting started

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # type-check + production build
pnpm preview    # preview the production build
pnpm lint       # eslint
```

## Structure

```
src/
  sections/     # Hero (landing/about), Experience (timeline), ComingSoon
  components/   # Nav, LanguageSwitcher, Photos, Timeline, SectionDots, ...
  i18n/         # i18next config + es/en locale JSON
  lib/          # sections, experiences, hooks, motion presets
  assets/photos # personal photos (loaded via import.meta.glob)
public/cv/      # CV PDFs (es / en), downloaded per active language
```

## Conventions

Code, identifiers and comments in English; user-facing copy lives in `i18n/locales/*.json`.
Clean code, KISS/YAGNI/DRY.
