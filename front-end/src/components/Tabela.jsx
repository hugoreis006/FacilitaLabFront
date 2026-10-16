import { Loader2, AlertCircle, Inbox } from 'lucide-react';

export function Tabela({ colunas, dados = [], carregando = false, erro = null, vazioTexto = 'Nenhum registro encontrado.', onTentarNovamente, acoes }) {
  if (carregando) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-muted">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Carregando…</span>
      </div>
    );
  }
  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-danger">
        <AlertCircle className="w-6 h-6" />
        <p className="text-sm text-center">{erro}</p>
        {onTentarNovamente && (
          <button type="button" onClick={onTentarNovamente} className="text-accent-strong text-sm font-medium hover:underline">
            Tentar novamente
          </button>
        )}
      </div>
    );
  }
  if (!dados.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted">
        <Inbox className="w-6 h-6" />
        <p className="text-sm">{vazioTexto}</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-muted">
            {colunas.map((c) => (
              <th key={c.chave} className="px-4 py-3 font-medium whitespace-nowrap">{c.rotulo}</th>
            ))}
            {acoes && <th className="px-4 py-3 font-medium text-right whitespace-nowrap">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {dados.map((linha, i) => (
            <tr key={linha.id ?? i} className="border-b border-line last:border-0 hover:bg-canvas">
              {colunas.map((c) => (
                <td key={c.chave} className="px-4 py-3 text-ink">
                  {c.render ? c.render(linha[c.chave], linha) : (linha[c.chave] ?? '—')}
                </td>
              ))}
              {acoes && <td className="px-4 py-3 text-right whitespace-nowrap">{acoes(linha)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}