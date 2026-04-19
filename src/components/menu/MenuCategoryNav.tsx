import type { MenuCategoryId } from '../../data/menuPageData'

type MenuCategoryNavProps = {
  categories: { id: MenuCategoryId; label: string }[]
  activeId: MenuCategoryId
  onSelect: (id: MenuCategoryId) => void
}

export function MenuCategoryNav({
  categories,
  activeId,
  onSelect,
}: MenuCategoryNavProps) {
  return (
    <nav
      className="border-y border-neutral-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:border-neutral-800/90 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/90"
      aria-label="Menu categories"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:justify-between sm:gap-x-4">
          {categories.map((cat) => {
            const active = activeId === cat.id
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => onSelect(cat.id)}
                  className={
                    active
                      ? 'border-b-2 border-zen-red pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 dark:border-rose-400 dark:text-white'
                      : 'border-b-2 border-transparent pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 transition hover:text-neutral-800 dark:hover:text-neutral-300'
                  }
                >
                  {cat.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
