import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Users,
} from 'lucide-react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'

const TIME_OPTIONS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
] as const

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6] as const

function todayIsoDate(): string {
  const t = new Date()
  const y = t.getFullYear()
  const m = String(t.getMonth() + 1).padStart(2, '0')
  const d = String(t.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function FieldShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border border-zk-line bg-white px-3 py-2.5 transition focus-within:border-zk-crimson focus-within:shadow-[0_0_0_3px_rgba(123,27,46,0.08)] ${className}`}
    >
      {children}
    </div>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-3.5">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-zk-crimson text-white">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-zk-muted">
          {label}
        </div>
        <div className="text-[0.88rem] font-light leading-relaxed text-zk-ink">
          {children}
        </div>
      </div>
    </div>
  )
}

type ReservationSummary = {
  name: string
  dateLabel: string
  time: string
  guestsLabel: string
  email: string
}

export function ContactReservationView() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('18:00')
  const [guests, setGuests] = useState(2)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [summary, setSummary] = useState<ReservationSummary | null>(null)
  const [shakeConfirm, setShakeConfirm] = useState(false)

  useEffect(() => {
    setDate(todayIsoDate())
  }, [])

  const closeModal = useCallback(() => {
    setOverlayOpen(false)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!overlayOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [overlayOpen, closeModal])

  const confirmReservation = () => {
    const fn = firstName.trim()
    const ln = lastName.trim()
    const em = email.trim()
    if (!date || !fn || !ln || !em) {
      setShakeConfirm(true)
      window.setTimeout(() => setShakeConfirm(false), 400)
      return
    }

    const dateLabel = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const guestsLabel = `${guests} ${guests === 1 ? 'Person' : 'People'}`

    setSummary({
      name: `${fn} ${ln}`,
      dateLabel,
      time,
      guestsLabel,
      email: em,
    })
    setOverlayOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const openDirections = () => {
    const q = encodeURIComponent('123 Culinary Ave, San Francisco, CA 94103')
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="font-zk-ui text-zk-ink">
      <header className="px-4 py-16 text-center sm:px-6 sm:py-[4.5rem]">
        <h1 className="font-zk-display text-[clamp(2.4rem,5vw,3.8rem)] font-light tracking-wide text-zk-ink">
          Reserve Your Table
        </h1>
        <p className="mx-auto mt-4 max-w-[30rem] text-[0.92rem] font-light leading-[1.7] text-zk-mid">
          Join us for an unforgettable dining experience. For parties larger than six,
          please contact us directly.
        </p>
      </header>

      <div className="mx-auto mb-20 w-full max-w-[1000px] px-4 sm:px-8">
        <div
          id="reservation-form"
          className="grid overflow-hidden rounded-[10px] border border-zk-line bg-white shadow-[0_4px_24px_rgba(123,27,46,0.08)] md:grid-cols-2"
        >
          {/* Form */}
          <div className="border-zk-line p-7 sm:p-9 max-md:border-b md:border-r md:p-11">
            <h2 className="mb-7 font-zk-display text-2xl font-normal text-zk-ink">
              Reservation Details
            </h2>

            <div className="mb-7 grid grid-cols-1 gap-3.5 md:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  Date
                </span>
                <FieldShell>
                  <Calendar className="size-[15px] shrink-0 text-zk-muted" strokeWidth={2} aria-hidden />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="min-w-0 flex-1 border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none"
                  />
                </FieldShell>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  Time
                </span>
                <FieldShell>
                  <Clock className="size-[15px] shrink-0 text-zk-muted" strokeWidth={2} aria-hidden />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </FieldShell>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  Guests
                </span>
                <FieldShell>
                  <Users className="size-[15px] shrink-0 text-zk-muted" strokeWidth={2} aria-hidden />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none"
                  >
                    {GUEST_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </FieldShell>
              </div>
            </div>

            <hr className="my-7 border-0 border-t border-zk-line" />

            <p className="mb-5 font-zk-display text-xl font-normal text-zk-ink">
              Contact Information
            </p>

            <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  First Name
                </span>
                <FieldShell>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Jane"
                    autoComplete="given-name"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none placeholder:text-[#bbb]"
                  />
                </FieldShell>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  Last Name
                </span>
                <FieldShell>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    autoComplete="family-name"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none placeholder:text-[#bbb]"
                  />
                </FieldShell>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  Email Address
                </span>
                <FieldShell>
                  <Mail className="size-3.5 shrink-0 text-zk-muted" strokeWidth={2} aria-hidden />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none placeholder:text-[#bbb]"
                  />
                </FieldShell>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                  Phone Number
                </span>
                <FieldShell>
                  <Phone className="size-3.5 shrink-0 text-zk-muted" strokeWidth={2} aria-hidden />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none placeholder:text-[#bbb]"
                  />
                </FieldShell>
              </div>
            </div>

            <div className="mt-[18px] rounded-md border border-zk-line px-3 py-3 transition focus-within:border-zk-crimson focus-within:shadow-[0_0_0_3px_rgba(123,27,46,0.08)]">
              <span className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.1em] text-zk-muted">
                Special Requests / Dietary Restrictions
              </span>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Allergies, special occasions, etc."
                rows={4}
                className="min-h-[90px] w-full resize-none border-0 bg-transparent text-[0.88rem] font-light text-zk-ink outline-none placeholder:text-[#bbb]"
              />
            </div>

            <button
              type="button"
              onClick={confirmReservation}
              className={`mt-7 flex w-full items-center justify-center gap-2.5 rounded-[7px] bg-zk-crimson px-4 py-[15px] text-[0.92rem] font-medium tracking-[0.08em] text-white shadow-sm transition hover:-translate-y-px hover:bg-zk-crimson-light hover:shadow-[0_6px_20px_rgba(123,27,46,0.22)] active:translate-y-0 ${shakeConfirm ? 'animate-zk-shake' : ''}`}
            >
              Confirm Reservation
              <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            </button>
          </div>

          {/* Info + map */}
          <div className="flex flex-col gap-8 bg-zk-panel p-7 sm:p-9 md:px-9 md:py-11">
            <h2 className="font-zk-display text-2xl font-normal text-zk-ink">Get in Touch</h2>

            <div className="flex flex-col gap-5">
              <InfoRow
                label="Location"
                icon={<MapPin className="size-3.5" strokeWidth={2} aria-hidden />}
              >
                <p>
                  123 Culinary Ave
                  <br />
                  San Francisco, CA 94103
                </p>
              </InfoRow>
              <InfoRow
                label="Phone"
                icon={<Phone className="size-3.5" strokeWidth={2} aria-hidden />}
              >
                <p>+1 (415) 555-0198</p>
              </InfoRow>
              <InfoRow
                label="Email"
                icon={<Mail className="size-3.5" strokeWidth={2} aria-hidden />}
              >
                <p>reservations@asianspicekitchen.com</p>
              </InfoRow>
              <InfoRow
                label="Hours"
                icon={<Clock className="size-3.5" strokeWidth={2} aria-hidden />}
              >
                <p>
                  Tue – Sun: 17:00 – 23:00
                  <br />
                  Mon: Closed
                </p>
              </InfoRow>
            </div>

            <div className="relative mt-auto h-[150px] overflow-hidden rounded-lg bg-gradient-to-br from-[#e8dde0] to-[#d6c9cd]">
              <MapPin
                className="pointer-events-none absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-[55%] text-zk-crimson/85 drop-shadow-md"
                strokeWidth={1.75}
                aria-hidden
              />
              <button
                type="button"
                onClick={openDirections}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-[5px] border border-zk-line bg-white px-3.5 py-2 text-[0.75rem] font-medium tracking-[0.06em] text-zk-ink transition hover:bg-zk-blush"
              >
                <Navigation className="size-3" strokeWidth={2.5} aria-hidden />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success overlay */}
      {overlayOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(20,5,8,0.65)] px-5 backdrop-blur-[4px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="res-success-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div
            className="animate-zk-modal-in w-full max-w-[460px] rounded-[14px] bg-white px-9 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:px-11"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-6 flex size-[72px] items-center justify-center rounded-full bg-zk-crimson text-white">
              <Check className="size-8" strokeWidth={2.5} aria-hidden />
            </div>
            <h2
              id="res-success-title"
              className="mb-2.5 font-zk-display text-[2rem] font-normal text-zk-ink"
            >
              Reservation Confirmed!
            </h2>
            <p className="text-[0.9rem] font-light leading-[1.7] text-zk-mid">
              Thank you! We look forward to welcoming you.
              <br />A confirmation email will be sent shortly.
            </p>

            {summary ? (
              <div className="my-5 flex flex-col gap-2.5 rounded-lg bg-zk-panel px-5 py-4 text-left">
                <div className="flex justify-between gap-4 text-[0.88rem]">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-zk-muted">
                    Name
                  </span>
                  <span className="font-normal text-zk-ink">{summary.name}</span>
                </div>
                <div className="flex justify-between gap-4 text-[0.88rem]">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-zk-muted">
                    Date
                  </span>
                  <span className="text-right font-normal text-zk-ink">{summary.dateLabel}</span>
                </div>
                <div className="flex justify-between gap-4 text-[0.88rem]">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-zk-muted">
                    Time
                  </span>
                  <span className="font-normal text-zk-ink">{summary.time}</span>
                </div>
                <div className="flex justify-between gap-4 text-[0.88rem]">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-zk-muted">
                    Guests
                  </span>
                  <span className="font-normal text-zk-ink">{summary.guestsLabel}</span>
                </div>
                <div className="flex justify-between gap-4 text-[0.88rem]">
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-zk-muted">
                    Email
                  </span>
                  <span className="min-w-0 truncate font-normal text-zk-ink">{summary.email}</span>
                </div>
              </div>
            ) : null}

            <p className="text-[0.8rem] text-zk-muted">
              For changes or cancellations, contact us at least 24 hours in advance.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-2 w-full rounded-[7px] bg-zk-crimson py-3.5 text-[0.9rem] font-medium tracking-[0.06em] text-white transition hover:bg-zk-crimson-light"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
