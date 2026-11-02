import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Pencil, Trash2, Search, Filter, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { listarUsuarios, excluirUsuario } from '../services/usuarioService';
import { ApiError } from '../services/api';
import { PERFIS, listaDe } from '../constants/enums';
import { formatarData } from '../utils/formatadores';
import { Card } from '../components/Card';
import { Tabela } from '../components/Tabela';
import { PerfilBadge } from '../components/PerfilBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useToast } from '../components/Toast';

export function Usuarios() {
  const { perfil: perfilLogado } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [busca, setBusca] = useState('');
  const [perfilFiltro, setPerfilFiltro] = useState('');
  const [alvoExcluir, setAlvoExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  const podeExcluir = perfilLogado === 'GESTOR';

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await listarUsuarios();
      setUsuarios(Array.isArray(dados) ? dados : []);
    } catch (e) {
      if (e instanceof ApiError) {
        setErro(e.mensagens[0] ?? 'Erro ao carregar usuários.');
      } else {
        setErro('Não foi possível conectar ao servidor. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const dados = await listarUsuarios();
        if (!cancelado) setUsuarios(Array.isArray(dados) ? dados : []);
      } catch (e) {
        if (!cancelado) {
          setErro(
            e instanceof ApiError
              ? (e.mensagens[0] ?? 'Erro ao carregar usuários.')
              : 'Não foi possível conectar ao servidor. Tente novamente.'
          );
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    })();
    return () => { cancelado = true; };
  }, []);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return usuarios.filter((u) => {
      const nomeMatch = !termo || (u.nome ?? '').toLowerCase().includes(termo);
      const emailMatch = !termo || (u.email ?? '').toLowerCase().includes(termo);
      const perfilMatch = !perfilFiltro || u.perfil === perfilFiltro;
      return (nomeMatch || emailMatch) && perfilMatch;
    });
  }, [usuarios, busca, perfilFiltro]);

  const colunas = [
    { chave: 'nome', rotulo: 'Nome' },
    { chave: 'email', rotulo: 'E-mail' },
    { chave: 'perfil', rotulo: 'Perfil', render: (perfil) => <PerfilBadge perfil={perfil} /> },
    { chave: 'dataCriacao', rotulo: 'Criado em', render: (v) => <span className="text-muted whitespace-nowrap">{formatarData(v)}</span> },
  ];

  function acoes(linha) {
    return (
      <div className="flex justify-end gap-1">
        <button
          type="button"
          onClick={() => navigate(`/app/usuarios/${linha.id}/editar`)}
          className="rounded-lg p-2 text-muted hover:bg-accent-soft hover:text-accent transition-colors"
          aria-label={`Editar ${linha.nome}`}
          title="Editar"
        >
          <Pencil className="w-4 h-4" />
        </button>
        {podeExcluir && (
          <button
            type="button"
            onClick={() => setAlvoExcluir(linha)}
            className="rounded-lg p-2 text-muted hover:bg-danger-soft hover:text-danger transition-colors"
            aria-label={`Excluir ${linha.nome}`}
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  async function confirmarExclusao() {
    if (!alvoExcluir) return;
    setExcluindo(true);
    try {
      await excluirUsuario(alvoExcluir.id);
      setUsuarios((lista) => lista.filter((u) => u.id !== alvoExcluir.id));
      toast.sucesso(`Usuário "${alvoExcluir.nome}" excluído.`);
      setAlvoExcluir(null);
    } catch (e) {
      const msg = e instanceof ApiError
        ? e.mensagens[0]
        : 'Não foi possível conectar ao servidor. Tente novamente.';
      toast.erro(msg);
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Usuários</h1>
          <p className="text-sm text-muted mt-1">Gerencie os usuários do sistema</p>
        </div>
        <Link
          to="/app/usuarios/novo"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-strong text-white font-medium rounded-lg text-sm transition shadow-card"
        >
          <UserPlus className="w-4 h-4" /> Novo usuário
        </Link>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou e-mail…"
              className="w-full pl-9 pr-3 py-2.5 bg-input border border-line rounded-lg text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
          <div className="relative sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <select
              value={perfilFiltro}
              onChange={(e) => setPerfilFiltro(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-input border border-line rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-accent text-sm appearance-none"
            >
              <option value="">Todos os perfis</option>
              {listaDe(PERFIS).map((p) => (
                <option key={p.valor} value={p.valor}>{p.label}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={carregar}
            disabled={carregando}
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 border border-line rounded-lg text-ink hover:bg-canvas text-sm transition disabled:opacity-60"
            title="Recarregar"
            aria-label="Recarregar"
          >
            <RefreshCw className={`w-4 h-4 ${carregando ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>

        <Tabela
          colunas={colunas}
          dados={filtrados}
          carregando={carregando}
          erro={erro || undefined}
          vazioTexto={busca || perfilFiltro ? 'Nenhum usuário encontrado com os filtros atuais.' : 'Nenhum usuário cadastrado.'}
          onTentarNovamente={carregar}
          acoes={acoes}
        />

        {!carregando && !erro && filtrados.length > 0 && (
          <p className="mt-3 text-xs text-muted">
            {filtrados.length} {filtrados.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
            {usuarios.length !== filtrados.length && ` de ${usuarios.length} total`}
          </p>
        )}
      </Card>

      <ConfirmDialog
        aberto={!!alvoExcluir}
        perigo
        carregando={excluindo}
        titulo="Excluir usuário"
        mensagem={alvoExcluir ? `Tem certeza que deseja excluir "${alvoExcluir.nome}" (${alvoExcluir.email})? Esta ação não pode ser desfeita.` : ''}
        textoConfirmar="Excluir"
        textoCancelar="Cancelar"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setAlvoExcluir(null)}
      />
    </div>
  );
}