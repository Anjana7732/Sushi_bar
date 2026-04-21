import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { ThemeToggle } from './ThemeToggle'

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
  /** Menu page header: light bar in light theme, dark bar in dark theme. */
  chrome?: 'default' | 'menu'
}

const navLinkDefault = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'border-b-2 border-zen-red pb-1 text-neutral-950 dark:border-zen-red dark:text-white'
    : 'border-b-2 border-transparent pb-1 text-neutral-700 transition-colors hover:border-neutral-300 hover:text-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white'

const navLinkMenu = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'border-b-2 border-zen-red pb-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:border-rose-400 dark:text-white'
    : 'border-b-2 border-transparent pb-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white'

export function Navbar({
  links,
  ctaLabel,
  ctaTo,
  chrome = 'default',
}: NavbarProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const isMenuChrome = chrome === 'menu'

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

  const headerClass = isMenuChrome
    ? 'sticky top-0 z-50 border-b border-neutral-200/90 bg-white/95 text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:border-neutral-800 dark:bg-neutral-950/95 dark:text-neutral-100 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)] dark:supports-[backdrop-filter]:bg-neutral-950/90'
    : 'sticky top-0 z-50 border-b border-neutral-200/90 bg-white/90 text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75 dark:border-neutral-800 dark:bg-neutral-950/90 dark:text-neutral-100 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)] dark:supports-[backdrop-filter]:bg-neutral-950/75'

  const navListClass = isMenuChrome
    ? 'flex flex-wrap items-center justify-center gap-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-300'
    : 'flex flex-wrap items-center justify-center gap-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-800 dark:text-neutral-200'

  const logoTextClass = isMenuChrome
    ? 'font-serif text-base font-semibold italic leading-snug tracking-tight text-zen-red sm:text-xl sm:leading-tight dark:text-red-500'
    : 'font-serif text-base font-semibold italic leading-snug tracking-tight text-zen-red sm:text-xl sm:leading-tight dark:text-red-500'

  return (
    <header className={headerClass}>
      <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Asian Spice kitchen, home"
          className="flex min-w-0 items-center transition-opacity hover:opacity-90"
        >
          <span className={logoTextClass}>Asian Spice kitchen</span>
        </Link>

        <nav className="hidden flex-1 justify-center md:flex" aria-label="Primary">
          <ul className={navListClass}>
            {links.map((link) => (
              <li key={link.to + link.label}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={isMenuChrome ? navLinkMenu : navLinkDefault}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle menuChrome={isMenuChrome} />
          <Link
            to={ctaTo}
            className="hidden rounded-md bg-zen-red px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red sm:inline-flex"
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            className={
              isMenuChrome
                ? 'inline-flex rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus-visible:outline-rose-400 md:hidden'
                : 'inline-flex rounded-md p-2 text-neutral-800 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red dark:text-neutral-200 dark:hover:bg-neutral-800 md:hidden'
            }
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
        <div
          className={
            isMenuChrome
              ? 'border-t border-neutral-200 dark:border-neutral-800 md:hidden'
              : 'border-t border-neutral-200 dark:border-neutral-800 md:hidden'
          }
        >
          <nav
            id={menuId}
            aria-label="Primary mobile"
            className={
              isMenuChrome ? 'bg-white dark:bg-neutral-950' : 'bg-white dark:bg-neutral-950'
            }
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3 sm:px-6">
              {links.map((link) => (
                <li key={`m-${link.to}-${link.label}`}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={close}
                    className={({ isActive }) => {
                      if (isMenuChrome) {
                        return isActive
                          ? 'block rounded-lg border border-zen-red/35 bg-red-50/80 px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:border-rose-400/40 dark:bg-rose-950/20 dark:text-white'
                          : 'block rounded-lg border border-transparent px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900'
                      }
                      return isActive
                        ? 'block rounded-lg border border-zen-red/30 bg-red-50/60 px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950 dark:bg-red-950/25 dark:text-white'
                        : 'block rounded-lg border border-transparent px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700 transition hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                    }}
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
