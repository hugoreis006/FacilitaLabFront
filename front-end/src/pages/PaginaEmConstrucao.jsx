import { Card } from '../components/Card';
import { EstadoBadge } from '../components/EstadoBadge';
import { PrioridadeBadge } from '../components/PrioridadeBadge';
import { IndicadorPrazo } from '../components/IndicadorPrazo';
import { Tabela } from '../components/Tabela';
import { Campo } from '../components/Campo';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useToast } from '../components/Toast';
import { useState } from 'react';

export function PaginaEmConstrucao({ titulo }) {
  const toast = useToast();
  const [confirmar, setConfirmar] = useState(false);
  return (
    <div className="space-y-4 p-6">
      <Card titulo="Componentes E06">
        <div className="flex flex-wrap items-center gap-3">
          <EstadoBadge estado="AGUARDANDO_TRIAGEM" />
          <EstadoBadge estado="EM_MODELAGEM" />
          <EstadoBadge estado="FINALIZADO" />
          <PrioridadeBadge prioridade="URGENTE" />
          <PrioridadeBadge prioridade="NORMAL" />
          <IndicadorPrazo prazo="2026-10-18" />
          <IndicadorPrazo prazo="2026-10-15" />
          <IndicadorPrazo prazo="2026-10-30" />
        </div>
      </Card>
      <Card titulo="Tabela (vazia)">
        <Tabela colunas={[{ chave: 'nome', rotulo: 'Nome' }]} dados={[]} vazioTexto="Nada por aqui." />
      </Card>
      <Card titulo="Formulário">
        <div className="grid gap-3 max-w-md">
          <Campo label="Nome" obrigatorio placeholder="Digite" />
          <Campo label="Observações" tipo="textarea" maxLength={500} linhas={3} />
        </div>
      </Card>
      <div className="flex gap-3">
        <button onClick={() => toast.sucesso('Salvo com sucesso.')} className="px-4 py-2 rounded-lg bg-accent text-white">Toast sucesso</button>
        <button onClick={() => toast.erro('Algo deu errado.')} className="px-4 py-2 rounded-lg bg-danger text-white">Toast erro</button>
        <button onClick={() => setConfirmar(true)} className="px-4 py-2 rounded-lg border border-line text-ink">Abrir confirm</button>
      </div>
      <ConfirmDialog aberto={confirmar} perigo titulo="Excluir pedido?" mensagem="Esta ação não pode ser desfeita." textoConfirmar="Excluir" onConfirmar={() => { setConfirmar(false); toast.sucesso('Confirmado.'); }} onCancelar={() => setConfirmar(false)} />
    </div>
  );
}