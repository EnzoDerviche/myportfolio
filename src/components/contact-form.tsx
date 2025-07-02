"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {

      const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || ''
      const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || ''
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || ''
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Enzo Derviche",
        reply_to: formData.email,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envíame un mensaje</CardTitle>
        <CardDescription>Completa el formulario y te responderé lo antes posible</CardDescription>
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
              rows={10}
              className="min-h-62"
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Mail className="h-4 w-4 mr-2" />
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
