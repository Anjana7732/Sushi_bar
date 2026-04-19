export function ReservationsSection() {
  return (
    <section
      className="border-t border-neutral-200/80 bg-neutral-50 py-16 sm:py-20"
      aria-labelledby="reservations-heading"
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="reservations-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-neutral-950"
        >
          Reservations
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-neutral-500 sm:text-base">
          Placeholder for the reservation flow. Hook your form or booking widget
          here.
        </p>
      </div>
    </section>
  )
}
