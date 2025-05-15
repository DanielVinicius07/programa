"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Trophy, Lock, CheckCircle, Circle, Robot } from "phosphor-react"
import "./DashboardPage.css"

const DashboardPage = () => {
  const { user, profile, supabase } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [moduleProgress, setModuleProgress] = useState({
    html: 30,
    css: 0,
    javascript: 0,
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch the user's progress from Supabase
        // For now, we'll use mock data

        // Mock recent activities
        setRecentActivities([
          {
            id: 1,
            type: "phase_completed",
            title: "Fase 3: Elementos de Texto",
            module: "HTML",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          },
          {
            id: 2,
            type: "achievement_earned",
            title: "Primeira Fase",
            description: "Completou sua primeira fase",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          },
          {
            id: 3,
            type: "module_started",
            title: "Módulo HTML",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          },
        ])

        // Mock achievements
        setAchievements([
          {
            id: 1,
            title: "Primeira Fase",
            description: "Completou sua primeira fase",
            icon: <Trophy size={24} className="text-accent" />,
            earned: true,
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          },
          {
            id: 2,
            title: "Explorador",
            description: "Visitou todas as seções da plataforma",
            icon: <Trophy size={24} className="text-accent" />,
            earned: true,
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [user, supabase])

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
    <div className="dashboard-page min-h-screen flex flex-col">
      <Header onSignOut={handleSignOut} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="welcome-section mb-8">
          <h1 className="text-3xl font-bold text-secondary dark:text-white">
            Olá, {profile?.username || user?.email?.split("@")[0] || "Aluno"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Continue sua jornada de aprendizado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Modules */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-secondary dark:text-white">Seu Progresso</h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">HTML</span>
                      <span className="text-sm text-gray-500">{moduleProgress.html}%</span>
                    </div>
                    <progress
                      className="progress progress-primary w-full"
                      value={moduleProgress.html}
                      max="100"
                    ></progress>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CSS</span>
                      <span className="text-sm text-gray-500">{moduleProgress.css}%</span>
                    </div>
                    <progress
                      className="progress progress-secondary w-full"
                      value={moduleProgress.css}
                      max="100"
                    ></progress>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">JavaScript</span>
                      <span className="text-sm text-gray-500">{moduleProgress.javascript}%</span>
                    </div>
                    <progress
                      className="progress progress-accent w-full"
                      value={moduleProgress.javascript}
                      max="100"
                    ></progress>
                  </div>
                </div>
              </div>
            </div>

            {/* Modules */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-secondary dark:text-white">Módulos de Aprendizado</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="card bg-base-100 border hover:shadow-md transition-shadow">
                    <div className="card-body p-4">
                      <h3 className="card-title text-primary text-lg">HTML</h3>
                      <p className="text-xs text-gray-500">Fundamentos da estrutura web</p>
                      <div className="my-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">Progresso</span>
                          <span className="text-xs text-gray-500">{moduleProgress.html}%</span>
                        </div>
                        <progress
                          className="progress progress-primary w-full h-1.5"
                          value={moduleProgress.html}
                          max="100"
                        ></progress>
                      </div>
                      <div className="card-actions justify-end mt-2">
                        <Link to="/modules/html" className="btn btn-primary btn-sm">
                          {moduleProgress.html > 0 ? "Continuar" : "Começar"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-100 border hover:shadow-md transition-shadow">
                    <div className="card-body p-4">
                      <h3 className="card-title text-secondary text-lg">CSS</h3>
                      <p className="text-xs text-gray-500">Estilização e design</p>
                      <div className="my-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">Progresso</span>
                          <span className="text-xs text-gray-500">{moduleProgress.css}%</span>
                        </div>
                        <progress
                          className="progress progress-secondary w-full h-1.5"
                          value={moduleProgress.css}
                          max="100"
                        ></progress>
                      </div>
                      <div className="card-actions justify-end mt-2">
                        <button className="btn btn-sm" disabled={moduleProgress.html < 100}>
                          {moduleProgress.html < 100 ? (
                            <>
                              <Lock size={14} className="mr-1" /> Bloqueado
                            </>
                          ) : (
                            "Começar"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-100 border hover:shadow-md transition-shadow">
                    <div className="card-body p-4">
                      <h3 className="card-title text-accent text-lg">JavaScript</h3>
                      <p className="text-xs text-gray-500">Interatividade e lógica</p>
                      <div className="my-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">Progresso</span>
                          <span className="text-xs text-gray-500">{moduleProgress.javascript}%</span>
                        </div>
                        <progress
                          className="progress progress-accent w-full h-1.5"
                          value={moduleProgress.javascript}
                          max="100"
                        ></progress>
                      </div>
                      <div className="card-actions justify-end mt-2">
                        <button className="btn btn-sm" disabled={moduleProgress.css < 100}>
                          {moduleProgress.css < 100 ? (
                            <>
                              <Lock size={14} className="mr-1" /> Bloqueado
                            </>
                          ) : (
                            "Começar"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Learning */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-secondary dark:text-white">Continue de Onde Parou</h2>
                <div className="mt-4">
                  <Link to="/modules/html/phase/4" className="block">
                    <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold">4</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">Fase 4: Links e Imagens</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Módulo HTML</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2 dark:bg-gray-700">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: "0%" }}></div>
                          </div>
                          <span className="text-xs text-gray-500">0%</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-secondary dark:text-white">Assistente IA</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Precisa de ajuda? Nosso assistente de IA está disponível para responder suas dúvidas.
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link to="/ai-assistant" className="btn btn-primary btn-sm">
                    <Robot size={16} className="mr-2" /> Conversar com a IA
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title text-secondary dark:text-white">Atividades Recentes</h2>
                <div className="mt-4">
                  <ul className="space-y-4">
                    {recentActivities.map((activity) => (
                      <li key={activity.id} className="flex">
                        <div className="mr-4">
                          {activity.type === "phase_completed" && (
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <CheckCircle size={16} className="text-primary" />
                            </div>
                          )}
                          {activity.type === "achievement_earned" && (
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <Trophy size={16} className="text-accent" />
                            </div>
                          )}
                          {activity.type === "module_started" && (
                            <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                              <Circle size={16} className="text-secondary" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          {activity.module && <p className="text-xs text-gray-500">Módulo {activity.module}</p>}
                          {activity.description && <p className="text-xs text-gray-500">{activity.description}</p>}
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.date.toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-secondary dark:text-white">Conquistas</h2>
                  <Link to="/achievements" className="text-sm text-primary hover:underline">
                    Ver todas
                  </Link>
                </div>
                <div className="mt-4">
                  <ul className="space-y-4">
                    {achievements.map((achievement) => (
                      <li key={achievement.id} className="flex items-center">
                        <div className="mr-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            {achievement.icon}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage