import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LockIcon, BookOpen, Code, FileCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#009c3b] to-[#002776] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Programin</h1>
          <p className="text-xl mb-8">
            Aprenda programação de forma divertida e gamificada
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button className="bg-[#ffdf00] text-[#002776] hover:bg-yellow-400">
                Começar Agora
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#002776]">
            Como funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#009c3b]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#009c3b]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Aprenda no seu ritmo
              </h3>
              <p className="text-gray-600">
                Módulos progressivos que se adaptam ao seu nível de conhecimento
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#002776]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-[#002776]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Pratique com exercícios reais
              </h3>
              <p className="text-gray-600">
                Exercícios interativos com feedback imediato para fixar o
                aprendizado
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#ffdf00]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCode className="w-8 h-8 text-[#ffdf00]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ganhe conquistas</h3>
              <p className="text-gray-600">
                Sistema de gamificação para manter você motivado durante o
                aprendizado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#002776]">
            Módulos de Aprendizado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="bg-[#009c3b]/10 pb-2">
                <CardTitle className="text-[#009c3b]">HTML</CardTitle>
                <CardDescription>Fundamentos da estrutura web</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="HTML Module"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <p className="text-gray-600">
                  Aprenda a criar a estrutura de páginas web com HTML, a
                  linguagem de marcação fundamental para desenvolvimento web.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
                  Começar
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-[#002776]/10 pb-2">
                <CardTitle className="text-[#002776]">CSS</CardTitle>
                <CardDescription>Estilização e design</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=150&width=300"
                    alt="CSS Module"
                    className="w-full h-40 object-cover rounded-md mb-4 opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LockIcon className="w-12 h-12 text-gray-500" />
                  </div>
                </div>
                <p className="text-gray-600">
                  Aprenda a estilizar suas páginas web com CSS, dando vida e
                  personalidade aos seus projetos.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  <LockIcon className="mr-2 h-4 w-4" /> Bloqueado
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-[#ffdf00]/20 pb-2">
                <CardTitle className="text-[#ffdf00]">JavaScript</CardTitle>
                <CardDescription>Interatividade e lógica</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=150&width=300"
                    alt="JavaScript Module"
                    className="w-full h-40 object-cover rounded-md mb-4 opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LockIcon className="w-12 h-12 text-gray-500" />
                  </div>
                </div>
                <p className="text-gray-600">
                  Aprenda a adicionar interatividade às suas páginas com
                  JavaScript, a linguagem de programação da web.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  <LockIcon className="mr-2 h-4 w-4" /> Bloqueado
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-[#002776]">
                Aprenda com a IA
              </h2>
              <p className="text-gray-600 mb-6">
                Tenha acesso a um assistente de IA especializado em programação
                que pode tirar suas dúvidas, explicar conceitos de forma
                alternativa e ajudar você a superar obstáculos no seu
                aprendizado.
              </p>
              <Button className="bg-[#002776] hover:bg-[#002776]/90">
                Experimente a IA
              </Button>
            </div>
            <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                <p className="font-medium text-[#002776]">Você:</p>
                <p className="text-gray-700">
                  Como funciona a estrutura básica de uma página HTML?
                </p>
              </div>
              <div className="bg-[#009c3b]/10 rounded-lg p-4 shadow-sm">
                <p className="font-medium text-[#009c3b]">Assistente IA:</p>
                <p className="text-gray-700">
                  A estrutura básica de uma página HTML consiste em:
                  <br />
                  <br />
                  1. <code>&lt;!DOCTYPE html&gt;</code> - Define o tipo de
                  documento
                  <br />
                  2. <code>&lt;html&gt;</code> - Elemento raiz
                  <br />
                  3. <code>&lt;head&gt;</code> - Contém metadados, título e
                  links
                  <br />
                  4. <code>&lt;body&gt;</code> - Contém o conteúdo visível da
                  página
                  <br />
                  <br />
                  Quer ver um exemplo completo?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002776] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Programin</h3>
              <p className="text-white/80">
                Aprenda programação de forma divertida e gamificada.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-white/80 hover:text-white"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/modules"
                    className="text-white/80 hover:text-white"
                  >
                    Módulos
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/80 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/80 hover:text-white"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-white/80 hover:text-white"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-white/80 hover:text-white"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-white/80 hover:text-white"
                  >
                    Política de Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Comunidade</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/forum"
                    className="text-white/80 hover:text-white"
                  >
                    Fórum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/discord"
                    className="text-white/80 hover:text-white"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    href="/github"
                    className="text-white/80 hover:text-white"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>
              &copy; {new Date().getFullYear()} Programin. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
