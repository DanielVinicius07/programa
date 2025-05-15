"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Circle, Home, MessageSquareText } from "lucide-react"

// Mock data for phases
const phases = [
  { id: 1, title: "Introdução ao HTML", type: "multiple_choice", completed: true },
  { id: 2, title: "Estrutura Básica", type: "code_completion", completed: true },
  { id: 3, title: "Elementos de Texto", type: "multiple_choice", completed: true },
  { id: 4, title: "Links e Imagens", type: "code_completion", completed: false },
  { id: 5, title: "Listas", type: "multiple_choice", completed: false },
  { id: 6, title: "Tabelas", type: "code_completion", completed: false },
  { id: 7, title: "Formulários", type: "multiple_choice", completed: false },
  { id: 8, title: "Semântica HTML5", type: "code_completion", completed: false },
  { id: 9, title: "Atributos Globais", type: "multiple_choice", completed: false },
  { id: 10, title: "Projeto Final", type: "code_completion", completed: false },
]

export default function HTMLModule() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(30) // Mock progress percentage

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
      setUser(user)
      setLoading(false)

      // Here you would fetch the user's progress from Supabase
      // For now, we'll use the mock data
      const completedPhases = phases.filter((phase) => phase.completed).length
      setProgress(Math.round((completedPhases / phases.length) * 100))
    }

    getUser()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009c3b]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-[#002776]">Módulo HTML</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/ai-assistant">
                <MessageSquareText className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-[#009c3b]">Trilha de Aprendizado</h2>
            <span className="text-sm font-medium">{progress}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Desktop View - Horizontal Track */}
        <div className="hidden md:block mb-12">
          <div className="relative">
            {/* Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>

            {/* Phases */}
            <div className="flex justify-between relative">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex flex-col items-center">
                  <Link
                    href={`/modules/html/phase/${phase.id}`}
                    className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        phase.completed
                          ? "bg-[#009c3b] text-white"
                          : index > 0 && !phases[index - 1].completed
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-2 border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b]/10"
                      }
                    `}
                    onClick={(e) => {
                      if (index > 0 && !phases[index - 1].completed) {
                        e.preventDefault()
                      }
                    }}
                  >
                    {phase.completed ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                  </Link>
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${phase.completed ? "text-[#009c3b]" : "text-gray-600"}`}>
                      Fase {phase.id}
                    </span>
                    <p
                      className={`text-sm mt-1 max-w-[100px] ${index > 0 && !phases[index - 1].completed ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {phase.title}
                    </p>
                    <span
                      className={`text-xs ${index > 0 && !phases[index - 1].completed ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {phase.type === "multiple_choice" ? "Quiz" : "Código"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Vertical Track */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Track Line */}
            <div className="absolute top-0 bottom-0 left-4 w-1 bg-gray-200"></div>

            {/* Phases */}
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <div key={phase.id} className="relative">
                  <Link
                    href={`/modules/html/phase/${phase.id}`}
                    className={`
                      absolute left-0 -translate-x-1/2 top-0 z-10 w-8 h-8 rounded-full flex items-center justify-center
                      ${
                        phase.completed
                          ? "bg-[#009c3b] text-white"
                          : index > 0 && !phases[index - 1].completed
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-2 border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b]/10"
                      }
                    `}
                    onClick={(e) => {
                      if (index > 0 && !phases[index - 1].completed) {
                        e.preventDefault()
                      }
                    }}
                  >
                    {phase.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </Link>
                  <div className="ml-6">
                    <span className={`text-xs font-medium ${phase.completed ? "text-[#009c3b]" : "text-gray-600"}`}>
                      Fase {phase.id}
                    </span>
                    <p
                      className={`text-sm font-medium ${index > 0 && !phases[index - 1].completed ? "text-gray-400" : "text-gray-800"}`}
                    >
                      {phase.title}
                    </p>
                    <span
                      className={`text-xs ${index > 0 && !phases[index - 1].completed ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {phase.type === "multiple_choice" ? "Quiz" : "Código"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Description */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#002776]">Sobre este Módulo</h2>
            <p className="text-gray-700 mb-4">
              HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Com HTML, você pode criar
              seu próprio site. HTML é fácil de aprender - você vai gostar!
            </p>
            <p className="text-gray-700 mb-4">
              Neste módulo, você aprenderá os fundamentos do HTML, desde a estrutura básica de uma página até elementos
              mais avançados como formulários e semântica HTML5.
            </p>
            <h3 className="text-lg font-semibold mb-2 text-[#002776]">O que você vai aprender:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Estrutura básica de um documento HTML</li>
              <li>Elementos de texto e formatação</li>
              <li>Links e navegação</li>
              <li>Imagens e mídia</li>
              <li>Listas e tabelas</li>
              <li>Formulários e entrada de dados</li>
              <li>Semântica HTML5</li>
              <li>Boas práticas e acessibilidade</li>
            </ul>
            <div className="mt-6">
              <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90" asChild>
                <Link href={`/modules/html/phase/${phases.findIndex((p) => !p.completed) + 1}`}>
                  Continuar Aprendizado
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Programin. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="/support" className="text-sm text-gray-600 hover:text-[#002776]">
                Suporte
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#002776]">
                Privacidade
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-[#002776]">
                Termos
              </Link>
              <Link href="/community" className="text-sm text-gray-600 hover:text-[#002776]">
                Comunidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
