import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CuratedSignaturesSection } from '../components/sections/CuratedSignaturesSection'
import { HeroSection } from '../components/sections/HeroSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CuratedSignaturesSection />
      <section
        className="border-t border-neutral-200/80 bg-neutral-50 py-16 text-center sm:py-20"
        aria-labelledby="philosophy-teaser-heading"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Our philosophy
          </p>
          <h2
            id="philosophy-teaser-heading"
            className="mt-3 font-serif text-3xl font-semibold tracking-tight text-neutral-950"
          >
            A calmer way to dine
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500 sm:text-base">
            Thoughtful pacing, precise technique, and ingredients treated with
            respect—crafted for guests who love food and quiet focus.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 transition hover:text-zen-red"
          >
            Read our story
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
