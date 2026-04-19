const GALLERY_ITEMS = [
  { id: 'g1', alt: 'Sashimi platter with garnish' },
  { id: 'g2', alt: 'Steaming dumplings in a bamboo basket' },
  { id: 'g3', alt: 'Colorful vegetable stir-fry' },
  { id: 'g4', alt: 'Matcha dessert with berries' },
  { id: 'g5', alt: 'Chef torching nigiri' },
  { id: 'g6', alt: 'Interior of the dining room' },
  { id: 'g7', alt: 'Cocktail with citrus' },
  { id: 'g8', alt: 'Bowl of ramen with soft egg' },
  { id: 'g9', alt: 'Shared plates on a dark table' },
] as const

export function GalleryPage() {
  return (
    <div className="border-t border-neutral-200/80 bg-white py-16 sm:py-20 lg:py-24 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-neutral-50">
            Gallery
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base dark:text-neutral-400">
            Placeholder imagery for the dining room, dishes, and team. Replace
            with your photography when available.
          </p>
        </header>

        <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <li key={item.id} className="min-w-0">
              <figure className="group relative m-0 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
                <img
                  src={`https://picsum.photos/seed/${item.id}/800/600`}
                  alt={item.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  {item.alt}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
