export interface FooterLinkGroup {
  links: readonly { readonly label: string; readonly href: string }[]
}

export interface FooterProps {
  brandName: string
  tagline: string
  year: number
  columns: readonly FooterLinkGroup[]
  /** Dark single-row footer used on the menu page. */
  variant?: 'default' | 'menu'
  /** Inline links when `variant` is `menu` (e.g. Privacy, Terms, …). */
  menuInlineLinks?: readonly { readonly label: string; readonly href: string }[]
}

export function Footer({
  brandName,
  tagline,
  year,
  columns,
  variant = 'default',
  menuInlineLinks,
}: FooterProps) {
  if (variant === 'menu' && menuInlineLinks?.length) {
    return (
      <footer
        className="border-t border-neutral-200 bg-neutral-50 py-10 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
        role="contentinfo"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-serif text-lg font-medium text-neutral-900 dark:text-white">
            {brandName}
          </p>
          <p className="order-last text-center text-xs text-neutral-500 sm:order-none dark:text-neutral-500">
            © {year} {brandName}. Authentic Asian Cuisine.
          </p>
          <nav aria-label="Footer legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {menuInlineLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition hover:text-neutral-900 dark:hover:text-neutral-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className="border-t border-neutral-200/90 bg-zen-surface dark:border-neutral-800 dark:bg-neutral-900"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:pr-4">
            <p className="font-serif text-xl font-medium italic text-zen-red dark:text-red-400">
              {brandName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {tagline}
            </p>
            <p className="mt-8 text-xs text-neutral-400 dark:text-neutral-500">
              © {year} {brandName}. All rights reserved.
            </p>
          </div>

          {columns.map((col, i) => (
            <nav
              key={i}
              className="flex flex-col gap-3"
              aria-label={`Footer links ${i + 1}`}
            >
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 transition hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  )
}
