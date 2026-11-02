import { useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { login as loginService, rotaInicialPorPerfil } from '../services/authService';
import { ApiError } from '../services/api';
import { useToast } from '../components/Toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { entrar, autenticado, perfil } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  if (autenticado) {
    const destino = location.state?.de ?? rotaInicialPorPerfil(perfil);
    return <Navigate to={destino} replace />;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const dados = await loginService(email, senha);
      entrar(dados);
      toast.sucesso(`Bem-vindo, ${dados.nome.split(' ')[0]}!`);
      const destino = location.state?.de ?? rotaInicialPorPerfil(dados.perfil);
      navigate(destino, { replace: true });
    } catch (e) {
      if (e instanceof ApiError) {
        setErro(e.mensagens[0] ?? 'E-mail ou senha incorretos.');
      } else {
        setErro('Não foi possível conectar ao servidor. Tente novamente.');
      }
    } finally {
      setEnviando(false);
    }
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
          <h1 className="text-2xl font-bold text-ink">
            Boas vindas ao <span className="text-accent">Facilita Lab.</span>
          </h1>
          <p className="text-sm text-muted mt-1">Acesse sua conta para continuar</p>
        </div>

        {erro && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-danger-soft border border-danger-line text-danger text-sm text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-input border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-2">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="********"
              className="w-full px-4 py-3 bg-input border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm transition"
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full py-3.5 px-4 bg-accent hover:bg-accent-strong disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition duration-200 shadow-card text-sm cursor-pointer mt-2 flex items-center justify-center gap-2"
          >
            {enviando && <Loader2 className="w-4 h-4 animate-spin" />}
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>

          <p className="text-center text-sm text-muted">
            Esqueceu sua senha?{' '}
            <Link to="/recuperar-senha" className="text-accent font-medium hover:underline">
              Recuperar
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}