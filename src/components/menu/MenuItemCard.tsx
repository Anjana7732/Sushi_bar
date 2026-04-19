import type { MenuDish } from '../../data/menuPageData'

export function MenuItemCard({ dish }: { dish: MenuDish }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.12)] dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)]">
      <div className="aspect-[3/2] w-full overflow-hidden">
        <img
          src={dish.imageSrc}
          alt={dish.imageAlt}
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 pb-5 pt-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            {dish.name}
          </h3>
          <span className="shrink-0 pt-0.5 font-sans text-base font-semibold text-zen-red dark:text-rose-400">
            {dish.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {dish.description}
        </p>
        {dish.tags && dish.tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-700 ring-1 ring-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
