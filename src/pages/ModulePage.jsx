"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, CheckCircle, Circle, Robot } from "phosphor-react"
import "./ModulePage.css"

// Mock data for phases
const moduleData = {
  html: {
    title: "HTML",
    description:
      "HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Com HTML, você pode criar seu próprio site. HTML é fácil de aprender - você vai gostar!",
    color: "primary",
    phases: [
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
    ],
    learningPoints: [
      "Estrutura básica de um documento HTML",
      "Elementos de texto e formatação",
      "Links e navegação",
      "Imagens e mídia",
      "Listas e tabelas",
      "Formulários e entrada de dados",
      "Semântica HTML5",
      "Boas práticas e acessibilidade",
    ],
  },
  css: {
    title: "CSS",
    description:
      "CSS (Cascading Style Sheets) é usado para estilizar e formatar o conteúdo HTML. Com CSS, você pode controlar cores, fontes, layout e muito mais.",
    color: "secondary",
    phases: [
      { id: 1, title: "Introdução ao CSS", type: "multiple_choice", completed: false },
      { id: 2, title: "Seletores", type: "code_completion", completed: false },
      { id: 3, title: "Cores e Fundos", type: "multiple_choice", completed: false },
      { id: 4, title: "Box Model", type: "code_completion", completed: false },
      { id: 5, title: "Tipografia", type: "multiple_choice", completed: false },
      { id: 6, title: "Layout e Posicionamento", type: "code_completion", completed: false },
      { id: 7, title: "Flexbox", type: "multiple_choice", completed: false },
      { id: 8, title: "Grid", type: "code_completion", completed: false },
      { id: 9, title: "Responsividade", type: "multiple_choice", completed: false },
      { id: 10, title: "Projeto Final", type: "code_completion", completed: false },
    ],
    learningPoints: [
      "Sintaxe e estrutura CSS",
      "Seletores e especificidade",
      "Cores, fundos e gradientes",
      "Box model e layout",
      "Tipografia e fontes",
      "Flexbox e Grid",
      "Media queries e design responsivo",
      "Animações e transições",
    ],
  },
  javascript: {
    title: "JavaScript",
    description:
      "JavaScript é uma linguagem de programação que permite adicionar interatividade às páginas web. É essencial para desenvolvimento web moderno.",
    color: "accent",
    phases: [
      { id: 1, title: "Introdução ao JavaScript", type: "multiple_choice", completed: false },
      { id: 2, title: "Variáveis e Tipos", type: "code_completion", completed: false },
      { id: 3, title: "Operadores", type: "multiple_choice", completed: false },
      { id: 4, title: "Estruturas de Controle", type: "code_completion", completed: false },
      { id: 5, title: "Funções", type: "multiple_choice", completed: false },
      { id: 6, title: "Arrays", type: "code_completion", completed: false },
      { id: 7, title: "Objetos", type: "multiple_choice", completed: false },
      { id: 8, title: "DOM", type: "code_completion", completed: false },
      { id: 9, title: "Eventos", type: "multiple_choice", completed: false },
      { id: 10, title: "Projeto Final", type: "code_completion", completed: false },
    ],
    learningPoints: [
      "Sintaxe e estrutura JavaScript",
      "Variáveis, tipos e operadores",
      "Estruturas de controle e loops",
      "Funções e escopo",
      "Arrays e objetos",
      "Manipulação do DOM",
      "Eventos e interatividade",
      "Requisições assíncronas",
    ],
  },
}

