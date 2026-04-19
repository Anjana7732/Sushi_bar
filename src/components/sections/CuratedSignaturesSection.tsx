import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type SignatureItem = {
  id: string
  title: string
  price: string
  description: string
  imageSrc: string
  imageAlt: string
  featured?: boolean
}

const ITEMS: SignatureItem[] = [
  {
    id: 'murgh',
    title: 'Murgh Makhani',
    price: '$22',
    description:
      'Tender chicken simmered in a rich, creamy tomato sauce infused with aromatic spices.',
    imageSrc: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Murgh makhani in a bowl with rice and herbs',
    featured: true,
  },
  {
    id: 'padthai',
    title: 'Bangkok Pad Thai',
    price: '$20',
    description:
      'Stir-fried rice noodles with tamarind, peanuts, and fresh lime.',
    imageSrc: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pad Thai on a plate with lime',
  },
  {
    id: 'samosa',
    title: 'Artisan Samosa Chaat',
    price: '$15',
    description:
      'Crispy pastries topped with tangy chutneys, yogurt, and chaat masala.',
    imageSrc: 'https://images.unsplash.com/photo-1601050690597-23743a6c57b5?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Chaat-style samosas with chutney',
  },
]

function SignatureCard({ item, large }: { item: SignatureItem; large?: boolean }) {
  return (
    <article
      className={
        large
          ? 'flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04] dark:bg-neutral-900 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] dark:ring-white/10'
          : 'flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-22px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04] dark:bg-neutral-900 dark:shadow-[0_16px_40px_-22px_rgba(0,0,0,0.45)] dark:ring-white/10'
      }
    >
      <div className={large ? 'aspect-[16/10] w-full sm:aspect-[16/9]' : 'aspect-[16/10] w-full'}>
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          width={large ? 1200 : 900}
          height={large ? 675 : 560}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-6 pb-7 pt-6 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl dark:text-neutral-50">
            {item.title}
          </h3>
          <span className="shrink-0 pt-0.5 font-sans text-base font-semibold text-zen-red sm:text-lg">
            {item.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{item.description}</p>
      </div>
    </article>
  )
}

export function CuratedSignaturesSection() {
  const featured = ITEMS.find((i) => i.featured)!
  const stacked = ITEMS.filter((i) => !i.featured)

  return (
    <section
      className="border-t border-neutral-200/80 bg-white py-16 sm:py-20 lg:py-24 dark:border-neutral-800 dark:bg-neutral-950"
      aria-labelledby="curated-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <header className="max-w-xl">
            <h2
              id="curated-heading"
              className="font-serif text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-neutral-50"
            >
              Curated Signatures
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base dark:text-neutral-400">
              A handpicked selection of our most celebrated dishes, crafted with
              passion and the finest seasonal ingredients.
            </p>
          </header>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 self-start text-xs font-semibold uppercase tracking-[0.22em] text-neutral-700 transition hover:text-zen-red sm:self-auto dark:text-neutral-300 dark:hover:text-red-400"
          >
            View full gallery
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SignatureCard item={featured} large />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {stacked.map((item) => (
              <SignatureCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
