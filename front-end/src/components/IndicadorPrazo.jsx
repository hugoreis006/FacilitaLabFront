import { AlertCircle, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { formatarData, classificacaoPrazo } from '../utils/formatadores';

const ESTILOS = {
  vencido: { Icon: AlertCircle, estilo: 'bg-danger-soft text-danger border-danger-line' },
  critico: { Icon: AlertTriangle, estilo: 'bg-danger-soft text-danger border-danger-line' },
  atencao: { Icon: Clock, estilo: 'bg-amber-50 text-amber-700 border-amber-200' },
  ok: { Icon: CheckCircle2, estilo: 'bg-success-soft text-success border-success-line' },
  neutro: { Icon: Clock, estilo: 'bg-canvas text-muted border-line' },
};

export function IndicadorPrazo({ prazo }) {
  if (!prazo) return <span className="text-muted">—</span>;
  const { classe, rotulo } = classificacaoPrazo(prazo);
  const { Icon, estilo } = ESTILOS[classe] ?? ESTILOS.neutro;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${estilo}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{formatarData(prazo)}</span>
      {rotulo && <span className="opacity-80">· {rotulo}</span>}
    </span>
  );
}