const ModulePage = () => {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { user, supabase } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [module, setModule] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if module exists
        if (!moduleData[moduleId]) {
          navigate("/dashboard")
          return
        }

        setModule(moduleData[moduleId])

        // Calculate progress
        const completedPhases = moduleData[moduleId].phases.filter((phase) => phase.completed).length
        const totalPhases = moduleData[moduleId].phases.length
        setProgress(Math.round((completedPhases / totalPhases) * 100))

        setLoading(false)
      } catch (error) {
        console.error("Error fetching module data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [moduleId, navigate, supabase, user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  return (
    <div className="module-page min-h-screen flex flex-col">
      <Header onSignOut={handleSignOut} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="btn btn-ghost btn-sm mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h1 className={`text-3xl font-bold text-${module.color}`}>Módulo {module.title}</h1>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Trilha de Aprendizado</h2>
            <span className="text-sm font-medium">{progress}% concluído</span>
          </div>
          <progress className={`progress progress-${module.color} w-full`} value={progress} max="100"></progress>
        </div>

        {/* Desktop View - Horizontal Track */}
        <div className="hidden md:block mb-12">
          <div className="relative">
            {/* Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>

            {/* Phases */}
            <div className="flex justify-between relative">
              {module.phases.map((phase, index) => (
                <div key={phase.id} className="flex flex-col items-center">
                  <Link
                    to={`/modules/${moduleId}/phase/${phase.id}`}
                    className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        phase.completed
                          ? `bg-${module.color} text-white`
                          : index > 0 && !module.phases[index - 1].completed
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : `bg-white dark:bg-gray-800 border-2 border-${module.color} text-${module.color} hover:bg-${module.color}/10`
                      }
                    `}
                    onClick={(e) => {
                      if (index > 0 && !module.phases[index - 1].completed) {
                        e.preventDefault()
                      }
                    }}
                  >
                    {phase.completed ? <CheckCircle size={20} weight="fill" /> : <Circle size={20} />}
                  </Link>
                  <div className="mt-2 text-center">
                    <span
                      className={`text-xs font-medium ${phase.completed ? `text-${module.color}` : "text-gray-600 dark:text-gray-300"}`}
                    >
                      Fase {phase.id}
                    </span>
                    <p
                      className={`text-sm mt-1 max-w-[100px] ${index > 0 && !module.phases[index - 1].completed ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"}`}
                    >
                      {phase.title}
                    </p>
                    <span
                      className={`text-xs ${index > 0 && !module.phases[index - 1].completed ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"}`}
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
        <div className="md:hidden mb-8">
          <div className="relative pl-8">
            {/* Track Line */}
            <div className="absolute top-0 bottom-0 left-4 w-1 bg-gray-200 dark:bg-gray-700"></div>

            {/* Phases */}
            <div className="space-y-8">
              {module.phases.map((phase, index) => (
                <div key={phase.id} className="relative">
                  <Link
                    to={`/modules/${moduleId}/phase/${phase.id}`}
                    className={`
                      absolute left-0 -translate-x-1/2 top-0 z-10 w-8 h-8 rounded-full flex items-center justify-center
                      ${
                        phase.completed
                          ? `bg-${module.color} text-white`
                          : index > 0 && !module.phases[index - 1].completed
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : `bg-white dark:bg-gray-800 border-2 border-${module.color} text-${module.color} hover:bg-${module.color}/10`
                      }
                    `}
                    onClick={(e) => {
                      if (index > 0 && !module.phases[index - 1].completed) {
                        e.preventDefault()
                      }
                    }}
                  >
                    {phase.completed ? <CheckCircle size={16} weight="fill" /> : <Circle size={16} />}
                  </Link>
                  <div className="ml-6">
                    <span
                      className={`text-xs font-medium ${phase.completed ? `text-${module.color}` : "text-gray-600 dark:text-gray-300"}`}
                    >
                      Fase {phase.id}
                    </span>
                    <p
                      className={`text-sm font-medium ${index > 0 && !module.phases[index - 1].completed ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"}`}
                    >
                      {phase.title}
                    </p>
                    <span
                      className={`text-xs ${index > 0 && !module.phases[index - 1].completed ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"}`}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className={`card-title text-${module.color}`}>Sobre este Módulo</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-4">{module.description}</p>
                <h3 className="text-lg font-semibold mt-6 mb-2">O que você vai aprender:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {module.learningPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="card-actions justify-end mt-6">
                  <Link
                    to={`/modules/${moduleId}/phase/${module.phases.findIndex((p) => !p.completed) + 1}`}
                    className={`btn btn-${module.color}`}
                  >
                    {progress > 0 ? "Continuar Aprendizado" : "Começar Agora"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Precisa de ajuda?</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Nosso assistente de IA pode ajudar com dúvidas sobre este módulo.
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link to="/ai-assistant" className="btn btn-outline btn-sm">
                    <Robot size={16} className="mr-2" /> Assistente IA
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md mt-6">
              <div className="card-body">
                <h2 className="card-title">Recursos Adicionais</h2>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a
                      href="https://developer.mozilla.org/pt-BR/docs/Web/HTML"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      MDN Web Docs - HTML
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.w3schools.com/html/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      W3Schools - HTML Tutorial
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/results?search_query=html+tutorial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      Tutoriais em Vídeo - YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ModulePage
