'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Home, Send } from 'lucide-react';

// Mock AI responses
const mockResponses: Record<string, string> = {
  default:
    'Olá! Sou o assistente de IA do Programin. Como posso ajudar você com seu aprendizado de programação hoje?',
  html: 'HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. É a estrutura fundamental de qualquer site.',
  css: 'CSS (Cascading Style Sheets) é usado para estilizar e formatar o conteúdo HTML. Com CSS, você pode controlar cores, fontes, layout e muito mais.',
  javascript:
    'JavaScript é uma linguagem de programação que permite adicionar interatividade às páginas web. É essencial para desenvolvimento web moderno.',
  tag: 'As tags HTML são elementos que definem a estrutura e o conteúdo de uma página web. Elas são escritas entre colchetes angulares, como <tag>.</tag>',
  estrutura:
    'A estrutura básica de um documento HTML consiste em:\n\n1. <!DOCTYPE html> - Define o tipo de documento\n2. <html> - Elemento raiz\n3. <head> - Contém metadados, título e links\n4. <body> - Contém o conteúdo visível da página',
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);

      // Add initial message
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: mockResponses.default,
          timestamp: new Date(),
        },
      ]);
    };

    getUser();
  }, [router, supabase]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let responseContent = '';

      // Simple keyword matching for demo purposes
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes('html')) {
        responseContent = mockResponses.html;
      } else if (lowercaseInput.includes('css')) {
        responseContent = mockResponses.css;
      } else if (
        lowercaseInput.includes('javascript') ||
        lowercaseInput.includes('js')
      ) {
        responseContent = mockResponses.javascript;
      } else if (lowercaseInput.includes('tag')) {
        responseContent = mockResponses.tag;
      } else if (
        lowercaseInput.includes('estrutura') ||
        lowercaseInput.includes('structure')
      ) {
        responseContent = mockResponses.estrutura;
      } else {
        responseContent =
          'Desculpe, não tenho informações específicas sobre isso. Posso ajudar com HTML, CSS, JavaScript e conceitos básicos de programação web. Poderia reformular sua pergunta?';
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009c3b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-[#002776]">
              Aprenda com a IA
            </h1>
          </div>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-[#002776] text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="max-w-3xl mx-auto flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua pergunta aqui..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              className="ml-2 bg-[#009c3b] hover:bg-[#009c3b]/90"
              disabled={isTyping || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggested Questions */}
          <div className="max-w-3xl mx-auto mt-4">
            <p className="text-sm text-gray-500 mb-2">Perguntas sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput('O que é HTML?');
                  setTimeout(handleSendMessage, 100);
                }}
                disabled={isTyping}
              >
                O que é HTML?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput('Como funciona o CSS?');
                  setTimeout(handleSendMessage, 100);
                }}
                disabled={isTyping}
              >
                Como funciona o CSS?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput('Para que serve o JavaScript?');
                  setTimeout(handleSendMessage, 100);
                }}
                disabled={isTyping}
              >
                Para que serve o JavaScript?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput('Qual é a estrutura básica de uma página HTML?');
                  setTimeout(handleSendMessage, 100);
                }}
                disabled={isTyping}
              >
                Estrutura básica de HTML?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
