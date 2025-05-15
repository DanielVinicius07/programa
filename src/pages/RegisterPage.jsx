"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import { Eye, EyeSlash, Check, X } from "phosphor-react"
import "./LoginPage.css" // Reuse the same styles

const RegisterPage = () => {
  const navigate = useNavigate()
  const { signUp, user } = useSupabase()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  // If user is already logged in, redirect to dashboard
  if (user) {
    navigate("/dashboard")
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validatePassword = () => {
    return formData.password.length >= 6
  }

  const validatePasswordMatch = () => {
    return formData.password === formData.confirmPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    // Validate form
    if (!validatePassword()) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (!validatePasswordMatch()) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      })

      if (error) {
        throw error
      }

      setMessage("Verifique seu email para confirmar o cadastro.")
      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error signing up:", error)
      setError(error.message || "Erro ao criar conta. Tente novamente.")
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
            <h1 className="title">Criar Conta</h1>
            <p className="subtitle">Junte-se a nós e comece sua jornada de aprendizado.</p>
          </div>

          <div className="card-body">
            {error && (
              <div className="alert alert-error">
                <X size={16} className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="alert alert-success">
                <Check size={16} className="mr-2" />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nome de usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="input input-bordered w-full"
                  placeholder="seunome"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="input input-bordered w-full pr-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
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
                <p className="text-xs mt-1 text-gray-500">A senha deve ter pelo menos 6 caracteres.</p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input input-bordered w-full"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : "Criar Conta"}
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <p>
              Já tem uma conta?{" "}
              <Link to="/login" className="text-secondary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Ao criar uma conta, você concorda com nossos{" "}
          <Link to="/terms" className="text-secondary hover:underline">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link to="/privacy" className="text-secondary hover:underline">
            Política de Privacidade
          </Link>
          .
        </div>
      </div>
    </div>
  )
}

export default RegisterPage