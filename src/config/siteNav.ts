import type { NavbarLink } from '../components/layout/Navbar'

export const primaryNavLinks: NavbarLink[] = [
  { label: 'Home', to: '/', end: true },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerColumns = [
  {
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
  {
    links: [
      { label: 'Accessibility', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    links: [{ label: 'Press Kit', href: '#' }],
  },
] as const
