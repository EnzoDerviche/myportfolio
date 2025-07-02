"use client"

import { Code } from "lucide-react"

interface FooterProps {
  isDark: boolean
}

export default function Footer({ isDark }: FooterProps) {

  return (
    <footer className={`py-8 border-t ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Code className="h-6 w-6 text-blue-500 mr-2" />
            <span className="font-semibold">Enzo Derviche - Developer Portfolio</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} Enzo Derviche. Todos los derechos reservados.</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-300"/>
      </div>
    </footer>
  )
}
