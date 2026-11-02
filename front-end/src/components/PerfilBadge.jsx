import { PERFIS, labelDe, badgeDe } from '../constants/enums';

export function PerfilBadge({ perfil }) {
  const rotulo = labelDe(PERFIS, perfil);
  const classes = badgeDe(PERFIS, perfil);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${classes}`}>
      {rotulo}
    </span>
  );
}