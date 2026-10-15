import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROTA_LOGIN } from '../services/sessao'

export function ProtectedRoute({ perfis }) {
  const { autenticado, perfil } = useAuth()
  const local = useLocation()

  if (!autenticado) {
    return <Navigate to={ROTA_LOGIN} state={{ de: local.pathname }} replace />
  }
  if (perfis && !perfis.includes(perfil)) {
    return <Navigate to="/app/403" replace />
  }
  return <Outlet />
}