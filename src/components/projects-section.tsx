"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
}

const projects: Project[] = [
  {
    title: "Fires App",
    description:
      "Plataforma interactiva para visualización de focos de incendio desarrollada con React. Integra un mapa dinámico que muestra focos mediante círculos, permitiendo filtrar por fecha y nivel de intensidad. También permite al usuario dibujar polígonos sobre el mapa para delimitar zonas específicas y visualizar información precisa de incendios.",
    technologies: ["React", "Redux", "CSS", "Typescript"],
    image: "/img/fires-app.jpeg",
    github: "https://github.com/EnzoDerviche/challengeSOF",
    demo: "https://fires-app.vercel.app/",
  },
  {
    title: "Menu Videogame",
    description: "Interfaz de menú para videojuego creada con Next.js. Simula una pantalla principal con botones animados y diseño adaptable para escritorio. Aunque sin funcionalidades completas, sirve como base visual para futuros desarrollos interactivos. Enfocado en UX/UI y estructura de navegación.",
    technologies: ["Next.js", "React", "HTML", "CSS", "javascript"],
    image: "/img/menu-videogame.jpeg",
    github: "https://github.com/EnzoDerviche/GiantNiamble/tree/main/challenge-niamble",
    demo: "https://menu-videogame.vercel.app/",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mis Proyectos</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades y experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={200}
                  height={550}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index < 2}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Código
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
