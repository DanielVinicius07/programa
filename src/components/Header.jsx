"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSupabase } from "../contexts/SupabaseContext"
import { useTheme } from "../contexts/ThemeContext"
import { House, Books, Trophy, Gear, SignOut, User, Moon, Sun, List, X, Robot } from "phosphor-react"
import "./Header.css"

const Header = () => {
  const { user, signOut } = useSupabase()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate("/login")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="header">
      <div className="container mx-auto px-4">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <button className="btn btn-ghost lg:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
            <Link to="/" className="btn btn-ghost normal-case text-xl">
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
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
                  <House size={20} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/modules/html" className={location.pathname.includes("/modules") ? "active" : ""}>
                  <Books size={20} />
                  Módulos
                </Link>
              </li>
              <li>
                <Link to="/achievements" className={isActive("/achievements") ? "active" : ""}>
                  <Trophy size={20} />
                  Conquistas
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className={isActive("/ai-assistant") ? "active" : ""}>
                  <Robot size={20} />
                  Assistente IA
                </Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-primary flex items-center justify-center text-white">
                    {user.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      <User size={16} />
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">
                      <Gear size={16} />
                      Configurações
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>
                      <SignOut size={16} />
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-container">
          <ul className="menu">
            <li>
              <Link to="/dashboard" onClick={closeMobileMenu}>
                <House size={24} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/modules/html" onClick={closeMobileMenu}>
                <Books size={24} />
                Módulos
              </Link>
            </li>
            <li>
              <Link to="/achievements" onClick={closeMobileMenu}>
                <Trophy size={24} />
                Conquistas
              </Link>
            </li>
            <li>
              <Link to="/ai-assistant" onClick={closeMobileMenu}>
                <Robot size={24} />
                Assistente IA
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={closeMobileMenu}>
                <User size={24} />
                Perfil
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={closeMobileMenu}>
                <Gear size={24} />
                Configurações
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>
                <SignOut size={24} />
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header