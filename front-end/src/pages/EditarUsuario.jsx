import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { UsuarioForm } from '../components/UsuarioForm';
import { mapearErroParaCampo } from '../utils/usuarioErros';
import { obterUsuario, atualizarUsuario } from '../services/usuarioService';
import { ApiError } from '../services/api';
import { tratarErroDeFormulario } from '../utils/errosApi';
import { Card } from '../components/Card';
import { useToast } from '../components/Toast';

const VALORES_INICIAIS = {
  nome: '',
  email: '',
  senha: '',
  perfil: '',
  cpf: '',
  telefone: '',
  cro: '',
};

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const formRef = useRef(null);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState('');
  const [valores, setValores] = useState(VALORES_INICIAIS);
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const usuario = await obterUsuario(id);
        if (cancelado) return;
        setValores({
          nome: usuario.nome ?? '',
          email: usuario.email ?? '',
          senha: '',
          perfil: usuario.perfil ?? '',
          cpf: usuario.cpf ?? '',
          telefone: usuario.telefone ?? '',
          cro: usuario.cro ?? '',
        });
      } catch (err) {
        if (cancelado) return;
        const msg = err instanceof ApiError
          ? (err.mensagens[0] ?? 'Erro ao carregar usuário.')
          : 'Não foi possível conectar ao servidor. Tente novamente.';
        setErroCarregamento(msg);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    })();
    return () => { cancelado = true; };
  }, [id]);

  async function handleSubmit(body) {
    setEnviando(true);
    setErroGeral('');
    formRef.current?.limparErros();
    try {
      await atualizarUsuario(id, body);
      toast.sucesso('Usuário atualizado com sucesso.');
      navigate('/app/usuarios', { replace: true });
    } catch (err) {
      const { errosPorCampo, erroGeral: geral } = tratarErroDeFormulario(err, mapearErroParaCampo);
      if (errosPorCampo) formRef.current?.setErros(errosPorCampo);
      setErroGeral(geral);
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="space-y-6">
        <div>
          <Link to="/app/usuarios" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para usuários
          </Link>
          <h1 className="text-2xl font-bold text-ink">Editar usuário</h1>
        </div>
        <Card>
          <div className="flex items-center justify-center gap-2 py-12 text-muted">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Carregando usuário…</span>
          </div>
        </Card>
      </div>
    );
  }

  if (erroCarregamento) {
    return (
      <div className="space-y-6">
        <div>
          <Link to="/app/usuarios" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para usuários
          </Link>
          <h1 className="text-2xl font-bold text-ink">Editar usuário</h1>
        </div>
        <Card>
          <div className="py-8 text-center text-danger text-sm">
            {erroCarregamento}
          </div>
          <div className="flex justify-center pb-4">
            <Link to="/app/usuarios" className="px-4 py-2.5 rounded-lg text-ink border border-line hover:bg-canvas text-sm font-medium">
              Voltar para usuários
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <UsuarioForm
      ref={formRef}
      modo="editar"
      valoresIniciais={valores}
      enviando={enviando}
      erroGeral={erroGeral}
      onSubmit={handleSubmit}
      titulo="Editar usuário"
      subtitulo="Atualize os dados do usuário. Deixe a senha vazia para manter a atual."
      voltarPara="/app/usuarios"
      textoBotao="Salvar alterações"
      textoEnviando="Salvando…"
    />
  );
}