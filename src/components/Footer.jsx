import { Link } from "react-router-dom"
import { GithubLogo, DiscordLogo, TwitterLogo, InstagramLogo } from "phosphor-react"
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="footer-title">Programin</h3>
            <p className="mt-2 text-sm">
              Aprenda programação de forma divertida e gamificada. Uma plataforma educacional para todos os níveis.
            </p>
            <div className="social-icons mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubLogo size={24} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <DiscordLogo size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterLogo size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramLogo size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Links Rápidos</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/modules/html">Módulos</Link>
              </li>
              <li>
                <Link to="/ai-assistant">Assistente IA</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Recursos</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/community">Comunidade</Link>
              </li>
              <li>
                <Link to="/support">Suporte</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/terms">Termos de Uso</Link>
              </li>
              <li>
                <Link to="/privacy">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/cookies">Política de Cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider my-6"></div>

        <div className="text-center">
          <p className="text-sm">&copy; {currentYear} Programin. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
