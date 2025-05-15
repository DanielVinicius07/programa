"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa"

// Mock achievements data
const achievementsData = [
  {
    id: 1,
    title: "Mestre do HTML",
    description: "Completou o módulo de HTML",
    type: "module_completion",
    earned: true,
    earnedAt: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Estilista CSS",
    description: "Completou o módulo de CSS",
    type: "module_completion",
    earned: false,
  },
  {
    id: 3,
    title: "Programador JavaScript",
    description: "Completou o módulo de JavaScript",
    type: "module_completion",
    earned: false,
  },
  {
    id: 4,
    title: "Primeira Fase",
    description: "Completou sua primeira fase",
    type: "special",
    earned: true,
    earnedAt: "2023-01-10T14:20:00Z",
  },
  {
    id: 5,
    title: "Estudante Dedicado",
    description: "Completou 5 fases seguidas",
    type: "streak",
    earned: false,
  },
]

const AchievementsPage = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // In a real app, you would fetch the user's achievements from Supabase
        setAchievements(achievementsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching achievements:", error)
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    navigate("/login")
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "module_completion":
        return <FaTrophy className="h-8 w-8 text-[#ffdf00]" />
      case "special":
        return <FaStar className="h-8 w-8 text-[#ffdf00]" />
      case "streak":
        return <FaMedal className="h-8 w-8 text-[#ffdf00]" />
      default:
        return <FaTrophy className="h-8 w-8 text-[#ffdf00]" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009c3b]"></div>
      </div>
    )
  }

  const earnedAchievements = achievements.filter((a) => a.earned)
  const lockedAchievements = achievements.filter((a) => !a.earned)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSignOut={handleSignOut} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-[#002776] mb-4">Suas Conquistas</h1>
        <p className="text-gray-600 mb-8">
          Acompanhe seu progresso e desbloqueie conquistas à medida que avança nos módulos.
        </p>

        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaTrophy className="h-8 w-8" />
            </div>
            <div className="stat-title">Conquistas</div>
            <div className="stat-value">{earnedAchievements.length}</div>
            <div className="stat-desc">de {achievements.length} disponíveis</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaMedal className="h-8 w-8" />
            </div>
            <div className="stat-title">Progresso</div>
            <div className="stat-value">{Math.round((earnedAchievements.length / achievements.length) * 100)}%</div>
            <div className="stat-desc">Completado</div>
          </div>
        </div>

        {/* Earned Achievements */}
        <h2 className="text-2xl font-bold mb-4 text-[#009c3b]">Conquistas Desbloqueadas</h2>
        {earnedAchievements.length === 0 ? (
          <div className="card bg-base-100 shadow-sm mb-8">
            <div className="card-body">
              <p className="text-gray-600">
                Você ainda não desbloqueou nenhuma conquista. Continue aprendendo para ganhar conquistas!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {earnedAchievements.map((achievement) => (
              <div key={achievement.id} className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#009c3b]/10 w-16 h-16 rounded-full flex items-center justify-center">
                      {getAchievementIcon(achievement.type)}
                    </div>
                    <div>
                      <h3 className="card-title">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Conquistado em{" "}
                        {new Date(achievement.earnedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Locked Achievements */}
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Conquistas Bloqueadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lockedAchievements.map((achievement) => (
            <div key={achievement.id} className="card bg-base-100 shadow-sm opacity-70">
              <div className="card-body">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
                    {getAchievementIcon(achievement.type)}
                  </div>
                  <div>
                    <h3 className="card-title">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Continue aprendendo para desbloquear</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AchievementsPage
