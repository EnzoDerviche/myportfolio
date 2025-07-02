"use client"

import { useState, useEffect } from "react"

interface UseTypewriterProps {
  text: string
  speed?: number
  deleteSpeed?: number
  delayBetweenCycles?: number
  initialDelay?: number
}

export function useTypewriter({
  text,
  speed = 50,
  deleteSpeed = 30,
  delayBetweenCycles = 2000,
  initialDelay = 500,
}: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) {
      const initialTimeout = setTimeout(() => {
        setHasStarted(true)
      }, initialDelay)
      return () => clearTimeout(initialTimeout)
    }

    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)
      } else {
        setIsComplete(true)
        timeout = setTimeout(() => {
          setIsDeleting(true)
          setIsComplete(false)
        }, delayBetweenCycles)
      }
    } else {
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
          setCurrentIndex((prev) => prev - 1)
        }, deleteSpeed)
      } else {
        setIsDeleting(false)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, text, speed, deleteSpeed, delayBetweenCycles, initialDelay, hasStarted])

  return { displayText, isComplete, isDeleting }
}
