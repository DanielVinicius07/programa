import { Navigate, Outlet } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import LoadingScreen from "./LoadingScreen"

const ProtectedRoute = () => {
  const { user, isLoading } = useSupabase()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
