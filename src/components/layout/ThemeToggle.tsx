import { Moon, Sun } from 'lucide-react'

import { useTheme } from '../../theme/useTheme'

type ThemeToggleProps = {
  className?: string
  /** Menu page navbar (light/dark bar styling). */
  menuChrome?: boolean
}

export function ThemeToggle({ className = '', menuChrome }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={
        menuChrome
          ? `inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red dark:border-neutral-600 dark:bg-neutral-900 dark:text-amber-200 dark:hover:bg-neutral-800 dark:focus-visible:outline-rose-400 ${className}`
          : `inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zen-red dark:border-neutral-600 dark:bg-neutral-800 dark:text-amber-200 dark:hover:bg-neutral-700 ${className}`
      }
    >
      {isDark ? (
        <Sun className="size-[18px]" strokeWidth={2} aria-hidden />
      ) : (
        <Moon className="size-[18px]" strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}
