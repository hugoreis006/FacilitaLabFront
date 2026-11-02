import { obterSessao, limparSessao, ROTA_LOGIN } from './sessao'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  constructor(status, mensagens) {
    super(mensagens[0] ?? 'Erro inesperado.')
    this.name = 'ApiError'
    this.status = status
    this.mensagens = mensagens
  }
}

function tokenExpirado(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

function montarUrl(caminho, params) {
  let url = `${BASE_URL}${caminho}`
  if (params) {
    const busca = new URLSearchParams(
      Object.entries(params).filter(([, valor]) => valor !== undefined && valor !== null && valor !== '')
    )
    if (busca.toString()) url += `?${busca}`
  }
  return url
}

function mensagemPadrao(status) {
  if (status === 400) return 'Dados inválidos. Verifique os campos informados.'
  if (status === 403) return 'Você não tem permissão para esta ação.'
  if (status === 404) return 'Registro não encontrado.'
  if (status === 422) return 'Operação não permitida para este pedido.'
  return 'Erro ao comunicar com o servidor.'
}

export async function api(caminho, { metodo = 'GET', body, params } = {}) {
  const sessao = obterSessao()
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (sessao?.token) headers.Authorization = `Bearer ${sessao.token}`

  let resposta
  try {
    resposta = await fetch(montarUrl(caminho, params), {
      method: metodo,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, ['Não foi possível conectar ao servidor. Verifique sua conexão.'])
  }

  if ((resposta.status === 401 || resposta.status === 403) && !caminho.startsWith('/auth/')) {
    if (!sessao?.token || tokenExpirado(sessao.token)) {
      limparSessao()
      window.location.href = ROTA_LOGIN
      throw new ApiError(resposta.status, ['Sua sessão expirou. Faça login novamente.'])
    }
  }

  if (resposta.status === 204) return null

  let dados
  try {
    dados = await resposta.json() 
  } catch {
    dados = null
  }

  if (!resposta.ok) {
    const mensagens = Array.isArray(dados?.errors) && dados.errors.length > 0
      ? dados.errors
      : [mensagemPadrao(resposta.status)]
    throw new ApiError(resposta.status, mensagens)
  }

  return dados
}