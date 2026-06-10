import type { ComponentType } from 'react'
import {
  ReactIcon,
  AngularIcon,
  NextjsIcon,
  GatsbyIcon,
  ExpressIcon,
  FirebaseIcon,
  AwsIcon,
  JavascriptIcon,
  TypescriptIcon,
  CssIcon,
  SassIcon,
  GitIcon,
  PythonIcon,
  DjangoIcon,
  MongodbIcon,
} from '@/components/icons/TechIcons'

// Skills shown in the constellation under the Experience timeline.
// `color` is the official brand hex (single source for icon tint + hover
// glow); brands whose color is unreadable on the dark panel use a light
// variant (Next.js/Express → white, Django → light green, AWS → orange).
// `x`/`y` are percentages inside the constellation canvas, hand-laid in
// three loose bands so chips never overlap.

export interface Skill {
  id: string
  name: string
  color: string
  Icon: ComponentType<{ className?: string }>
  x: number
  y: number
}

export const SKILLS: Skill[] = [
  { id: 'react', name: 'React', color: '#61DAFB', Icon: ReactIcon, x: 10, y: 14 },
  { id: 'angular', name: 'Angular', color: '#DD0031', Icon: AngularIcon, x: 30, y: 8 },
  { id: 'nextjs', name: 'Next.js', color: '#FFFFFF', Icon: NextjsIcon, x: 50, y: 16 },
  { id: 'gatsby', name: 'Gatsby', color: '#9D7CBF', Icon: GatsbyIcon, x: 70, y: 8 },
  { id: 'express', name: 'Express.js', color: '#FFFFFF', Icon: ExpressIcon, x: 90, y: 14 },
  { id: 'firebase', name: 'Firebase', color: '#FFCA28', Icon: FirebaseIcon, x: 8, y: 48 },
  { id: 'javascript', name: 'JavaScript', color: '#F7DF1E', Icon: JavascriptIcon, x: 28, y: 54 },
  { id: 'typescript', name: 'TypeScript', color: '#3178C6', Icon: TypescriptIcon, x: 48, y: 44 },
  { id: 'css', name: 'CSS', color: '#9B7AED', Icon: CssIcon, x: 68, y: 54 },
  { id: 'sass', name: 'Sass', color: '#CC6699', Icon: SassIcon, x: 88, y: 46 },
  { id: 'aws', name: 'AWS', color: '#FF9900', Icon: AwsIcon, x: 15, y: 84 },
  { id: 'git', name: 'Git', color: '#F05032', Icon: GitIcon, x: 35, y: 90 },
  { id: 'python', name: 'Python', color: '#5A9FD4', Icon: PythonIcon, x: 55, y: 82 },
  { id: 'django', name: 'Django', color: '#44B78B', Icon: DjangoIcon, x: 75, y: 88 },
  { id: 'mongodb', name: 'MongoDB', color: '#47A248', Icon: MongodbIcon, x: 92, y: 82 },
]
