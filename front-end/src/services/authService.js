import { api } from './api'
import { ROTA_LOGIN } from './sessao'

export async function login(email, senha) {
  return api('/auth/login', { metodo: 'POST', body: { email, senha } })
}

export function rotaInicialPorPerfil(perfil) {
  const rotas = {
    DENTISTA: '/app/dashboard-dentista',
    RECEPCAO: '/app/dashboard-recepcao',
    GESTOR: '/app/dashboard',
    CADISTA: '/app/dashboard-cadista',
  }
  return rotas[perfil] ?? ROTA_LOGIN
}