export interface Experience {
  id: string
  company: string // proper noun, not translated
  start: string // 'YYYY-MM'
  end: string // 'YYYY-MM'
  kind: 'education' | 'work'
}

// Chronological order; the timeline renders them left to right.
export const EXPERIENCES: Experience[] = [
  {
    id: 'degree',
    company: 'Pontificia Universidad Javeriana Cali',
    start: '2017-01',
    end: '2022-09',
    kind: 'education',
  },
  { id: 'pragma', company: 'PRAGMA', start: '2022-07', end: '2023-01', kind: 'work' },
  { id: 'itagil', company: 'IT Ágil', start: '2023-08', end: '2024-01', kind: 'work' },
  { id: 'onlinesat', company: 'Online SAT', start: '2024-09', end: '2025-02', kind: 'work' },
  { id: 'alternova', company: 'Alternova', start: '2025-02', end: '2026-02', kind: 'work' },
]

function parseMonth(value: string) {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1)
}

export function formatMonthRange(start: string, end: string, lang: string) {
  const format = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' })
  return `${format.format(parseMonth(start))} – ${format.format(parseMonth(end))}`
}
