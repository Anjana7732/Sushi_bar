import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const galleryImage = (fileName: string) =>
  new URL(`../assets/gallery/${fileName}`, import.meta.url).href

const GALLERY_ITEMS = [
  {
    id: 'g1',
    alt: 'Elegant sushi assortment on a matte black plate',
    imageSrc: galleryImage('sushi.jpeg'),
  },
  {
    id: 'g2',
    alt: 'Fried Samosa served with vibrant garnish',
    imageSrc: galleryImage('samosa.jpeg'),
  },
  {
    id: 'g3',
    alt: 'Sashimi Salads',
    imageSrc: galleryImage('sashimi_salads.jpeg'),
  },
  {
    id: 'g4',
    alt: 'Chef plated sushi lineup with vivid seafood tones',
    imageSrc: galleryImage('sushi_platter.jpeg'),
  },
  {
    id: 'g5',
    alt: 'Fried Chicken Noodle',
    imageSrc: galleryImage('chicken-noodle.jpeg'),
  },
  {
    id: 'g6',
    alt: 'Pork Red Thai Curry',
    imageSrc: galleryImage('pork_red_thai_curry.jpeg'),
  },
  {
    id: 'g7',
    alt: 'Onion Bhaji',
    imageSrc: galleryImage('onion bhaji.jpeg'),
  },
  {
    id: 'g8',
    alt: 'Exclusive ASK Noodle',
    imageSrc: galleryImage('exclusive_ASK_noodle.jpeg'),
  },
  {
    id: 'g9',
    alt: 'Mixed sushi rolls featuring avocado and dumpling',
    imageSrc: galleryImage('sushi_special.jpeg'),
  },
  {
    id: 'g10',
    alt: 'Oyster Shrimp',
    imageSrc: galleryImage('oyster_shrimp.jpeg'),
  },
  {
    id: 'g11',
    alt: 'Kadai Chicken',
    imageSrc: galleryImage('kadai-chicken.jpeg'),
  },
  {
    id: 'g12',
    alt: 'Chopsticks picking fresh nigiri from a sushi board',
    imageSrc: galleryImage('sushi2.PNG'),
  },
  {
    id: 'g13',
    alt: 'Special fried ricewith glazed chicken and greens',
    imageSrc: galleryImage('Special_friedrice.jpeg'),
  },
  {
    id: 'g14',
    alt: 'Shushi Platter',
    imageSrc: galleryImage('shrimp_crab salad.jpeg'),
  },
  {
    id: 'g15',
    alt: 'Signature chef platter with premium asian bites',
    imageSrc: galleryImage('combo_food.jpeg'),
  },
] as const

export function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = activeIndex === null ? null : GALLERY_ITEMS[activeIndex]

  const closeLightbox = useCallback(() => setActiveIndex(null), [])
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return current === 0 ? GALLERY_ITEMS.length - 1 : current - 1
    })
  }, [])
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return current === GALLERY_ITEMS.length - 1 ? 0 : current + 1
    })
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex, closeLightbox, showNext, showPrevious])

  return (
    <div className="border-t border-neutral-200/80 bg-white py-16 sm:py-20 lg:py-24 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-neutral-50">
            Gallery
          </h1>
          
          <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base dark:text-neutral-400">
            A visual tasting menu inspired by sushi craft, dumpling artistry,
            and signature Asian flavors.</p>
          <span className="mt-3 font-serif text-sm italic tracking-wide text-neutral-600 dark:text-neutral-300">
           "Straight from our kitchen to your screen"
          </span> 😉🤤
        </header>

        <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <li
              key={item.id}
              className="min-w-0 animate-gallery-card-in"
              style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'forwards' }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative m-0 block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200 text-left shadow-sm ring-1 ring-black/5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red dark:bg-neutral-800 dark:ring-white/10"
              >
                <img
                  src={item.imageSrc}
                  alt={item.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-95"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/12" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16 text-sm font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  {item.alt}
                </figcaption>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-gallery-overlay-in sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery image"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
            aria-label="Close image preview"
          >
            <X className="size-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showPrevious()
            }}
            className="absolute left-2 inline-flex items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
            aria-label="Show previous image"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          <figure
            className="max-h-[90vh] w-full max-w-5xl animate-gallery-modal-in"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeItem.imageSrc}
              alt={activeItem.alt}
              width={1600}
              height={1200}
              className="max-h-[82vh] w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/90 sm:text-base">
              {activeItem.alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            className="absolute right-2 inline-flex items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
            aria-label="Show next image"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  )
}
