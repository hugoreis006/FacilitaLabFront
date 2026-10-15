const CHAVE_SESSAO = 'facilitalab.sessao'

export const ROTA_LOGIN = '/'

export function obterSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO)) ?? null
  } catch {
    return null
  }
}

export function gravarSessao(sessao) {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
}

export function limparSessao() {
  localStorage.removeItem(CHAVE_SESSAO)
}