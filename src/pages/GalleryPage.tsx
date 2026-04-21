import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const galleryModules = import.meta.glob('../assets/gallery/*.{jpeg,jpg,png,JPEG,PNG,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const titleCase = (raw: string) =>
  raw
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const normalizeName = (fileName: string) =>
  titleCase(
    fileName
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\bmakki\b/gi, 'maki')
      .replace(/\bbegetable\b/gi, 'vegetable')
      .replace(/\bwingss\b/gi, 'wings')
      .replace(/\btune\b/gi, 'tuna')
      .replace(/\bba0\b/gi, 'bao')
      .trim(),
  )

const inferCategory = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('sushi') || n.includes('maki') || n.includes('nigiri') || n.includes('roll')) return 'Sushi'
  if (n.includes('dumpling') || n.includes('bao') || n.includes('wanton')) return 'Dim Sum'
  if (n.includes('noodle')) return 'Noodles'
  if (n.includes('curry') || n.includes('korma')) return 'Curry'
  if (n.includes('rice') || n.includes('biryani')) return 'Rice'
  if (n.includes('tempura') || n.includes('spring roll') || n.includes('starter') || n.includes('samosa')) return 'Appetizer'
  if (n.includes('shrimp') || n.includes('oyster') || n.includes('sashimi') || n.includes('salmon') || n.includes('tuna') || n.includes('crab')) return 'Seafood'
  if (n.includes('duck') || n.includes('chicken')) return 'Chef Special'
  return 'Chef Special'
}

