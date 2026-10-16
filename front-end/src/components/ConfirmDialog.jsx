import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({ aberto, titulo = 'Confirmar ação', mensagem, textoConfirmar = 'Confirmar', textoCancelar = 'Cancelar', perigo = false, onConfirmar, onCancelar }) {
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e) => { if (e.key === 'Escape') onCancelar?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [aberto, onCancelar]);

  if (!aberto) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onCancelar} role="dialog" aria-modal="true">
      <div className="bg-card border border-line rounded-2xl shadow-card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3">
          {perigo && <AlertTriangle className="w-6 h-6 text-danger shrink-0" />}
          <div className="flex-1">
            <h3 className="text-ink font-semibold text-base">{titulo}</h3>
            {mensagem && <p className="text-muted text-sm mt-2">{mensagem}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onCancelar} className="px-4 py-2 rounded-lg text-ink border border-line hover:bg-canvas">
            {textoCancelar}
          </button>
          <button type="button" onClick={onConfirmar} className={`px-4 py-2 rounded-lg text-white ${perigo ? 'bg-danger hover:brightness-90' : 'bg-accent hover:bg-accent-strong'}`}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}