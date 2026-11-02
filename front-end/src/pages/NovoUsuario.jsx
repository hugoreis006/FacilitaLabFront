import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { criarUsuario } from '../services/usuarioService';
import { ApiError } from '../services/api';
import { PERFIS, listaDe } from '../constants/enums';
import { mascaraCPF, mascaraTelefone } from '../utils/formatadores';
import { Card } from '../components/Card';
import { Campo } from '../components/Campo';
import { useToast } from '../components/Toast';

const SENHA_MIN = 6;
const SENHA_MAX = 100;
const NOME_MIN = 3;
const NOME_MAX = 100;
const CRO_MAX = 20;

function apenasDigitos(s) {
  return String(s ?? '').replace(/\D/g, '');
}

function validarNome(v) {
  if (!v.trim()) return 'Nome é obrigatório.';
  if (v.trim().length < NOME_MIN) return `Nome deve ter no mínimo ${NOME_MIN} caracteres.`;
  if (v.length > NOME_MAX) return `Nome deve ter no máximo ${NOME_MAX} caracteres.`;
  return '';
}

function validarEmail(v) {
  if (!v.trim()) return 'E-mail é obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'E-mail inválido.';
  return '';
}

function validarSenha(v) {
  if (!v) return 'Senha é obrigatória.';
  if (v.length < SENHA_MIN) return `Senha deve ter no mínimo ${SENHA_MIN} caracteres.`;
  if (v.length > SENHA_MAX) return `Senha deve ter no máximo ${SENHA_MAX} caracteres.`;
  return '';
}

function validarPerfil(v) {
  if (!v) return 'Selecione um perfil.';
  return '';
}

function validarCPF(v) {
  const d = apenasDigitos(v);
  if (!d) return 'CPF é obrigatório.';
  if (d.length !== 11) return 'CPF deve ter 11 dígitos.';
  return '';
}

function validarTelefone(v) {
  if (!v.trim()) return 'Telefone é obrigatório.';
  if (!/^[\d\s()\-+]{8,20}$/.test(v)) return 'Telefone inválido.';
  return '';
}

function validarCRO(v, perfil) {
  if (perfil !== 'DENTISTA') return '';
  if (!v.trim()) return 'CRO é obrigatório para dentista.';
  if (v.length > CRO_MAX) return `CRO deve ter no máximo ${CRO_MAX} caracteres.`;
  return '';
}

function mapearErroParaCampo(mensagem) {
  const m = mensagem.toLowerCase();
  if (m.includes('e-mail') || m.includes('email')) return 'email';
  if (m.includes('cpf')) return 'cpf';
  if (m.includes('cro')) return 'cro';
  if (m.includes('senha')) return 'senha';
  if (m.includes('nome')) return 'nome';
  if (m.includes('telefone')) return 'telefone';
  if (m.includes('perfil')) return 'perfil';
  return null;
}

