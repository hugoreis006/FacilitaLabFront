import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { rotaInicialPorPerfil } from '../services/authService'

export function AcessoNegado() {
  const { perfil } = useAuth()

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Erro 403</p>
        <h1 className="mt-3 text-xl font-semibold text-ink">Acesso negado</h1>
        <p className="mt-2 text-sm text-muted">
          Seu perfil não tem permissão para acessar esta página.
        </p>
        <Link
          to={rotaInicialPorPerfil(perfil)}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}