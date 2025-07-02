"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Sun, Moon, Menu, X } from "lucide-react"

interface NavigationProps {
  isDark: boolean
  activeSection: string
  toggleTheme: () => void
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ isDark, activeSection, toggleTheme, scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "skills", label: "Skills" },
    // { id: "projects", label: "Proyectos" },
    { id: "contact", label: "Contacto" },
  ]

  const handleNavClick = (sectionId: string) => {
    // Agregar efecto de clic visual
    const button = document.querySelector(`[data-section="${sectionId}"]`)
    if (button) {
      button.classList.add("scale-95")
      setTimeout(() => {
        button.classList.remove("scale-95")
      }, 150)
    }

    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-sm border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Code className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">EnzoDev</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  data-section={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    activeSection === item.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                data-section={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 transform hover:scale-105 ${
                  activeSection === item.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : isDark
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
