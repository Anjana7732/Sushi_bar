import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import heroBackdrop from '../../assets/zen-landing-reference.png'

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={heroBackdrop}
          alt=""
          className="h-full w-full object-cover object-[center_12%] opacity-[0.58] sm:object-[center_8%] dark:opacity-40"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/55 to-white/85 dark:from-neutral-950/20 dark:via-neutral-950/65 dark:to-neutral-950/85" />
      </div>

      <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:min-h-[min(90vh,880px)] lg:px-8 lg:py-28">
        <h1 className="max-w-4xl font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-tight text-neutral-950 dark:text-neutral-50">
          <span className="block">Explore the Art</span>
          <span className="mt-1 block font-semibold italic text-zen-red sm:mt-2 sm:text-[clamp(2.75rem,6vw,4.5rem)]">
            of Asian Cuisine
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base dark:text-neutral-400">
          Discover a symphony of flavors where ancient recipes meet modern
          elegance. Join us for an unforgettable journey through the senses.
        </p>
        <Link
          to="/reservations"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-zen-red px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-md transition hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red"
        >
          Reserve a table
          <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </section>
  )
}
