const CHEF_IMAGE =
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80'

export function PhilosophySection() {
  return (
    <section
      className="border-t border-neutral-200/80 bg-neutral-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Our philosophy
          </p>
          <h2
            id="philosophy-heading"
            className="mt-3 font-serif text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.65rem] lg:leading-tight"
          >
            A Culinary Journey
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-500 sm:text-base">
            <p>
              At Asian Spice kitchen, we believe dining is more than a meal—it is a
              moment of connection. Every plate tells a story of tradition,
              patience, and respect for ingredients.
            </p>
            <p>
              Our chefs honor time-honored techniques while embracing a modern
              sensibility, balancing depth, clarity, and beauty on every dish.
            </p>
            <p>
              We invite you to slow down, savor each bite, and experience the
              calm focus that defines our kitchen.
            </p>
          </div>
        </div>
        <figure className="m-0 overflow-hidden rounded-3xl shadow-[0_24px_60px_-28px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.05]">
          <img
            src={CHEF_IMAGE}
            alt="Chef carefully plating a dish in the kitchen"
            width={900}
            height={1200}
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full object-cover object-center sm:aspect-[4/5] lg:min-h-[28rem]"
          />
        </figure>
      </div>
    </section>
  )
}
