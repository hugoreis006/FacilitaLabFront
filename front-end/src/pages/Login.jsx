import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#17365c] p-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        {/* Ícone do Dente */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-md text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 1.58-9 3.5 0 1.07.82 2.05 2.15 2.77A12.8 12.8 0 006 14.5C6 17.54 8.69 21 12 21s6-3.46 6-6.5c0-.62-.07-1.22-.21-1.78 1.33-.72 2.15-1.7 2.15-2.77C21 4.58 16.97 3 12 3z" />
            </svg>
          </div>
        </div>

        {/* Títulos */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Boas vindas ao <span className="text-blue-600">Facilita Lab.</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Acesse sua conta para continuar</p>
          <p className="text-xs text-amber-600 mt-2 bg-amber-50 py-1 px-2 rounded border border-amber-200">
            Colocar dps recuperar senha, etc. (Remover esse &lt;./p&gt;)
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-200 shadow-lg shadow-blue-600/20 text-sm cursor-pointer mt-2"
          >
            Entrar
          </button>
        </form>

      </div>
    </div>
  );
}