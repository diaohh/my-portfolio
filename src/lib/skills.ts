import type { ComponentType } from 'react'
import {
  ReactIcon,
  AngularIcon,
  NextjsIcon,
  TailwindIcon,
  SassIcon,
  NodejsIcon,
  ExpressIcon,
  DotnetIcon,
  FirebaseIcon,
  AwsIcon,
  DockerIcon,
  JavascriptIcon,
  TypescriptIcon,
  GitIcon,
  PythonIcon,
  DjangoIcon,
  MongodbIcon,
  VitestIcon,
} from '@/components/icons/TechIcons'

// Skills shown in the constellation under the Experience timeline.
// `color` is the official brand hex (single source for icon tint + hover
// glow); brands whose color is unreadable on the dark panel use a light
// variant (Next.js/Express → white, Django → light green, AWS → orange,
// .NET → light violet). `x`/`y` are percentages inside the constellation
// canvas, hand-laid in three loose bands of six (frontend, backend,
// languages & tooling) so chips never overlap.

export interface Skill {
  id: string
  name: string
  color: string
  Icon: ComponentType<{ className?: string }>
  x: number
  y: number
}

export const SKILLS: Skill[] = [
  { id: 'react', name: 'React', color: '#61DAFB', Icon: ReactIcon, x: 8, y: 12 },
  { id: 'nextjs', name: 'Next.js', color: '#FFFFFF', Icon: NextjsIcon, x: 25, y: 6 },
  { id: 'angular', name: 'Angular', color: '#DD0031', Icon: AngularIcon, x: 42, y: 15 },
  { id: 'typescript', name: 'TypeScript', color: '#3178C6', Icon: TypescriptIcon, x: 58, y: 7 },
  { id: 'tailwind', name: 'Tailwind CSS', color: '#06B6D4', Icon: TailwindIcon, x: 75, y: 14 },
  { id: 'sass', name: 'Sass', color: '#CC6699', Icon: SassIcon, x: 92, y: 6 },
  { id: 'nodejs', name: 'Node.js', color: '#5FA04E', Icon: NodejsIcon, x: 10, y: 50 },
  { id: 'express', name: 'Express.js', color: '#FFFFFF', Icon: ExpressIcon, x: 27, y: 44 },
  { id: 'dotnet', name: '.NET', color: '#9B7AED', Icon: DotnetIcon, x: 43, y: 54 },
  { id: 'python', name: 'Python', color: '#5A9FD4', Icon: PythonIcon, x: 59, y: 45 },
  { id: 'django', name: 'Django', color: '#44B78B', Icon: DjangoIcon, x: 76, y: 53 },
  { id: 'firebase', name: 'Firebase', color: '#FFCA28', Icon: FirebaseIcon, x: 91, y: 44 },
  { id: 'javascript', name: 'JavaScript', color: '#F7DF1E', Icon: JavascriptIcon, x: 7, y: 86 },
  { id: 'mongodb', name: 'MongoDB', color: '#47A248', Icon: MongodbIcon, x: 24, y: 92 },
  { id: 'docker', name: 'Docker', color: '#2496ED', Icon: DockerIcon, x: 41, y: 82 },
  { id: 'aws', name: 'AWS', color: '#FF9900', Icon: AwsIcon, x: 58, y: 90 },
  { id: 'git', name: 'Git', color: '#F05032', Icon: GitIcon, x: 75, y: 83 },
  { id: 'vitest', name: 'Vitest', color: '#7FB31F', Icon: VitestIcon, x: 92, y: 91 },
]
