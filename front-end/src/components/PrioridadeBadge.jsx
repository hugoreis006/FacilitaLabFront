const MAPA_PRIORIDADES = {
  URGENTE: { rotulo: 'Urgente', estilo: 'bg-[#fff1f0] text-[#c0392b] border-[#f5c6c6]' },
  NORMAL: { rotulo: 'Normal', estilo: 'bg-[#e8f1f9] text-[#2d6a9f] border-[#c5ddf0]' },
};

const FALLBACK = 'bg-canvas text-muted border-line';

export function PrioridadeBadge({ prioridade }) {
  const item = MAPA_PRIORIDADES[prioridade];
  const rotulo = item?.rotulo ?? prioridade;
  const estilo = item?.estilo ?? FALLBACK;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${estilo}`}>
      {rotulo}
    </span>
  );
}