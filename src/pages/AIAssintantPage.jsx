"use client"

import { useState, useEffect, useRef } from "react"
import { useSupabase } from "../contexts/SupabaseContext"
import Header from "../components/Header"
import { Robot, User } from "phosphor-react"
import "./AIAssistantPage.css"

// Mock AI responses
const mockResponses = {
  default: "Olá! Sou o assistente de IA do Programin. Como posso ajudar você com seu aprendizado de programação hoje?",
  html: "HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. É a estrutura fundamental de qualquer site.",
  css: "CSS (Cascading Style Sheets) é usado para estilizar e formatar o conteúdo HTML. Com CSS, você pode controlar cores, fontes, layout e muito mais.",
  javascript:
    "JavaScript é uma linguagem de programação que permite adicionar interatividade às páginas web. É essencial para desenvolvimento web moderno.",
  tag: "As tags HTML são elementos que definem a estrutura e o conteúdo de uma página web. Elas são escritas entre colchetes angulares, como <tag>.</tag>",
  estrutura:
    "A estrutura básica de um documento HTML consiste em:\n\n1. <!DOCTYPE html> - Define o tipo de documento\n2. <html> - Elemento raiz\n3. <head> - Contém metadados, título e links\n4. <body> - Contém o conteúdo visível da página",
}

// Suggested questions
const suggestedQuestions = [
  "O que é HTML?",
  "Como funciona o CSS?",
  "Para que serve o JavaScript?",
  "Qual é a estrutura básica de uma página HTML?",
  "Como criar um link em HTML?",
  "O que são seletores CSS?",
  "Como declarar variáveis em JavaScript?",
]

const AIAssistantPage = () => {
  const { user, supabase } = useSupabase()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    // Add initial message
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: mockResponses.default,
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      let responseContent = ""

      // Simple keyword matching for demo purposes
      const lowercaseInput = input.toLowerCase()
      if (lowercaseInput.includes("html")) {
        responseContent = mockResponses.html
      } else if (lowercaseInput.includes("css")) {
        responseContent = mockResponses.css
      } else if (lowercaseInput.includes("javascript") || lowercaseInput.includes("js")) {
        responseContent = mockResponses.javascript
      } else if (lowercaseInput.includes("tag")) {
        responseContent = mockResponses.tag
      } else if (lowercaseInput.includes("estrutura") || lowercaseInput.includes("structure")) {
        responseContent = mockResponses.estrutura
      } else {
        responseContent =
          "Desculpe, não tenho informações específicas sobre isso. Posso ajudar com HTML, CSS, JavaScript e conceitos básicos de programação web. Poderia reformular sua pergunta?"
      }

      const aiMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
    inputRef.current.focus()
  }

  return (
    <div className="ai-assistant-page min-h-screen flex flex-col">
      <Header onSignOut={handleSignOut} />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Robot size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Assistente IA</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tire suas dúvidas sobre programação
            </p>
          </div>
        </div>

        <div className="flex-grow flex flex-col bg-base-100 rounded-lg shadow-md overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`
                    flex max-w-[80%] rounded-lg p-4
                    ${message.role === "user" 
                      ? "bg-primary text-white" 
                      : "bg-base-200 dark:bg-gray-700"}
                  `}>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${message.role === "user" 
                        ? "bg-primary-focus text-white" 
                        : "bg-primary/10 text-primary"}
                    `}>
                      {message.role === "user" 
                        ? <User size={16} /> 
                        : <Robot size={16} />}
                    </div>
                    <div className="flex-grow">
                      <div className="whitespace-pre-line">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] rounded-lg p-4 bg-base-200 dark:bg-gray-700">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Robot size={16} className="text-primary" />
                    </div>
                    <div className="flex items-center">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua pergunta aqui..."
                className="textarea textarea-bordered flex-grow resize-none"
                rows="2"
                disabled={isTyping}
              />
              <button
                \
