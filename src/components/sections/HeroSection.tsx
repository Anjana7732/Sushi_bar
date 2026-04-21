import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [typedCount, setTypedCount] = useState(0)
  const [showDescription, setShowDescription] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const welcomeText = 'Welcome to Asian Spice Kitchen'

  const heroBackgrounds = [
    // Curated hero visuals: dumplings, sushi art, and premium Asian dish plating.
    'url("https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=2200&q=80")',
    'url("https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=2200&q=80")',
    'url("https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=2200&q=80")',
  ]

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)')
    const isMobile = mobileQuery.matches

    // One-time reveal for body and CTA after the first heading stabilizes.
    const descriptionTimer = window.setTimeout(() => {
      setShowDescription(true)
    }, isMobile ? 1450 : 1650)
    const buttonTimer = window.setTimeout(() => {
      setShowButton(true)
    }, isMobile ? 1900 : 2200)

    // Continuous headline loop:
    // typed welcome -> hold -> crossfade to main heading -> hold -> repeat.
    const typingStep = isMobile ? 42 : 48
    const welcomeHold = isMobile ? 800 : 980
    const mainHold = isMobile ? 2300 : 2600
    const timers: number[] = []
    let disposed = false

    const addTimer = (callback: () => void, delay: number) => {
      const timerId = window.setTimeout(() => {
        if (!disposed) {
          callback()
        }
      }, delay)
      timers.push(timerId)
    }

    const startMainPhase = () => {
      setShowWelcome(false)
      addTimer(startWelcomePhase, mainHold)
    }

    const startWelcomePhase = () => {
      setShowWelcome(true)
      setTypedCount(0)

      const revealCharacter = (nextCount: number) => {
        setTypedCount(nextCount)
        if (nextCount < welcomeText.length) {
          addTimer(() => revealCharacter(nextCount + 1), typingStep)
          return
        }

        addTimer(startMainPhase, welcomeHold)
      }

      addTimer(() => revealCharacter(1), 110)
    }

    startWelcomePhase()

    return () => {
      disposed = true
      window.clearTimeout(descriptionTimer)
      window.clearTimeout(buttonTimer)
      timers.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [welcomeText.length])

  return (
    <section
      className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {heroBackgrounds.map((backgroundImage, index) => (
          <div
            key={backgroundImage}
            className="absolute inset-0 bg-cover bg-center brightness-110 contrast-105 saturate-110 dark:brightness-90 dark:contrast-105 dark:saturate-100 motion-safe:animate-hero-bg-kenburns motion-safe:animate-hero-bg-fade"
            style={{
              backgroundImage,
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/28 to-black/40 motion-safe:animate-hero-overlay-shift dark:from-black/44 dark:via-black/48 dark:to-black/62" />
      </div>

      <div className="relative mx-auto flex min-h-[min(92vh,900px)] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:min-h-[min(94vh,960px)] lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute inset-x-4 top-[40%] w-auto -translate-y-1/2 sm:inset-x-6 lg:inset-x-8">
          <h1
            className={`absolute inset-0 flex items-center justify-center font-serif text-[clamp(2.8rem,8.5vw,6.8rem)] font-semibold leading-[1.03] tracking-[0.015em] text-white drop-shadow-[0_8px_26px_rgba(0,0,0,0.48)] transition-all duration-700 motion-safe:animate-hero-heading-float motion-reduce:transition-none ${
              showWelcome ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="inline-flex items-center motion-safe:animate-hero-inline-enter">
              {welcomeText.slice(0, typedCount)}
              <span className="hero-typing-caret ml-0.5" aria-hidden>
                |
              </span>
            </span>
          </h1>

          <h1
            className={`absolute inset-0 flex items-center justify-center font-serif text-[clamp(2.8rem,8.5vw,6.8rem)] font-semibold leading-[1.04] tracking-[0.015em] text-white drop-shadow-[0_8px_26px_rgba(0,0,0,0.48)] transition-all duration-700 motion-safe:animate-hero-heading-float motion-reduce:transition-none ${
              showWelcome ? 'opacity-0' : 'opacity-100'
            }`}
            aria-live="polite"
          >
            <span className="motion-safe:animate-hero-inline-enter">
              Explore the Art of{' '}
              <span className="hero-accent-word text-amber-400 dark:text-amber-300">
                Asian Cuisine
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-auto pb-3 sm:pb-5">
          <p
            className={`mx-auto mt-12 max-w-xl text-sm leading-relaxed text-neutral-100 transition-all duration-700 motion-reduce:transition-none sm:mt-14 sm:text-base ${
              showDescription
                ? 'translate-y-0 opacity-100 blur-0 motion-safe:animate-hero-body-in'
                : 'translate-y-3 opacity-0 blur-[2px]'
            }`}
          >
            Discover a symphony of flavors where ancient recipes meet modern
            elegance. Join us for an unforgettable journey through the senses.
          </p>
          <Link
            to="/reservations"
            className={`mt-8 inline-flex items-center gap-2 rounded-full bg-zen-red px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-md transition-all duration-700 motion-reduce:transition-none hover:-translate-y-0.5 hover:bg-red-900 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red sm:mt-10 ${
              showButton
                ? 'translate-y-0 opacity-100 blur-0 motion-safe:animate-hero-cta-in'
                : 'translate-y-3 opacity-0 blur-[2px]'
            }`}
          >
            Reserve a table
            <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
