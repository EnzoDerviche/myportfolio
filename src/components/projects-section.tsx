"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

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
    title: "E-commerce Platform",
    description:
      "Plataforma completa de comercio electrónico con panel de administración, carrito de compras y pasarela de pagos.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones y análisis de productividad.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Socket.io"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
  {
    title: "Weather Dashboard",
    description: "Dashboard meteorológico con pronósticos, mapas interactivos y alertas personalizadas.",
    technologies: ["React", "Python", "FastAPI", "Chart.js"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
  {
    title: "Social Media Analytics",
    description: "Herramienta de análisis de redes sociales con métricas avanzadas y reportes automatizados.",
    technologies: ["Vue.js", "Node.js", "Redis", "D3.js"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
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
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
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
