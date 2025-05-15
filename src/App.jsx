"use client"

import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSupabase } from "./contexts/SupabaseContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LoadingScreen from "./components/LoadingScreen"

// Pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import ModulePage from "./pages/ModulePage"
import PhasePage from "./pages/PhasePage"
import AIAssistantPage from "./pages/AIAssistantPage"
import AchievementsPage from "./pages/AchievementsPage"
import SettingsPage from "./pages/SettingsPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  const { isLoading } = useSupabase()
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setAppReady(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading || !appReady) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/modules/:moduleId" element={<ModulePage />} />
        <Route path="/modules/:moduleId/phase/:phaseId" element={<PhasePage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback routes */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App
