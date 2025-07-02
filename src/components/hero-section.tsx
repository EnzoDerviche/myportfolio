"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"
import { useTypewriter } from "@/hooks/use-typewriter"

// interface HeroSectionProps {
//   scrollToSection: (sectionId: string) => void
// }

export default function HeroSection() {
  const { displayText, isComplete, isDeleting } = useTypewriter({
    text: "Desarrollador Full Stack con experiencia en React, Node.js y migración de sistemas legacy",
    speed: 50, // Velocidad de escritura
    deleteSpeed: 30, // Velocidad de borrado (más rápido)
    delayBetweenCycles: 3000, // Pausa de 3 segundos cuando termina de escribir
    initialDelay: 1000, // Delay inicial de 1 segundo
  })

  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <Image
              src="/img/profile.jpg"
              alt="Profile"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
              priority
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enzo Derviche
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto min-h-[3.5rem] flex items-center justify-center">
              <p className="relative">
                {displayText}
                <span
                  className={`inline-block w-0.5 h-6 md:h-8 bg-blue-500 ml-1 transition-opacity duration-100 ${
                    isComplete && !isDeleting ? "animate-pulse" : "animate-pulse"
                  }`}
                />
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" asChild>
              <a href="/Enzo_Derviche_CV.pdf" download="Enzo_Derviche_CV.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Descargar CV
              </a>
            </Button>
            {/* <Button size="lg" variant="outline" onClick={() => scrollToSection("projects")} className="px-8 py-3">
              Ver mis trabajos
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
