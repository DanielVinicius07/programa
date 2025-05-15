import { Link } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import { BookOpen, Code, FileCode, Lock, Robot, Trophy, Users } from "phosphor-react"
import Footer from "../components/Footer"
import "./HomePage.css"

const HomePage = () => {
  const { user } = useSupabase()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Programin</h1>
          <p className="text-xl mb-8">Aprenda programação de forma divertida e gamificada</p>
          <div className="flex justify-center gap-4">
            <Link to={user ? "/dashboard" : "/login"} className="btn btn-primary">
              {user ? "Ir para Dashboard" : "Começar Agora"}
            </Link>
            <Link to="/about" className="btn btn-outline">
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Como funciona</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="feature-icon">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aprenda no seu ritmo</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Módulos progressivos que se adaptam ao seu nível de conhecimento
              </p>
            </div>

            <div className="text-center">
              <div className="feature-icon">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pratique com exercícios reais</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Exercícios interativos com feedback imediato para fixar o aprendizado
              </p>
            </div>

            <div className="text-center">
              <div className="feature-icon">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ganhe conquistas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sistema de gamificação para manter você motivado durante o aprendizado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-white">
            Módulos de Aprendizado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md card-hover">
              <div className="card-body">
                <h3 className="card-title text-primary">HTML</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fundamentos da estrutura web</p>
                <div className="my-4">
                  <img
                    src="/placeholder.svg?height=150&width=300"
                    alt="HTML Module"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Aprenda a criar a estrutura de páginas web com HTML, a linguagem de marcação fundamental para
                  desenvolvimento web.
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link to="/modules/html" className="btn btn-primary">
                    Começar
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md card-hover">
              <div className="card-body">
                <h3 className="card-title text-secondary">CSS</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estilização e design</p>
                <div className="my-4 relative">
                  <img
                    src="/placeholder.svg?height=150&width=300"
                    alt="CSS Module"
                    className="w-full h-40 object-cover rounded-md opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={48} className="text-gray-500" />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Aprenda a estilizar suas páginas web com CSS, dando vida e personalidade aos seus projetos.
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn" disabled>
                    <Lock size={16} className="mr-2" /> Bloqueado
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md card-hover">
              <div className="card-body">
                <h3 className="card-title text-accent">JavaScript</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Interatividade e lógica</p>
                <div className="my-4 relative">
                  <img
                    src="/placeholder.svg?height=150&width=300"
                    alt="JavaScript Module"
                    className="w-full h-40 object-cover rounded-md opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={48} className="text-gray-500" />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Aprenda a adicionar interatividade às suas páginas com JavaScript, a linguagem de programação da web.
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn" disabled>
                    <Lock size={16} className="mr-2" /> Bloqueado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-white">Aprenda com a IA</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tenha acesso a um assistente de IA especializado em programação que pode tirar suas dúvidas, explicar
                conceitos de forma alternativa e ajudar você a superar obstáculos no seu aprendizado.
              </p>
              <Link to="/ai-assistant" className="btn btn-secondary">
                Experimente a IA
              </Link>
            </div>
            <div className="md:w-1/2 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
                <p className="font-medium text-secondary dark:text-blue-300">Você:</p>
                <p className="text-gray-700 dark:text-gray-300">Como funciona a estrutura básica de uma página HTML?</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 shadow-sm">
                <p className="font-medium text-primary">Assistente IA:</p>
                <p className="text-gray-700 dark:text-gray-300">
                  A estrutura básica de uma página HTML consiste em:
                  <br />
                  <br />
                  1. <code>&lt;!DOCTYPE html&gt;</code> - Define o tipo de documento
                  <br />
                  2. <code>&lt;html&gt;</code> - Elemento raiz
                  <br />
                  3. <code>&lt;head&gt;</code> - Contém metadados, título e links
                  <br />
                  4. <code>&lt;body&gt;</code> - Contém o conteúdo visível da página
                  <br />
                  <br />
                  Quer ver um exemplo completo?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-white">
            O que nossos alunos dizem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      M
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Maria Silva</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estudante de Design</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Sempre tive dificuldade em aprender programação, mas o Programin tornou tudo mais fácil e divertido.
                  Agora consigo criar meus próprios sites!"
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white">
                      J
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">João Oliveira</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Profissional em Transição</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Estava buscando mudar de carreira e o Programin foi fundamental nessa jornada. A abordagem prática e
                  o assistente de IA me ajudaram muito."
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-secondary">
                      A
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Ana Santos</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Desenvolvedora Junior</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Mesmo já tendo alguma experiência, o Programin me ajudou a preencher lacunas no meu conhecimento. As
                  conquistas tornam o aprendizado viciante!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar sua jornada?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que estão aprendendo programação de forma divertida e eficiente.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={user ? "/dashboard" : "/register"} className="btn btn-accent text-secondary">
              {user ? "Ir para Dashboard" : "Criar Conta Grátis"}
            </Link>
            <Link to="/about" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Users size={36} />
              </div>
              <div className="stat-title">Alunos</div>
              <div className="stat-value text-primary">10K+</div>
              <div className="stat-desc">Estudantes ativos</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FileCode size={36} />
              </div>
              <div className="stat-title">Exercícios</div>
              <div className="stat-value text-secondary">500+</div>
              <div className="stat-desc">Desafios práticos</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <Robot size={36} />
              </div>
              <div className="stat-title">Assistência IA</div>
              <div className="stat-value text-accent">24/7</div>
              <div className="stat-desc">Suporte contínuo</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
