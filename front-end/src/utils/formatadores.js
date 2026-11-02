export function formatarData(valor) {
  if (!valor) return '';
  const data = valor.includes('T') ? new Date(valor) : new Date(valor + 'T00:00:00');
  if (Number.isNaN(data.getTime())) return '';
  return data.toLocaleDateString('pt-BR');
}

export function formatarDataHora(valor) {
  if (!valor) return '';
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return '';
  return data.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function formatarCPF(cpf) {
  if (!cpf) return '';
  const d = String(cpf).replace(/\D/g, '').padStart(11, '0').slice(0, 11);
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function mascaraCPF(valor) {
  const d = String(valor ?? '').replace(/\D/g, '').slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

export function formatarTelefone(tel) {
  if (!tel) return '';
  const d = String(tel).replace(/\D/g, '');
  if (d.length === 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  if (d.length === 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  return tel;
}

export function mascaraTelefone(valor) {
  const d = String(valor ?? '').replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function diasAtePrazo(dataIso) {
  if (!dataIso) return null;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const prazo = new Date(dataIso + 'T00:00:00');
  prazo.setHours(0, 0, 0, 0);
  return Math.round((prazo - hoje) / 86400000);
}

export function classificacaoPrazo(dataIso) {
  const dias = diasAtePrazo(dataIso);
  if (dias === null) return { classe: 'neutro', rotulo: '' };
  if (dias < 0) return { classe: 'vencido', rotulo: 'Vencido' };
  if (dias === 0) return { classe: 'critico', rotulo: 'Vence hoje' };
  if (dias === 1) return { classe: 'critico', rotulo: 'Vence amanhã' };
  if (dias <= 2) return { classe: 'critico', rotulo: `Vence em ${dias} dias` };
  if (dias <= 5) return { classe: 'atencao', rotulo: `Vence em ${dias} dias` };
  return { classe: 'ok', rotulo: `Vence em ${dias} dias` };
}