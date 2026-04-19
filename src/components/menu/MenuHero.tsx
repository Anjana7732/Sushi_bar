const HERO_IMAGE =
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=85'

export function MenuHero() {
  return (
    <div className="border-b border-neutral-200/90 bg-white dark:border-neutral-800/80 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <h1 className="font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
            <span className="text-neutral-900 dark:text-white">Culinary </span>
            <span className="text-zen-red dark:text-rose-400">Mastery</span>
          </h1>
          <p className="mt-5 text-sm font-light leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            Explore a tapestry of bold Asian flavors—crafted with precision,
            fire, and respect for every ingredient on your plate.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="relative mx-auto aspect-square max-w-[min(100%,22rem)] overflow-hidden rounded-full shadow-[0_0_48px_-14px_rgba(220,38,38,0.22)] ring-1 ring-red-200/80 dark:shadow-[0_0_60px_-12px_rgba(244,63,94,0.35)] dark:ring-rose-500/25 sm:max-w-md lg:ml-auto lg:mr-0"
          >
            <img
              src={HERO_IMAGE}
              alt="Bowl of ramen with salmon, egg, and greens"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-white/55 via-transparent to-transparent dark:from-neutral-950/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
