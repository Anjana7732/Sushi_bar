import { createContext, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
} | null>(null)

export type ThemeProviderProps = { children: ReactNode }
