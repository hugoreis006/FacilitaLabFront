import { PRIORIDADES, labelDe, badgeDe } from '../constants/enums';

export function PrioridadeBadge({ prioridade }) {
  const rotulo = labelDe(PRIORIDADES, prioridade);
  const classes = badgeDe(PRIORIDADES, prioridade);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${classes}`}>
      {rotulo}
    </span>
  );
}