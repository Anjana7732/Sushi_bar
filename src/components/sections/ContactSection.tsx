export function ContactSection() {
  return (
    <section
      className="border-t border-neutral-200/80 bg-white py-16 sm:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-neutral-950"
        >
          Contact
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          Dummy block for layout parity. Replace with hours, map, and inquiry
          form when you wire real content.
        </p>
        <dl className="mt-8 grid gap-6 text-sm text-neutral-600 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Phone
            </dt>
            <dd className="mt-1 font-medium text-neutral-900">+1 (415) 555-0198</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Email
            </dt>
            <dd className="mt-1 font-medium text-neutral-900">hello@asianspicekitchen.com</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
