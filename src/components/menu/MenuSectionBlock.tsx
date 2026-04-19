import type { MenuSectionData } from '../../data/menuPageData'

import { MenuItemCard } from './MenuItemCard'

export function MenuSectionBlock({ section }: { section: MenuSectionData }) {
  return (
    <section
      id={`section-${section.id}`}
      className="scroll-mt-32 border-t border-neutral-200/90 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 dark:border-neutral-800/80"
      aria-labelledby={`heading-${section.id}`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl">
          <h2
            id={`heading-${section.id}`}
            className="font-sans text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white"
          >
            {section.title}
          </h2>
          <p className="mt-2 text-sm font-light leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            {section.subtitle}
          </p>
        </header>
        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {section.dishes.map((dish) => (
            <li key={dish.id}>
              <MenuItemCard dish={dish} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
