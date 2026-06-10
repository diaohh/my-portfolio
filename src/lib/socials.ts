// Shared contact identity: public email and social links (used by the hero
// and the contact section). Hover colors assume a light background.

import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from '@/components/icons/BrandIcons'

export const EMAIL = 'diegovitru2000@gmail.com'

export const SOCIALS = [
  {
    id: 'github',
    href: 'https://github.com/diaohh/',
    Icon: GithubIcon,
    hover: 'hover:text-zinc-900',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/diego-andres-vinasco/',
    Icon: LinkedinIcon,
    hover: 'hover:text-[#0A66C2]',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/diego_vt1/',
    Icon: InstagramIcon,
    hover: 'hover:text-[#E1306C]',
  },
] as const
