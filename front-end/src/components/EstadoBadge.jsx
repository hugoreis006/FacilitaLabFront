import { ESTADOS, labelDe, badgeDe } from '../constants/enums';

export function EstadoBadge({ estado }) {
  const rotulo = labelDe(ESTADOS, estado);
  const classes = badgeDe(ESTADOS, estado);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${classes}`}>
      {rotulo}
    </span>
  );
}