import { useCallback, useEffect, useState } from 'react'

import { MenuCategoryNav } from '../components/menu/MenuCategoryNav'
import { MenuHero } from '../components/menu/MenuHero'
import { MenuSectionBlock } from '../components/menu/MenuSectionBlock'
import {
  MENU_CATEGORIES,
  MENU_SECTIONS,
  type MenuCategoryId,
} from '../data/menuPageData'

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('indian')

  const scrollToCategory = useCallback((id: MenuCategoryId) => {
    setActiveCategory(id)
    const section = MENU_SECTIONS.find((s) => s.categoryId === id)
    if (!section) return
    document.getElementById(`section-${section.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  useEffect(() => {
    const elements = MENU_SECTIONS.map((s) =>
      document.getElementById(`section-${s.id}`),
    ).filter((n): n is HTMLElement => n !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0.15)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible?.target?.id) return
        const sid = visible.target.id.replace('section-', '')
        const sec = MENU_SECTIONS.find((s) => s.id === sid)
        if (sec) setActiveCategory(sec.categoryId)
      },
      { root: null, rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.15, 0.35, 0.55] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-full bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <MenuHero />
      <div className="sticky top-16 z-30">
        <MenuCategoryNav
          categories={MENU_CATEGORIES}
          activeId={activeCategory}
          onSelect={scrollToCategory}
        />
      </div>
      {MENU_SECTIONS.map((section) => (
        <MenuSectionBlock key={section.id} section={section} />
      ))}
    </div>
  )
}