const GALLERY_ITEMS = Object.entries(galleryModules)
  .map(([path, imageSrc], index) => {
    const fileName = path.split('/').pop() ?? `image-${index + 1}`
    const name = normalizeName(fileName)
    return {
      id: `g${index + 1}`,
      name,
      category: inferCategory(name),
      alt: name,
      imageSrc,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export function GalleryPage() {
  const ITEMS_PER_PAGE = 16
  const CATEGORIES = [
    'All',
    ...Array.from(new Set(GALLERY_ITEMS.map((item) => item.category))),
  ] as const
  const CAPTIONS = [
    'Fresh from our kitchen, served first to your eyes 😉',
    'Every plate tells a story of heat, craft, and care.',
    'Real ingredients, bold flavor, and zero shortcuts.',
    'A visual tasting menu before your first bite.',
    'Crafted to be remembered, not just consumed.',
  ] as const

  const [activeFilter, setActiveFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [activePage, setActivePage] = useState(1)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [captionIndex, setCaptionIndex] = useState(0)
  const baseFilteredItems =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter)
  const filteredItems =
    activeFilter === 'Curry'
      ? [...baseFilteredItems].sort((a, b) => {
          const curryPriority: Record<string, number> = {
            'Pork Red Thai Curry': 0,
            'Chicken Korma': 1,
          }
          const aPriority = curryPriority[a.name] ?? 99
          const bPriority = curryPriority[b.name] ?? 99
          if (aPriority !== bPriority) return aPriority - bPriority
          return a.name.localeCompare(b.name)
        })
      : baseFilteredItems
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE))
  const pageStart = (activePage - 1) * ITEMS_PER_PAGE
  const pagedItems = filteredItems.slice(pageStart, pageStart + ITEMS_PER_PAGE)
  const activeItem = activeIndex === null ? null : filteredItems[activeIndex]

  const closeLightbox = useCallback(() => setActiveIndex(null), [])
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return current === 0 ? filteredItems.length - 1 : current - 1
    })
  }, [filteredItems.length])
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return current === filteredItems.length - 1 ? 0 : current + 1
    })
  }, [filteredItems.length])

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

  useEffect(() => {
    if (activePage > totalPages) {
      setActivePage(1)
    }
  }, [activePage, totalPages])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCaptionIndex((current) => (current + 1) % CAPTIONS.length)
    }, 4800)
    return () => window.clearInterval(timerId)
  }, [CAPTIONS.length])

  const getTileClass = (index: number) => {
    const pattern = [
      'lg:col-span-2 lg:row-span-2',
      'lg:col-span-1 lg:row-span-1',
      'lg:col-span-1 lg:row-span-1',
      'lg:col-span-1 lg:row-span-1',
      'lg:col-span-1 lg:row-span-1',
      'lg:col-span-1 lg:row-span-1',
      'lg:col-span-2 lg:row-span-1',
      'lg:col-span-1 lg:row-span-1',
    ]
    return pattern[index % pattern.length]
  }

  const renderQuoteCaption = (caption: string) => {
    const winkEmoji = '😉'
    if (!caption.includes(winkEmoji)) return caption
    const [beforeWink, ...remaining] = caption.split(winkEmoji)
    const afterWink = remaining.join(winkEmoji)
    return (
      <>
        {beforeWink}
        <span className="not-italic">{winkEmoji}</span>
        {afterWink}
      </>
    )
  }

  return (
    <div className="border-t border-neutral-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(127,29,29,0.16),_transparent_42%),radial-gradient(circle_at_80%_75%,_rgba(120,53,15,0.14),_transparent_45%)] pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-12 lg:pt-24 dark:border-neutral-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(127,29,29,0.26),_transparent_42%),radial-gradient(circle_at_80%_75%,_rgba(161,98,7,0.14),_transparent_45%),#090909]">
      <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-4 lg:px-5">
        <header className="max-w-4xl">
          <p className="animate-gallery-eyebrow-in text-xs font-semibold uppercase tracking-[0.24em] text-amber-700/80 dark:text-amber-300/75">
            Our Kitchen, Your Senses
          </p>
          <h1 className="animate-gallery-title-in mt-3 font-serif text-[clamp(2.8rem,7.5vw,5.8rem)] font-medium leading-[0.98] tracking-tight text-neutral-900 dark:text-neutral-100">
            The <span className="italic text-amber-700 dark:text-amber-300">Visual</span>
            <br />
            Tasting Menu
          </h1>
          <div className="mt-6 h-px w-14 bg-amber-700/70 dark:bg-amber-300/70" />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            A visual tasting menu inspired by sushi craft, dumpling artistry,
            and signature Asian flavors.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveIndex(null)
                setActiveFilter(category)
                setActivePage(1)
              }}
              className={`border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                activeFilter === category
                  ? 'border-amber-700 bg-amber-700 text-white dark:border-amber-300 dark:bg-amber-300 dark:text-neutral-900'
                  : 'border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:text-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4 lg:auto-rows-[235px]">
          {pagedItems.map((item, index) => (
            <li
              key={item.id}
              className={`min-w-0 ${getTileClass(index)}`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(pageStart + index)}
                className="group relative m-0 block aspect-[4/3] h-full w-full overflow-hidden bg-neutral-200 text-left shadow-sm ring-1 ring-black/5 transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red lg:aspect-auto dark:bg-neutral-800 dark:ring-white/10"
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
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-16 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-200/90">
                    {item.category}
                  </p>
                  <p className="mt-1 font-serif text-xl leading-tight text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-white/80">Tap to view</p>
                </figcaption>
              </button>
            </li>
          ))}
        </ul>

        {totalPages > 1 ? (
          <div className="mt-7 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={`page-${index + 1}`}
                type="button"
                onClick={() => {
                  setActiveIndex(null)
                  setActivePage(index + 1)
                }}
                className={`inline-flex items-center justify-center rounded-full border text-xs font-semibold transition ${
                  activePage === index + 1
                    ? 'h-9 w-9 border-amber-700 bg-amber-700 text-white dark:border-amber-300 dark:bg-amber-300 dark:text-neutral-900'
                    : 'h-7 w-7 border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:text-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100'
                }`}
                aria-label={`Show gallery page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-8 border border-neutral-200/80 bg-neutral-50/80 px-6 py-7 text-center dark:border-neutral-800 dark:bg-neutral-900/70 sm:px-10">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-700 transition-opacity duration-500 dark:text-neutral-200 sm:text-xl">
            {renderQuoteCaption(CAPTIONS[captionIndex])}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {CAPTIONS.map((_, index) => (
              <button
                key={`caption-dot-${index}`}
                type="button"
                onClick={() => setCaptionIndex(index)}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  captionIndex === index
                    ? 'scale-125 bg-zen-red dark:bg-red-400'
                    : 'bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500'
                }`}
                aria-label={`Show caption ${index + 1}`}
              />
            ))}
          </div>
        </div>
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
              className="max-h-[82vh] w-full object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-200/85">
                {activeItem.category}
              </p>
              <p className="mt-1 text-sm text-white/90 sm:text-base">{activeItem.name}</p>
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
