"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
// import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
// Importar el hook personalizado al inicio del archivo:
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
// Importar el componente ScrollIndicator:
import ScrollIndicator from "@/components/scroll-indicator"
// Reemplazar el useEffect de scroll detection con el hook personalizado:
import { useScrollSpy } from "@/hooks/use-scroll-spy"

export default function DeveloperPortfolio() {
  const [isDark, setIsDark] = useState(false)
  // Reemplazar el useState y useEffect existentes con:
  const activeSection = useScrollSpy(["hero", "about", "skills", "projects", "contact"])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  // Reemplazar la función scrollToSection existente con:
  const { scrollToSection } = useSmoothScroll()

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <Navigation
        isDark={isDark}
        activeSection={activeSection}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
      />
      <ScrollIndicator />
      <HeroSection />
      <AboutSection />
      <SkillsSection isDark={isDark} />
      {/* <ProjectsSection /> */}
      <ContactSection isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  )
}
