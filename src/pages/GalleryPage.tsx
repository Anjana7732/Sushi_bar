const GALLERY_ITEMS = [
  {
    id: 'g1',
    alt: 'Butter chicken in a copper serving bowl',
    imageSrc:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g2',
    alt: 'Paneer tikka skewers with charred vegetables',
    imageSrc:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g3',
    alt: 'Thai green curry served with jasmine rice',
    imageSrc:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g4',
    alt: 'Pad thai with shrimp, peanuts, and lime',
    imageSrc:
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g5',
    alt: 'Chinese kung pao chicken with peppers',
    imageSrc:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g6',
    alt: 'Vegetable fried rice with spring onions',
    imageSrc:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g7',
    alt: 'Szechuan noodles tossed with chili oil',
    imageSrc:
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g8',
    alt: 'Sushi platter with salmon tuna and maki rolls',
    imageSrc:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g9',
    alt: 'Ramen bowl with egg greens and broth',
    imageSrc:
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g10',
    alt: 'Chicken momos with spicy dipping sauce',
    imageSrc:
      'https://images.unsplash.com/photo-1626500155537-93690c24099e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g11',
    alt: 'Thai basil stir fry with chilies',
    imageSrc:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g12',
    alt: 'Crispy spring rolls with sweet chili dip',
    imageSrc:
      'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g13',
    alt: 'Chicken tikka platter with onions and mint chutney',
    imageSrc:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g14',
    alt: 'Chinese dumplings arranged on serving platter',
    imageSrc:
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g15',
    alt: 'Vegetable biryani served in a brass bowl',
    imageSrc:
      'https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80',
  },
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
              <figure className="group relative m-0 aspect-[4/3] overflow-hidden bg-neutral-200 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
                <img
                  src={item.imageSrc}
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
