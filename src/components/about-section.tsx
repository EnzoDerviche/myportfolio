"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Calendar } from "lucide-react"

interface ExperienceItem {
  type: "work" | "education"
  title: string
  company: string
  period: string
  description: string
}

const experience: ExperienceItem[] = [
  {
    type: "work",
    title: "Fullstack Software Developer",
    company: "Phinxlab",
    period: "2024 - Actualidad",
    description:
      "Responsable de modificar completamente la UI del proyecto, tomando decisiones clave sobre componentización y optimizando la eficiencia del desarrollo. Encargado de la mayoría de las consultas a la base de datos, asegurando un acceso y manejo eficiente de la información.",
  },
  {
    type: "work",
    title: "Fullstack Software Developer",
    company: "Pixart SRL",
    period: "2021 - 2023",
    description:
      "Mejoré la funcionalidad, eficiencia y experiencia del usuario, optimizando el diseño para adaptarlo a las necesidades específicas de los clientes. Logré la migración exitosa del software de PHP a React y Node, mejorando la velocidad, eficiencia y preparación para futuras actualizaciones.",
  },
  {
    type: "education",
    title: "Full Stack Developer",
    company: "Soy Henry",
    period: "2021",
    description:
      "Bootcamp intensivo de desarrollo Full Stack con enfoque en tecnologías modernas y metodologías ágiles.",
  },
  {
    type: "education",
    title: "Full Stack Developer",
    company: "DePc Suite",
    period: "2020",
    description: "Curso especializado en desarrollo Full Stack con tecnologías web modernas.",
  },
  {
    type: "education",
    title: "Ingeniería en Informática",
    company: "Universidad Nacional Arturo Jauretche",
    period: "2019 - 2021",
    description:
      "Estudios universitarios en Ingeniería en Informática con base sólida en fundamentos de programación y sistemas.",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre mí</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mi trayectoria profesional y educativa en el mundo del desarrollo de software
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>

          {experience.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} mb-8`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {item.type === "work" ? (
                        <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                      ) : (
                        <GraduationCap className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      <Badge variant={item.type === "work" ? "default" : "secondary"}>
                        {item.type === "work" ? "Trabajo" : "Educación"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <span className="font-medium">{item.company}</span>
                      <Calendar className="h-4 w-4 mx-2" />
                      <span>{item.period}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
