import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { footerColumns, primaryNavLinks } from '../config/siteNav'

/** Scroll to top on client-side route changes (BrowserRouter, not data router). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-neutral-900 antialiased">
      <ScrollToTop />
      <Navbar
        links={primaryNavLinks}
        ctaLabel="Reservations"
        ctaTo="/reservations"
      />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer
        brandName="Asian Spice kitchen"
        tagline="Authentic flavors, modern elegance, and a calm space to gather."
        year={2024}
        columns={footerColumns}
      />
    </div>
  )
}
