export interface FooterLinkGroup {
  links: readonly { readonly label: string; readonly href: string }[]
}

export interface FooterProps {
  brandName: string
  tagline: string
  year: number
  columns: readonly FooterLinkGroup[]
}

export function Footer({
  brandName,
  tagline,
  year,
  columns,
}: FooterProps) {
  return (
    <footer
      className="border-t border-neutral-200/90 bg-zen-surface"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:pr-4">
            <p className="font-serif text-xl font-medium italic text-zen-red">
              {brandName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
              {tagline}
            </p>
            <p className="mt-8 text-xs text-neutral-400">
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
                      className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 transition hover:text-neutral-800"
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
