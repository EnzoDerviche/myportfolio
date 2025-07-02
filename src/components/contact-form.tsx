"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Clock } from "lucide-react"
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from "@/components/ui/card"

// Importamos emailjs
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  // Estados para rate limiting
  const [canSubmit, setCanSubmit] = useState(true)
  const [cooldownTime, setCooldownTime] = useState(0)
  const [submitCount, setSubmitCount] = useState(0)

  // Configuración de rate limiting
  const COOLDOWN_MINUTES = 2 // Tiempo de espera entre envíos
  const MAX_SUBMISSIONS_PER_HOUR = 3 // Máximo 3 emails por hora
  const STORAGE_KEY = "contact_form_data"

  // Verificar rate limiting al cargar el componente
  useEffect(() => {
    checkRateLimit()
  }, [])

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setCanSubmit(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [cooldownTime])

  const checkRateLimit = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    const data = JSON.parse(stored)
    const now = Date.now()

    // Limpiar envíos antiguos (más de 1 hora)
    const recentSubmissions = data.submissions?.filter((timestamp: number) => now - timestamp < 60 * 60 * 1000) || []

    // Verificar último envío
    const lastSubmission = data.lastSubmission || 0
    const timeSinceLastSubmission = now - lastSubmission
    const cooldownMs = COOLDOWN_MINUTES * 60 * 1000

    if (timeSinceLastSubmission < cooldownMs) {
      setCanSubmit(false)
      setCooldownTime(Math.ceil((cooldownMs - timeSinceLastSubmission) / 1000))
    }

    setSubmitCount(recentSubmissions.length)
  }

  const updateRateLimit = () => {
    const now = Date.now()
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : { submissions: [] }

    // Limpiar envíos antiguos
    const recentSubmissions = data.submissions?.filter((timestamp: number) => now - timestamp < 60 * 60 * 1000) || []

    // Agregar nuevo envío
    recentSubmissions.push(now)

    // Guardar en localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        lastSubmission: now,
        submissions: recentSubmissions,
      }),
    )

    setSubmitCount(recentSubmissions.length)
    setCanSubmit(false)
    setCooldownTime(COOLDOWN_MINUTES * 60)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar rate limiting
    if (!canSubmit) {
      setSubmitStatus({
        success: false,
        message: `Debes esperar ${Math.ceil(cooldownTime / 60)} minutos antes de enviar otro mensaje.`,
      })
      return
    }

    if (submitCount >= MAX_SUBMISSIONS_PER_HOUR) {
      setSubmitStatus({
        success: false,
        message: `Has alcanzado el límite de ${MAX_SUBMISSIONS_PER_HOUR} mensajes por hora. Intenta más tarde.`,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || ""
      const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || ""
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || ""

      console.log(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, process.env.NEXT_PUBLIC_PUBLIC_KEY);
      

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Enzo Derviche",
        reply_to: formData.email,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      // Actualizar rate limiting después del envío exitoso
      updateRateLimit()

      setSubmitStatus({
        success: true,
        message: "¡Mensaje enviado correctamente! Te responderé pronto.",
      })

      // Resetear el formulario
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error al enviar el mensaje:", error)
      setSubmitStatus({
        success: false,
        message: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envíame un mensaje</CardTitle>
        <CardDescription>
          Completa el formulario y te responderé lo antes posible
          {submitCount > 0 && (
            <span className="block text-sm text-gray-500 mt-1">
              Mensajes enviados en la última hora: {submitCount}/{MAX_SUBMISSIONS_PER_HOUR}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder="Tu nombre" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Tu email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Tu mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={8}
              className="min-h-32"
              required
            />
          </div>

          {submitStatus.message && (
            <div
              className={`p-3 rounded-md ${
                submitStatus.success
                  ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !canSubmit || submitCount >= MAX_SUBMISSIONS_PER_HOUR}
          >
            {!canSubmit ? (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Espera {formatTime(cooldownTime)}
              </>
            ) : isSubmitting ? (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Enviando...
              </>
            ) : submitCount >= MAX_SUBMISSIONS_PER_HOUR ? (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Límite alcanzado
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Enviar mensaje
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
