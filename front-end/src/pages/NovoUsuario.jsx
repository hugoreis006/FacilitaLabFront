import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioForm } from '../components/UsuarioForm';
import { mapearErroParaCampo } from '../utils/usuarioErros';
import { criarUsuario } from '../services/usuarioService';
import { tratarErroDeFormulario } from '../utils/errosApi';
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

export function NovoUsuario() {
  const navigate = useNavigate();
  const toast = useToast();
  const formRef = useRef(null);
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  async function handleSubmit(body) {
    setEnviando(true);
    setErroGeral('');
    formRef.current?.limparErros();
    try {
      await criarUsuario(body);
      toast.sucesso('Usuário cadastrado com sucesso.');
      navigate('/app/usuarios', { replace: true });
    } catch (err) {
      const { errosPorCampo, erroGeral: geral } = tratarErroDeFormulario(err, mapearErroParaCampo);
      if (errosPorCampo) formRef.current?.setErros(errosPorCampo);
      setErroGeral(geral);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <UsuarioForm
      ref={formRef}
      modo="criar"
      valoresIniciais={VALORES_INICIAIS}
      enviando={enviando}
      erroGeral={erroGeral}
      onSubmit={handleSubmit}
      titulo="Novo usuário"
      subtitulo="Cadastre um novo usuário no sistema"
      voltarPara="/app/usuarios"
      textoBotao="Cadastrar usuário"
      textoEnviando="Cadastrando…"
    />
  );
}