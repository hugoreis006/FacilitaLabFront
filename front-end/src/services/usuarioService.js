import { api } from './api'

export async function listarUsuarios() {
  return api('/usuarios')
}

export async function obterUsuario(id) {
  return api(`/usuarios/${id}`)
}

export async function criarUsuario(dados) {
  return api('/usuarios', { metodo: 'POST', body: dados })
}

export async function atualizarUsuario(id, dados) {
  return api(`/usuarios/${id}`, { metodo: 'PUT', body: dados })
}

export async function excluirUsuario(id) {
  return api(`/usuarios/${id}`, { metodo: 'DELETE' })
}

export async function listarUsuariosPorPerfil(perfil) {
  return api(`/usuarios/perfil/${perfil}`)
}

export async function buscarUsuarioPorEmail(email) {
  return api(`/usuarios/email/${encodeURIComponent(email)}`)
}