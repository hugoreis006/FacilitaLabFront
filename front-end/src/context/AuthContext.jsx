import { createContext, useContext, useState } from 'react'
import { obterSessao, gravarSessao, limparSessao } from '../services/sessao'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(obterSessao)

  function entrar(dados) {
    gravarSessao(dados)
    setSessao(dados)
  }

  function sair() {
    limparSessao()
    setSessao(null)
  }

  return (
    <AuthContext.Provider value={{ ...sessao, autenticado: Boolean(sessao), entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components */
export function useAuth() {
  return useContext(AuthContext)
}