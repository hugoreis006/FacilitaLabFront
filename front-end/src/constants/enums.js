export const PERFIS = {
  DENTISTA: { label: 'Dentista' },
  RECEPCAO: { label: 'Recepção' },
  CADISTA: { label: 'Cadista' },
  GESTOR: { label: 'Gestor' },
}

export const TIPOS_PROTESE = {
  COROA: { label: 'Coroa' },
  PONTE: { label: 'Ponte' },
  IMPLANTE: { label: 'Implante' },
  PROVISORIO: { label: 'Provisório' },
  FACETA: { label: 'Faceta' },
  INLAY: { label: 'Inlay' },
}

export const MATERIAIS = {
  ZIRCONIA: { label: 'Zircônia' },
  RESINA: { label: 'Resina' },
  METAL: { label: 'Metal' },
  CERAMICA: { label: 'Cerâmica' },
}

export const PRIORIDADES = {
  URGENTE: { label: 'Urgente', badge: 'bg-[#fff1f0] text-[#c0392b] border-[#f5c6c6]' },
  NORMAL: { label: 'Normal', badge: 'bg-[#e8f1f9] text-[#2d6a9f] border-[#c5ddf0]' },
}

export const ESTADOS = {
  AGUARDANDO_TRIAGEM: {
    label: 'Aguardando Triagem',
    badge: 'bg-[#fff8e1] text-[#b45309] border-[#fcd29a]',
    grupo: 'aguardando',
  },
  AGUARDANDO_INFORMACOES: {
    label: 'Aguardando Informações',
    badge: 'bg-[#fff3e0] text-[#a0521b] border-[#f7c89a]',
    grupo: 'aguardando',
  },
  EM_ANALISE: {
    label: 'Em Análise',
    badge: 'bg-[#f3e8ff] text-[#7c3aed] border-[#d8b4fe]',
    grupo: 'producao',
  },
  EM_MODELAGEM: {
    label: 'Em Modelagem',
    badge: 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]',
    grupo: 'producao',
  },
  AGUARDANDO_APROVACAO_DESIGN: {
    label: 'Aguardando Aprovação',
    badge: 'bg-[#e8f1fd] text-[#2c5fa8] border-[#b8d0f8]',
    grupo: 'aguardando',
  },
  EM_CORRECAO: {
    label: 'Em Correção',
    badge: 'bg-[#fff0f6] text-[#be185d] border-[#fbcfe8]',
    grupo: 'producao',
  },
  USINAGEM: {
    label: 'Usinagem',
    badge: 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]',
    grupo: 'producao',
  },
  FINALIZADO: {
    label: 'Finalizado',
    badge: 'bg-[#f0f9f4] text-[#1e7e4a] border-[#b7e4ca]',
    grupo: 'encerrados',
  },
  CANCELADO: {
    label: 'Cancelado',
    badge: 'bg-[#f9f9f9] text-[#6b7280] border-[#e5e7eb]',
    grupo: 'encerrados',
  },
}

export const GRUPOS_ESTADO = [
  { id: 'aguardando', label: 'Aguardando' },
  { id: 'producao', label: 'Em produção' },
  { id: 'encerrados', label: 'Encerrados' },
]

export const TRANSICOES = {
  AGUARDANDO_TRIAGEM: [
    { para: 'AGUARDANDO_INFORMACOES', acao: 'Devolver ao dentista' },
    { para: 'EM_ANALISE', acao: 'Aprovar triagem' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  AGUARDANDO_INFORMACOES: [
    { para: 'AGUARDANDO_TRIAGEM', acao: 'Reencaminhar à triagem' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  EM_ANALISE: [
    { para: 'EM_MODELAGEM', acao: 'Iniciar modelagem' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  EM_MODELAGEM: [
    { para: 'AGUARDANDO_APROVACAO_DESIGN', acao: 'Enviar para aprovação' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  AGUARDANDO_APROVACAO_DESIGN: [
    { para: 'EM_CORRECAO', acao: 'Solicitar correção' },
    { para: 'USINAGEM', acao: 'Aprovar e enviar à usinagem' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  EM_CORRECAO: [
    { para: 'AGUARDANDO_APROVACAO_DESIGN', acao: 'Reenviar para aprovação' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  USINAGEM: [
    { para: 'FINALIZADO', acao: 'Finalizar pedido' },
    { para: 'CANCELADO', acao: 'Cancelar pedido' },
  ],
  FINALIZADO: [],
  CANCELADO: [],
}

export const CAMINHO_FELIZ = [
  'AGUARDANDO_TRIAGEM',
  'EM_ANALISE',
  'EM_MODELAGEM',
  'AGUARDANDO_APROVACAO_DESIGN',
  'USINAGEM',
  'FINALIZADO',
]

export function listaDe(enumObj) {
  return Object.entries(enumObj).map(([valor, dados]) => ({ valor, ...dados }))
}

export function labelDe(enumObj, valor) {
  return enumObj[valor]?.label ?? valor
}

export function badgeDe(enumObj, valor) {
  return enumObj[valor]?.badge ?? 'bg-slate-100 text-slate-600 border-slate-200'
}

export function transicoesDe(estado) {
  return TRANSICOES[estado] ?? []
}

export function podeTransicionar(de, para) {
  return transicoesDe(de).some((t) => t.para === para)
}

export function acaoTransicao(de, para) {
  return transicoesDe(de).find((t) => t.para === para)?.acao ?? null
}