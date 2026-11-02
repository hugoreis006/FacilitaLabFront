import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ArrowLeft, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { api, ApiError } from '../services/api';

const TEMPO_REDIRECT_MS = 2000;

function validarSenha(senha) {
  if (!senha) return 'Informe a nova senha.';
  if (senha.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
  return '';
}

export function RedefinirSenha() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmar, setErroConfirmar] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [contagem, setContagem] = useState(TEMPO_REDIRECT_MS / 1000);

  useEffect(() => {
    if (!sucesso) return;
    const timer = setTimeout(() => navigate('/', { replace: true }), TEMPO_REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [sucesso, navigate]);

  useEffect(() => {
    if (!sucesso) return;
    const intervalo = setInterval(() => setContagem((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(intervalo);
  }, [sucesso]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
        <div className="bg-card p-8 sm:p-10 rounded-2xl shadow-card border border-line w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-danger-soft rounded-xl flex items-center justify-center border border-danger-line">
              <ShieldAlert className="w-7 h-7 text-danger" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-ink mb-2">Link inválido</h1>
          <p className="text-sm text-muted mb-8">
            O link de redefinição não contém um token válido. Verifique se você usou o link recebido por e-mail por completo.
          </p>
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-accent hover:bg-accent-strong text-white font-medium rounded-xl transition shadow-card text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao login
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errSenha = validarSenha(senha);
    const errConf = senha !== confirmar ? 'As senhas não coincidem.' : '';
    setErroSenha(errSenha);
    setErroConfirmar(errConf);
    if (errSenha || errConf) return;

    setErroGeral('');
    setEnviando(true);
    try {
      await api('/auth/redefinir-senha', { metodo: 'POST', body: { token, novaSenha: senha } });
      setSucesso(true);
    } catch (err) {
      const status = err instanceof ApiError ? err.status : 0;
      const falhaDeRedeOuServidor = status === 0 || (status >= 500 && status <= 599);
      setErroGeral(
        falhaDeRedeOuServidor
          ? 'Não foi possível conectar ao servidor. Tente novamente.'
          : 'O link pode ter expirado ou já ter sido usado. Solicite uma nova recuperação.'
      );
    } finally {
      setEnviando(false);
    }
  }

  if (sucesso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
        <div className="bg-card p-8 sm:p-10 rounded-2xl shadow-card border border-line w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-success-soft rounded-xl flex items-center justify-center border border-success-line">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-ink mb-2">Senha redefinida!</h1>
          <p className="text-sm text-muted mb-2">
            Sua nova senha foi definida com sucesso.
          </p>
          <p className="text-sm text-muted mb-8">
            Você será redirecionado para o login em {contagem}s…
          </p>
          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-accent hover:bg-accent-strong text-white font-medium rounded-xl transition shadow-card text-sm cursor-pointer"
          >
            Ir para o login agora
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
      <div className="bg-card p-8 sm:p-10 rounded-2xl shadow-card border border-line w-full max-w-md">

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center shadow-md text-sidebar-text">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 1.58-9 3.5 0 1.07.82 2.05 2.15 2.77A12.8 12.8 0 006 14.5C6 17.54 8.69 21 12 21s6-3.46 6-6.5c0-.62-.07-1.22-.21-1.78 1.33-.72 2.15-1.7 2.15-2.77C21 4.58 16.97 3 12 3z" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink">Redefinir senha</h1>
          <p className="text-sm text-muted mt-2">Digite sua nova senha (mínimo 6 caracteres)</p>
        </div>

        {erroGeral && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-danger-soft border border-danger-line text-danger text-sm text-center flex items-start gap-2 justify-center">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{erroGeral}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-2">Nova senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoFocus
              minLength={6}
              placeholder="********"
              className={`w-full px-4 py-3 bg-input border rounded-lg text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm transition ${erroSenha ? 'border-danger' : 'border-line'}`}
            />
            {erroSenha && <p className="text-xs text-danger mt-1">{erroSenha}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-2">Confirmar senha</label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              minLength={6}
              placeholder="********"
              className={`w-full px-4 py-3 bg-input border rounded-lg text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm transition ${erroConfirmar ? 'border-danger' : 'border-line'}`}
            />
            {erroConfirmar && <p className="text-xs text-danger mt-1">{erroConfirmar}</p>}
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full py-3.5 px-4 bg-accent hover:bg-accent-strong disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition shadow-card text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {enviando && <Loader2 className="w-4 h-4 animate-spin" />}
            {enviando ? 'Redefinindo…' : 'Redefinir senha'}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          <Link to="/" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
}