// Projects shown in the #projects section. Descriptions are translated
// (`projects.items.<id>`); names and tags are proper nouns and stay as-is.
// Both links are optional (e.g. desktop apps have no live deployment).

export interface Project {
  id: string
  name: string
  tags: string[]
  repoUrl?: string
  liveUrl?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'pokeAir',
    name: 'Poke-Air',
    tags: ['Socket.IO', 'Fastify', 'React 19', 'TypeScript', 'Monorepo'],
    repoUrl: 'https://github.com/diaohh/poke-air',
    liveUrl: 'https://poke-air.vercel.app',
  },
  {
    id: 'nonameLauncher',
    name: 'NoName Launcher',
    tags: ['Electron', 'React 19', 'TypeScript', 'Firebase'],
    repoUrl: 'https://github.com/diaohh/NoName-Launcher',
  },
  {
    id: 'wcDashboard',
    name: 'WC Dashboard',
    tags: ['React 19', 'Firebase', 'TanStack Query', 'Feature-Sliced Design'],
    repoUrl: 'https://github.com/diaohh/wc-dashboard',
    liveUrl: 'https://wc-dashboard-ruby.vercel.app',
  },
  {
    id: 'calculatorMonorepo',
    name: 'Calculator Monorepo',
    tags: ['Go', 'React 19', 'Docker', 'Vitest'],
    repoUrl: 'https://github.com/diaohh/calculator-monorepo',
    liveUrl: 'https://calculator-monorepo-black.vercel.app',
  },
  {
    id: 'pokeStats',
    name: 'PokeStats',
    tags: ['React 19', 'TypeScript', 'Tailwind v4', 'Gemini'],
    repoUrl: 'https://github.com/diaohh/poke-stats',
    liveUrl: 'https://poke-stats-six.vercel.app',
  },
  {
    id: 'leadsApp',
    name: 'Leads App',
    tags: ['Next.js 16', 'Mantine', 'TanStack Query', 'Gemini'],
    repoUrl: 'https://github.com/diaohh/leads-app',
    liveUrl: 'https://leads-app-iota.vercel.app',
  },
]
