"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import { Eye, EyeSlash } from "phosphor-react"
import "./LoginPage.css"

const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn, user } = useSupabase()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // If user is already logged in, redirect to dashboard
  if (user) {
    navigate("/dashboard")
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await signIn({ email, password })

      if (error) {
        throw error
      }

      navigate("/dashboard")
    } catch (error) {
      console.error("Error signing in:", error)
      setError(error.message || "Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <Link to="/" className="logo">
              <span className="text-primary">P</span>
              <span className="text-secondary">r</span>
              <span className="text-accent">o</span>
              <span className="text-primary">g</span>
              <span className="text-secondary">r</span>
              <span className="text-accent">a</span>
              <span className="text-primary">m</span>
              <span className="text-secondary">i</span>
              <span className="text-accent">n</span>
            </Link>
            <h1 className="title">Login</h1>
            <p className="subtitle">Bem-vindo de volta! Entre na sua conta para continuar.</p>
          </div>

          <div className="card-body">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center">
                  <label htmlFor="password">Senha</label>
                  <Link to="/reset-password" className="text-sm text-secondary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input input-bordered w-full pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : "Entrar"}
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <p>
              Não tem uma conta?{" "}
              <Link to="/register" className="text-secondary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage