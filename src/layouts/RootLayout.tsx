import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import {
  footerColumns,
  menuFooterInlineLinks,
  primaryNavLinks,
} from '../config/siteNav'

/** Scroll to top on client-side route changes (BrowserRouter, not data router). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function RootLayout() {
  const { pathname } = useLocation()
  const isMenuRoute = pathname === '/menu'
  const useMenuFooterVariant = pathname === '/menu' || pathname === '/gallery'

  return (
    <div className="flex min-h-dvh flex-col bg-white text-neutral-900 antialiased transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100">
      <ScrollToTop />
      <Navbar
        links={primaryNavLinks}
        ctaLabel="Reservations"
        ctaTo="/reservations"
        chrome={isMenuRoute ? 'menu' : 'default'}
      />
      <main
        id="main-content"
        className={
          isMenuRoute
            ? 'flex-1 bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100'
            : 'flex-1 bg-white dark:bg-neutral-950'
        }
      >
        <Outlet />
      </main>
      <Footer
        brandName="Asian Spice kitchen"
        tagline="Authentic flavors, modern elegance, and a calm space to gather."
        year={2024}
        columns={footerColumns}
        variant={useMenuFooterVariant ? 'menu' : 'default'}
        menuInlineLinks={useMenuFooterVariant ? menuFooterInlineLinks : undefined}
      />
    </div>
  )
}
