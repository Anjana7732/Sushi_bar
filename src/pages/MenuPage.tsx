export function MenuPage() {
  return (
    <div className="border-t border-neutral-200/80 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Menu
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base">
            Dummy page for the full menu. Swap this block for categories, PDFs,
            dietary filters, or CMS-driven items when you are ready.
          </p>
        </header>
        <ul className="mt-10 grid list-none gap-3 p-0 sm:grid-cols-2">
          {['Small plates', 'Noodles & rice', 'Curries', 'Sushi & sashimi', 'Desserts', 'Drinks'].map(
            (cat) => (
              <li
                key={cat}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-medium text-neutral-800"
              >
                {cat}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}
