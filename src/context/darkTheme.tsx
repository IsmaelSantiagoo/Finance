import { createContext, useEffect, useState } from 'react'

interface DarkThemeContextProps {
  isDark: boolean
  toggleTheme: (theme: 'light' | 'dark') => void
  setTheme: (theme: 'dark' | 'light') => void
}

interface DarkThemeProviderProps {
  children: React.ReactNode
}

export const DarkThemeContext = createContext({} as DarkThemeContextProps)

export const DarkThemeProvider = ({ children }: DarkThemeProviderProps) => {
  const [isDark, setIsDark] = useState<boolean>(false)

  const setTheme = (theme: 'dark' | 'light') => {
    const html = document.getElementsByTagName('html')[0]

    if (html) {
      if (theme === 'dark' && !html.classList.contains('dark')) {
        html.classList.add('dark')
      } else if (theme === 'light' && html.classList.contains('dark')) {
        html.classList.remove('dark')
      }
    }

    const themeLink = document.getElementById('theme-link')

    if (themeLink) {
      themeLink.setAttribute('href', `/themes/lara-${theme}-blue/theme.css`)
    }

    localStorage.setItem('isDark', (theme === 'dark').toString())
    setIsDark(theme === 'dark')
  }

  const toggleTheme = (theme: 'light' | 'dark') => {
    setTheme(theme)
  }

  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const storage = localStorage.getItem('isDark')

    if (storage) {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  return (
    <DarkThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </DarkThemeContext.Provider>
  )
}
