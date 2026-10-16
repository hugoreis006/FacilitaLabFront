const MAPA_ESTADOS = {
  AGUARDANDO_TRIAGEM: { rotulo: 'Aguardando Triagem', estilo: 'bg-[#fff8e1] text-[#b45309] border-[#fcd29a]' },
  AGUARDANDO_INFORMACOES: { rotulo: 'Aguardando Informações', estilo: 'bg-[#fff3e0] text-[#a0521b] border-[#f7c89a]' },
  EM_ANALISE: { rotulo: 'Em Análise', estilo: 'bg-[#f3e8ff] text-[#7c3aed] border-[#d8b4fe]' },
  EM_MODELAGEM: { rotulo: 'Em Modelagem', estilo: 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]' },
  AGUARDANDO_APROVACAO_DESIGN: { rotulo: 'Aguardando Aprovação', estilo: 'bg-[#e8f1fd] text-[#2c5fa8] border-[#b8d0f8]' },
  EM_CORRECAO: { rotulo: 'Em Correção', estilo: 'bg-[#fff0f6] text-[#be185d] border-[#fbcfe8]' },
  USINAGEM: { rotulo: 'Usinagem', estilo: 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]' },
  FINALIZADO: { rotulo: 'Finalizado', estilo: 'bg-[#f0f9f4] text-[#1e7e4a] border-[#b7e4ca]' },
  CANCELADO: { rotulo: 'Cancelado', estilo: 'bg-[#f9f9f9] text-[#6b7280] border-[#e5e7eb]' },
};

const FALLBACK = 'bg-canvas text-muted border-line';

export function EstadoBadge({ estado }) {
  const item = MAPA_ESTADOS[estado];
  const rotulo = item?.rotulo ?? estado;
  const estilo = item?.estilo ?? FALLBACK;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${estilo}`}>
      {rotulo}
    </span>
  );
}