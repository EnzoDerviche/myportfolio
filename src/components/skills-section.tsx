"use client"

import { Card, CardContent } from "@/components/ui/card"

interface Technology {
  name: string
  icon: string
  color: string
}

const technologies: Technology[] = [
  { name: "JavaScript", icon: "🟨", color: "bg-yellow-500" },
  { name: "TypeScript", icon: "📘", color: "bg-blue-600" },
  { name: "React", icon: "⚛️", color: "bg-blue-500" },
  { name: "Node.js", icon: "🟢", color: "bg-green-500" },
  { name: "Express", icon: "🚀", color: "bg-gray-700" },
  { name: "Material UI", icon: "🎨", color: "bg-blue-400" },
  { name: "PHP", icon: "🐘", color: "bg-purple-600" },
  { name: "Tailwind CSS", icon: "🎨", color: "bg-cyan-500" },
  { name: "SQL", icon: "🗄️", color: "bg-orange-500" },
  { name: "NoSQL", icon: "🍃", color: "bg-green-600" },
  { name: "Git", icon: "📚", color: "bg-red-500" },
  { name: "Jira", icon: "📋", color: "bg-blue-700" },
  { name: "IA / LLMs", icon: "🤖", color: "bg-emerald-500" },
  { name: "Agentes IA", icon: "🧠", color: "bg-violet-600" },
  { name: "MCP", icon: "🔌", color: "bg-indigo-500" },
  { name: "RAG", icon: "📑", color: "bg-teal-600" },
  { name: "Prompt Engineering", icon: "✨", color: "bg-fuchsia-600" },
]

interface SkillsSectionProps {
  isDark: boolean
}

export default function SkillsSection({ isDark }: SkillsSectionProps) {
  return (
    <section id="skills" className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stack Tecnológico</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones completas
          </p>
        </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
                  <Card key={index} className="hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div
                        className={`w-12 h-12 rounded-full ${tech.color} flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform`}
                      >
                        {tech.icon}
                      </div>
                      <h3 className="font-semibold text-sm text-center">{tech.name}</h3>
                    </CardContent>
                  </Card>
            ))}
          </div>
      </div>
    </section>
  )
}
