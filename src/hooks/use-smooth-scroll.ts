"use client"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const elementPosition = element.offsetTop - offset
    const startPosition = window.pageYOffset
    const distance = elementPosition - startPosition
    const duration = Math.abs(distance) / 2 // Velocidad adaptativa
    let start: number | null = null

    function animation(currentTime: number) {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    // Función de easing para suavizar la animación
    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }, [])

  return { scrollToSection }
}
