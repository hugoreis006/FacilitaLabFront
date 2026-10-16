import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

function iconeDoTipo(tipo) {
  if (tipo === 'sucesso') return <CheckCircle2 className="w-5 h-5 text-success shrink-0" />;
  if (tipo === 'erro') return <AlertCircle className="w-5 h-5 text-danger shrink-0" />;
  if (tipo === 'aviso') return <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />;
  return <Info className="w-5 h-5 text-accent shrink-0" />;
}

function classesDoTipo(tipo) {
  if (tipo === 'sucesso') return 'bg-success-soft border-success-line text-ink';
  if (tipo === 'erro') return 'bg-danger-soft border-danger-line text-ink';
  if (tipo === 'aviso') return 'bg-amber-50 border-amber-200 text-ink';
  return 'bg-card border-line text-ink';
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remover = useCallback((id) => {
    setToasts((lista) => lista.filter((t) => t.id !== id));
  }, []);

  const adicionar = useCallback((tipo, mensagem) => {
    const id = ++idRef.current;
    setToasts((lista) => [...lista, { id, tipo, mensagem }]);
    setTimeout(() => remover(id), 4000);
  }, [remover]);

  const api = useMemo(() => ({
    sucesso: (msg) => adicionar('sucesso', msg),
    erro: (msg) => adicionar('erro', msg),
    info: (msg) => adicionar('info', msg),
    avisar: (msg) => adicionar('aviso', msg),
  }), [adicionar]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-card border max-w-sm ${classesDoTipo(t.tipo)}`}>
            {iconeDoTipo(t.tipo)}
            <p className="text-sm flex-1">{t.mensagem}</p>
            <button type="button" onClick={() => remover(t.id)} className="text-muted hover:text-ink" aria-label="Fechar">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast precisa estar dentro de ToastProvider');
  return ctx;
}