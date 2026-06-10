// Single source of truth for the page sections. Navigation (navbar and dots)
// and the vertical order are derived from here.

export interface SectionDef {
  id: string
  labelKey: string
}

// "About me" is the landing/home itself, so its navbar item points to #home.
export const SECTIONS: SectionDef[] = [
  { id: 'home', labelKey: 'nav.aboutMe' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'contact', labelKey: 'nav.contact' },
]

export const SECTION_IDS = SECTIONS.map((s) => s.id)

export function scrollToSection(id: string) {
  // The hero is sticky, so scrollIntoView treats it as already visible and
  // does nothing — scroll to the top of the page instead.
  if (id === SECTIONS[0].id) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
