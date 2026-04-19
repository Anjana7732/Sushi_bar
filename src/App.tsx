import { Route, Routes } from 'react-router-dom'

import { RootLayout } from './layouts/RootLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { ReservationsPage } from './pages/ReservationsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
      </Route>
    </Routes>
  )
}
