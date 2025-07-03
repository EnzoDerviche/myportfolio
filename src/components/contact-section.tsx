"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import ContactForm from "./contact-form"

interface ContactSectionProps {
  isDark: boolean
}

export default function ContactSection({ isDark }: ContactSectionProps) {
  return (
    <section id="contact" className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ¿Estas en busqueda de ub desarrollador? ¡Hablemos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">derviche.contact@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <p className="text-gray-600 dark:text-gray-300">+54 11 2155-5751</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ubicación</h3>
                    <p className="text-gray-600 dark:text-gray-300">Berazategui, Buenos Aires, Argentina</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4 justify-center">
              <Button size="icon" variant="outline" asChild>
                <a href="https://github.com/EnzoDerviche" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild>
                <a href="https://www.linkedin.com/in/enzo-derviche/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
