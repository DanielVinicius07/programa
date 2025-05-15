"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CodeEditor from "../components/CodeEditor"
import { ArrowLeft, ArrowRight, CheckCircle, X, Robot } from "phosphor-react"
import "./PhasePage.css"

// Mock data for phases
const phaseData = {
  html: {
    1: {
      id: 1,
      title: "Introdução ao HTML",
      type: "multiple_choice",
      content: {
        question: "O que significa a sigla HTML?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language",
        ],
        correctAnswer: 0,
        explanation:
          "HTML significa Hyper Text Markup Language (Linguagem de Marcação de Hipertexto). É a linguagem padrão para criar páginas web.",
      },
    },
    2: {
      id: 2,
      title: "Estrutura Básica",
      type: "code_completion",
      content: {
        question:
          'Complete o código abaixo para criar uma estrutura básica de HTML com um título "Minha Primeira Página" e um parágrafo dizendo "Olá, mundo!"',
        initialCode: `<!DOCTYPE html>
<html>
  <head>
    <!-- Adicione o título aqui -->
  </head>
  <body>
    <!-- Adicione o parágrafo aqui -->
  </body>
</html>`,
        expectedOutput: `<!DOCTYPE html>
<html>
  <head>
    <title>Minha Primeira Página</title>
  </head>
  <body>
    <p>Olá, mundo!</p>
  </body>
</html>`,
        previewHtml: "<p>Olá, mundo!</p>",
      },
    },
    3: {
      id: 3,
      title: "Elementos de Texto",
      type: "multiple_choice",
      content: {
        question: "Qual tag HTML é usada para criar o maior título?",
        options: ["<h1>", "<heading>", "<title>", "<head>"],
        correctAnswer: 0,
        explanation:
          "A tag <h1> é usada para criar o maior título em uma página HTML. Os títulos vão de <h1> (o maior) até <h6> (o menor).",
      },
    },
    4: {
      id: 4,
      title: "Links e Imagens",
      type: "code_completion",
      content: {
        question:
          'Complete o código abaixo para criar um link para "https://www.exemplo.com" com o texto "Visite Exemplo" e uma imagem com src "imagem.jpg" e alt "Minha Imagem"',
        initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Adicione o link aqui -->
    
    <!-- Adicione a imagem aqui -->
    
  </body>
</html>`,
        expectedOutput: `<!DOCTYPE html>
<html>
  <body>
    <a href="https://www.exemplo.com">Visite Exemplo</a>
    
    <img src="imagem.jpg" alt="Minha Imagem">
    
  </body>
</html>`,
        previewHtml:
          '<a href="https://www.exemplo.com">Visite Exemplo</a><br><img src="/placeholder.svg?height=150&width=300" alt="Minha Imagem" style="max-width: 100%;">',
      },
    },
  },
  css: {
    // CSS phases would go here
  },
  javascript: {
    // JavaScript phases would go here
  },
}

const PhasePage = () => {
  const { moduleId, phaseId } = useParams()
  const navigate = useNavigate()
  const { user, supabase } = useSupabase()

  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [codeValue, setCodeValue] = useState("")
  const [feedback, setFeedback] = useState({
    status: null,
    message: "",
  })
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if phase exists
        if (!phaseData[moduleId] || !phaseData[moduleId][phaseId]) {
          navigate(`/modules/${moduleId}`)
          return
        }

        const currentPhase = phaseData[moduleId][phaseId]
        setPhase(currentPhase)

        if (currentPhase.type === "code_completion") {
          setCodeValue(currentPhase.content.initialCode)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching phase data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [moduleId, phaseId, navigate, supabase, user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleSubmit = () => {
    if (phase.type === "multiple_choice") {
      if (selectedOption === null) {
        setFeedback({
          status: "error",
          message: "Por favor, selecione uma opção.",
        })
        return
      }

      if (selectedOption === phase.content.correctAnswer) {
        setFeedback({
          status: "success",
          message: "Correto! 🎉",
        })
        setShowExplanation(true)
      } else {
        setFeedback({
          status: "error",
          message: "Incorreto. Tente novamente.",
        })
      }
    } else if (phase.type === "code_completion") {
      // Simple check - in a real app, you would do a more sophisticated comparison
      const userCodeNormalized = codeValue.replace(/\s+/g, " ").trim()

      if (
        phase.id === 2 &&
        userCodeNormalized.includes("<title>Minha Primeira Página</title>") &&
        userCodeNormalized.includes("<p>Olá, mundo!</p>")
      ) {
        setFeedback({
          status: "success",
          message: "Correto! Seu código funciona como esperado. 🎉",
        })
      } else if (
        phase.id === 4 &&
        userCodeNormalized.includes('<a href="https://www.exemplo.com">Visite Exemplo</a>') &&
        userCodeNormalized.includes('<img src="imagem.jpg" alt="Minha Imagem">')
      ) {
        setFeedback({
          status: "success",
          message: "Correto! Seu código funciona como esperado. 🎉",
        })
      } else {
        setFeedback({
          status: "error",
          message: "Seu código não está completo ou contém erros. Verifique as instruções e tente novamente.",
        })
      }
    }
  }

  const handleNext = () => {
    // In a real app, you would update the user's progress in Supabase here
    const nextPhaseId = Number.parseInt(phaseId) + 1

    if (phaseData[moduleId][nextPhaseId]) {
      navigate(`/modules/${moduleId}/phase/${nextPhaseId}`)
    } else {
      navigate(`/modules/${moduleId}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  return (
    <div className="phase-page min-h-screen flex flex-col">
      <Header onSignOut={handleSignOut} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to={`/modules/${moduleId}`} className="btn btn-ghost btn-sm mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">
            Fase {phase.id}: {phase.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="mb-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      phase.type === "multiple_choice"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {phase.type === "multiple_choice" ? "Questão de Múltipla Escolha" : "Complete o Código"}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-6">{phase.content.question}</h2>

                {phase.type === "multiple_choice" ? (
                  <div className="space-y-4">
                    {phase.content.options.map((option, index) => (
                      <div
                        key={index}
                        className={`
                          flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                          ${
                            selectedOption === index
                              ? "border-primary bg-primary/10 dark:bg-primary/20"
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }
                        `}
                        onClick={() => setSelectedOption(index)}
                      >
                        <div
                          className={`
                          w-5 h-5 rounded-full border flex items-center justify-center mr-3
                          ${selectedOption === index ? "border-primary" : "border-gray-400 dark:border-gray-500"}
                        `}
                        >
                          {selectedOption === index && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <CodeEditor value={codeValue} onChange={setCodeValue} language="html" />
                    </div>

                    {/* Preview */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Visualização:</h3>
                      <div className="border rounded-md p-4 bg-white dark:bg-gray-800 min-h-[150px]">
                        <div dangerouslySetInnerHTML={{ __html: phase.content.previewHtml }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {feedback.status && (
                  <div
                    className={`mt-6 p-4 rounded-md ${
                      feedback.status === "success"
                        ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    }`}
                  >
                    <p className="flex items-center">
                      {feedback.status === "success" ? (
                        <CheckCircle size={20} className="mr-2" />
                      ) : (
                        <X size={20} className="mr-2" />
                      )}
                      {feedback.message}
                    </p>
                  </div>
                )}

                {/* Explanation (for multiple choice) */}
                {phase.type === "multiple_choice" && showExplanation && (
                  <div className="mt-6 p-4 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    <h3 className="font-semibold mb-1">Explicação:</h3>
                    <p>{phase.content.explanation}</p>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Link to={`/modules/${moduleId}`} className="btn btn-outline btn-sm">
                    Voltar para o Módulo
                  </Link>

                  <div className="space-x-2">
                    {!feedback.status || feedback.status === "error" ? (
                      <button onClick={handleSubmit} className="btn btn-primary">
                        Verificar Resposta
                      </button>
                    ) : (
                      <button onClick={handleNext} className="btn btn-success">
                        Próxima Fase <ArrowRight size={16} className="ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Precisa de ajuda?</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Nosso assistente de IA pode ajudar com dúvidas sobre esta fase.
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
                <h2 className="card-title">Dicas</h2>
                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                  {phase.type === "multiple_choice" ? (
                    <>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2"></span>
                        <span>Leia atentamente a pergunta antes de escolher uma resposta.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2"></span>
                        <span>Elimine as opções que você tem certeza que estão incorretas.</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2"></span>
                        <span>Leia os comentários no código para entender o que precisa ser feito.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2"></span>
                        <span>Verifique a sintaxe do seu código antes de submeter.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2"></span>
                        <span>Observe a visualização para ver como seu código está sendo renderizado.</span>
                      </li>
                    </>
                  )}
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

export default PhasePage
