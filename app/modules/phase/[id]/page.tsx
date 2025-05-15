"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Home, MessageSquareText, CheckCircle } from "lucide-react"
import CodeEditor from "@/components/code-editor"

// Mock data for phases
const phaseData = {
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
}

export default function Phase() {
  const router = useRouter()
  const params = useParams()
  const phaseId = Number.parseInt(params.id as string)
  const supabase = createClientComponentClient()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [codeValue, setCodeValue] = useState("")
  const [feedback, setFeedback] = useState<{
    status: "success" | "error" | null
    message: string
  }>({ status: null, message: "" })
  const [showExplanation, setShowExplanation] = useState(false)

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

      // Get phase data
      // In a real app, you would fetch this from Supabase
      const currentPhase = phaseData[phaseId as keyof typeof phaseData]
      if (!currentPhase) {
        router.push("/modules/html")
        return
      }

      setPhase(currentPhase)
      if (currentPhase.type === "code_completion") {
        setCodeValue(currentPhase.content.initialCode)
      }

      setLoading(false)
    }

    getUser()
  }, [router, supabase, phaseId])

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
      const expectedCodeNormalized = phase.content.expectedOutput.replace(/\s+/g, " ").trim()

      if (
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
    if (phaseId < 10) {
      router.push(`/modules/html/phase/${phaseId + 1}`)
    } else {
      router.push("/modules/html")
    }
  }

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
              <Link href="/modules/html">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-[#002776]">
              Fase {phase.id}: {phase.title}
            </h1>
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
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  phase.type === "multiple_choice" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                }`}
              >
                {phase.type === "multiple_choice" ? "Questão de Múltipla Escolha" : "Complete o Código"}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-6 text-[#002776]">{phase.content.question}</h2>

            {phase.type === "multiple_choice" ? (
              <div className="space-y-4">
                <RadioGroup
                  value={selectedOption?.toString()}
                  onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
                >
                  {phase.content.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <CodeEditor value={codeValue} onChange={setCodeValue} language="html" height="300px" />
                </div>

                {/* Preview */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#002776]">Visualização:</h3>
                  <div className="border rounded-md p-4 bg-white min-h-[150px]">
                    <div dangerouslySetInnerHTML={{ __html: phase.content.previewHtml }} />
                  </div>
                </div>
              </div>
            )}

            {/* Feedback */}
            {feedback.status && (
              <div
                className={`mt-6 p-4 rounded-md ${
                  feedback.status === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                <p className="flex items-center">
                  {feedback.status === "success" && <CheckCircle className="mr-2 h-5 w-5" />}
                  {feedback.message}
                </p>
              </div>
            )}

            {/* Explanation (for multiple choice) */}
            {phase.type === "multiple_choice" && showExplanation && (
              <div className="mt-6 p-4 rounded-md bg-blue-50 text-blue-800">
                <h3 className="font-semibold mb-1">Explicação:</h3>
                <p>{phase.content.explanation}</p>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/modules/html">Voltar para o Módulo</Link>
              </Button>

              <div className="space-x-2">
                {!feedback.status || feedback.status === "error" ? (
                  <Button onClick={handleSubmit} className="bg-[#009c3b] hover:bg-[#009c3b]/90">
                    Verificar Resposta
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-[#002776] hover:bg-[#002776]/90">
                    Próxima Fase <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
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