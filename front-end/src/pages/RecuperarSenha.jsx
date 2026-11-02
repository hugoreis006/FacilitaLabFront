import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft, MailCheck } from 'lucide-react';
import { api, ApiError } from '../services/api';

export function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await api('/auth/recuperar-senha', { metodo: 'POST', body: { email } });
      setEnviado(true);
    } catch (err) {
      const status = err instanceof ApiError ? err.status : 0;
      const falhaDeRedeOuServidor = status === 0 || (status >= 500 && status <= 599);
      if (falhaDeRedeOuServidor) {
        setErro('Não foi possível conectar ao servidor. Tente novamente.');
      } else {
        setEnviado(true);
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
            {enviado ? <MailCheck className="w-8 h-8" /> : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 1.58-9 3.5 0 1.07.82 2.05 2.15 2.77A12.8 12.8 0 006 14.5C6 17.54 8.69 21 12 21s6-3.46 6-6.5c0-.62-.07-1.22-.21-1.78 1.33-.72 2.15-1.7 2.15-2.77C21 4.58 16.97 3 12 3z" />
              </svg>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink">Recuperar senha</h1>
          <p className="text-sm text-muted mt-2">
            {enviado
              ? 'Verifique sua caixa de entrada e o link de recuperação.'
              : 'Informe seu e-mail para receber o link de recuperação.'}
          </p>
        </div>

        {enviado ? (
          <div className="space-y-5">
            <div className="px-4 py-3 rounded-lg bg-success-soft border border-success-line text-success text-sm text-center">
              Se o e-mail existir em nossa base, enviaremos o link de recuperação. Verifique também a pasta de spam.
            </div>
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-accent hover:bg-accent-strong text-white font-medium rounded-xl transition shadow-card text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao login
            </Link>
          </div>
        ) : (
          <>
            {erro && (
              <div className="mb-4 px-4 py-2.5 rounded-lg bg-danger-soft border border-danger-line text-danger text-sm text-center">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                disabled={enviando}
                className="w-full py-3.5 px-4 bg-accent hover:bg-accent-strong disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition shadow-card text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {enviando && <Loader2 className="w-4 h-4 animate-spin" />}
                {enviando ? 'Enviando…' : 'Enviar link de recuperação'}
              </button>
            </form>

            <p className="text-center text-sm text-muted mt-6">
              <Link to="/" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Voltar ao login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}