export function NovoUsuario() {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil: '',
    cpf: '',
    telefone: '',
    cro: '',
  });
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [enviando, setEnviando] = useState(false);

  function setCampo(chave, valor) {
    setForm((f) => ({ ...f, [chave]: valor }));
    if (erros[chave]) setErros((e) => ({ ...e, [chave]: '' }));
  }

  function handleChange(chave) {
    return (e) => setCampo(chave, e.target.value);
  }

  function handleCpf(e) {
    setCampo('cpf', mascaraCPF(e.target.value));
  }

  function handleTelefone(e) {
    setCampo('telefone', mascaraTelefone(e.target.value));
  }

  function handlePerfil(e) {
    const perfil = e.target.value;
    setForm((f) => ({ ...f, perfil, cro: perfil === 'DENTISTA' ? f.cro : '' }));
    setErros((er) => ({ ...er, perfil: '', cro: '' }));
  }

  function validarTudo() {
    const novos = {
      nome: validarNome(form.nome),
      email: validarEmail(form.email),
      senha: validarSenha(form.senha),
      perfil: validarPerfil(form.perfil),
      cpf: validarCPF(form.cpf),
      telefone: validarTelefone(form.telefone),
      cro: validarCRO(form.cro, form.perfil),
    };
    setErros(novos);
    return !Object.values(novos).some(Boolean);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErroGeral('');
    if (!validarTudo()) return;

    setEnviando(true);
    try {
      const body = {
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
        perfil: form.perfil,
        cpf: form.cpf,
        telefone: form.telefone,
      };
      if (form.perfil === 'DENTISTA') body.cro = form.cro.trim();
      await criarUsuario(body);
      toast.sucesso('Usuário cadastrado com sucesso.');
      navigate('/app/usuarios', { replace: true });
    } catch (err) {
      const mensagens = err instanceof ApiError
        ? err.mensagens
        : ['Não foi possível conectar ao servidor. Tente novamente.'];
      const status = err instanceof ApiError ? err.status : 0;
      const falhaDeRedeOuServidor = status === 0 || (status >= 500 && status <= 599);
      if (falhaDeRedeOuServidor) {
        setErroGeral(mensagens[0]);
      } else {
        const novosErros = { ...erros };
        const naoMapeados = [];
        mensagens.forEach((msg) => {
          const campo = mapearErroParaCampo(msg);
          if (campo) novosErros[campo] = msg;
          else naoMapeados.push(msg);
        });
        setErros(novosErros);
        setErroGeral(naoMapeados.join(' ') || (mensagens.length ? '' : 'Erro ao cadastrar usuário.'));
      }
    } finally {
      setEnviando(false);
    }
  }

  const ehDentista = form.perfil === 'DENTISTA';
  const opcoesPerfil = listaDe(PERFIS).map((p) => ({ valor: p.valor, rotulo: p.label }));

  return (
    <div className="space-y-6">
      <div>
        <Link to="/app/usuarios" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para usuários
        </Link>
        <h1 className="text-2xl font-bold text-ink">Novo usuário</h1>
        <p className="text-sm text-muted mt-1">Cadastre um novo usuário no sistema</p>
      </div>

      <Card>
        {erroGeral && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-danger-soft border border-danger-line text-danger text-sm">
            {erroGeral}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Campo
            label="Nome completo"
            obrigatorio
            value={form.nome}
            onChange={handleChange('nome')}
            erro={erros.nome}
            placeholder="Ex.: Maria Santos"
            maxLength={NOME_MAX}
            autoFocus
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              label="E-mail"
              tipo="email"
              obrigatorio
              value={form.email}
              onChange={handleChange('email')}
              erro={erros.email}
              placeholder="seu@email.com"
            />
            <Campo
              label="Senha"
              tipo="password"
              obrigatorio
              value={form.senha}
              onChange={handleChange('senha')}
              erro={erros.senha}
              placeholder="Mínimo 6 caracteres"
              maxLength={SENHA_MAX}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              label="Perfil"
              tipo="select"
              obrigatorio
              value={form.perfil}
              onChange={handlePerfil}
              erro={erros.perfil}
              placeholder="Selecione um perfil"
              opcoes={opcoesPerfil}
            />
            {ehDentista && (
              <Campo
                label="CRO"
                obrigatorio
                value={form.cro}
                onChange={handleChange('cro')}
                erro={erros.cro}
                placeholder="Ex.: 12345"
                maxLength={CRO_MAX}
              />
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Campo
              label="CPF"
              obrigatorio
              value={form.cpf}
              onChange={handleCpf}
              erro={erros.cpf}
              placeholder="000.000.000-00"
              maxLength={14}
            />
            <Campo
              label="Telefone"
              obrigatorio
              value={form.telefone}
              onChange={handleTelefone}
              erro={erros.telefone}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-line">
            <Link
              to="/app/usuarios"
              className="px-4 py-2.5 rounded-lg text-ink border border-line hover:bg-canvas text-sm font-medium text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-strong disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition shadow-card"
            >
              {enviando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {enviando ? 'Cadastrando…' : 'Cadastrar usuário'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}