import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import brandLogo from '../../assets/asian-spice-logo.png'

export interface NavbarLink {
  label: string
  to: string
  /** Use on the home route so `/menu` does not also match `/`. */
  end?: boolean
}

export interface NavbarProps {
  links: NavbarLink[]
  ctaLabel: string
  ctaTo: string
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'border-b-2 border-zen-red pb-1 text-neutral-950'
    : 'border-b-2 border-transparent pb-1 text-neutral-700 transition-colors hover:border-neutral-300 hover:text-neutral-950'

export function Navbar({ links, ctaLabel, ctaTo }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close])

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/90 bg-white/90 text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Asian Spice kitchen, home"
          className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-90 sm:gap-3"
        >
          <img
            src={brandLogo}
            alt=""
            width={120}
            height={48}
            className="h-9 w-auto shrink-0 sm:h-10"
            decoding="async"
          />
          <span className="font-serif text-base font-medium italic leading-snug tracking-tight text-zen-red sm:text-xl sm:leading-tight">
            Asian Spice kitchen
          </span>
        </Link>

        <nav
          className="hidden flex-1 justify-center md:flex"
          aria-label="Primary"
        >
          <ul className="flex flex-wrap items-center justify-center gap-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
            {links.map((link) => (
              <li key={link.to + link.label}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={ctaTo}
            className="hidden rounded-md bg-zen-red px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red sm:inline-flex"
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            className="inline-flex rounded-md p-2 text-neutral-800 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-neutral-200 md:hidden">
          <nav id={menuId} aria-label="Primary mobile" className="bg-white">
            <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3 sm:px-6">
              {links.map((link) => (
                <li key={`m-${link.to}-${link.label}`}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={close}
                    className={({ isActive }) =>
                      isActive
                        ? 'block rounded-lg border border-zen-red/30 bg-red-50/60 px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950'
                        : 'block rounded-lg border border-transparent px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700 transition hover:bg-neutral-50'
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to={ctaTo}
                  onClick={close}
                  className="block rounded-md bg-zen-red px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-900"
                >
                  {ctaLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
