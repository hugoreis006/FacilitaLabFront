import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from '../components/Layout'
import { Login } from '../pages/Login'
import { AcessoNegado } from '../pages/AcessoNegado'
import { NaoEncontrada } from '../pages/NaoEncontrada'
import { PaginaEmConstrucao } from '../pages/PaginaEmConstrucao'
import { DashboardTemp } from './temporario'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardTemp />} />
        <Route path="/app/403" element={<AcessoNegado />} />
        <Route path="*" element={<NaoEncontrada />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute perfis={['GESTOR']} />}>
              <Route path="/app/dashboard" element={<PaginaEmConstrucao titulo="Dashboard do Gestor" />} />
              <Route path="/app/relatorios" element={<PaginaEmConstrucao titulo="Relatórios" />} />
            </Route>

            <Route element={<ProtectedRoute perfis={['DENTISTA']} />}>
              <Route path="/app/dashboard-dentista" element={<PaginaEmConstrucao titulo="Dashboard do Dentista" />} />
              <Route path="/app/meus-pedidos" element={<PaginaEmConstrucao titulo="Meus Pedidos" />} />
              <Route path="/app/pedidos/novo" element={<PaginaEmConstrucao titulo="Novo Pedido" />} />
            </Route>

            <Route element={<ProtectedRoute perfis={['RECEPCAO']} />}>
              <Route path="/app/dashboard-recepcao" element={<PaginaEmConstrucao titulo="Dashboard da Recepção" />} />
              <Route path="/app/triagem" element={<PaginaEmConstrucao titulo="Triagem" />} />
            </Route>

            <Route element={<ProtectedRoute perfis={['CADISTA']} />}>
              <Route path="/app/dashboard-cadista" element={<PaginaEmConstrucao titulo="Dashboard do Cadista" />} />
              <Route path="/app/fila-modelagem" element={<PaginaEmConstrucao titulo="Fila de Modelagem" />} />
            </Route>

            <Route element={<ProtectedRoute perfis={['GESTOR', 'RECEPCAO']} />}>
              <Route path="/app/usuarios" element={<PaginaEmConstrucao titulo="Usuários" />} />
              <Route path="/app/usuarios/novo" element={<PaginaEmConstrucao titulo="Novo Usuário" />} />
              <Route path="/app/usuarios/:id/editar" element={<PaginaEmConstrucao titulo="Editar Usuário" />} />
              <Route path="/app/producao" element={<PaginaEmConstrucao titulo="Controle de Produção" />} />
            </Route>

            <Route element={<ProtectedRoute perfis={['GESTOR', 'RECEPCAO', 'CADISTA']} />}>
              <Route path="/app/pedidos" element={<PaginaEmConstrucao titulo="Pedidos" />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/app/pedidos/:id" element={<PaginaEmConstrucao titulo="Detalhe do Pedido" />} />
              <Route path="/app/pedidos/:id/editar" element={<PaginaEmConstrucao titulo="Editar Pedido" />} />
              <Route path="/app/perfil" element={<PaginaEmConstrucao titulo="Perfil" />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}