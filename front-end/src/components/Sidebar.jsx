import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  ClipboardCheck,
  ClipboardList,
  Factory,
  FilePlus,
  LayoutDashboard,
  LogOut,
  PenTool,
  User,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PERFIS } from '../constants/enums'
import { ROTA_LOGIN } from '../services/sessao'

const ITENS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, perfis: ['GESTOR'] },
  { to: '/app/dashboard-dentista', label: 'Meu Dashboard', icon: LayoutDashboard, perfis: ['DENTISTA'] },
  { to: '/app/dashboard-recepcao', label: 'Dashboard', icon: LayoutDashboard, perfis: ['RECEPCAO'] },
  { to: '/app/dashboard-cadista', label: 'Dashboard', icon: LayoutDashboard, perfis: ['CADISTA'] },
  { to: '/app/meus-pedidos', label: 'Meus Pedidos', icon: ClipboardList, perfis: ['DENTISTA'] },
  { to: '/app/pedidos/novo', label: 'Novo Pedido', icon: FilePlus, perfis: ['DENTISTA'] },
  { to: '/app/fila-modelagem', label: 'Fila de Modelagem', icon: PenTool, perfis: ['CADISTA'] },
  { to: '/app/pedidos', label: 'Pedidos', icon: ClipboardList, perfis: ['GESTOR', 'RECEPCAO', 'CADISTA'] },
  { to: '/app/triagem', label: 'Triagem', icon: ClipboardCheck, perfis: ['RECEPCAO'] },
  { to: '/app/producao', label: 'Produção', icon: Factory, perfis: ['GESTOR', 'RECEPCAO'] },
  { to: '/app/usuarios', label: 'Usuários', icon: Users, perfis: ['GESTOR', 'RECEPCAO'] },
  { to: '/app/relatorios', label: 'Relatórios', icon: BarChart3, perfis: ['GESTOR'] },
  { to: '/app/perfil', label: 'Perfil', icon: User, perfis: ['DENTISTA', 'RECEPCAO', 'CADISTA', 'GESTOR'] },
]

export function Sidebar({ aberto, onFechar }) {
  const { perfil, nome, sair } = useAuth()
  const navigate = useNavigate()
  const itens = ITENS.filter((item) => item.perfis.includes(perfil))

  function handleSair() {
    sair()
    navigate(ROTA_LOGIN)
  }

  return (
    <>
      {aberto && <div className="fixed inset-0 z-40 bg-ink/50 md:hidden" onClick={onFechar} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-sidebar transition-transform duration-200 md:translate-x-0 ${
          aberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-soft">
            <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M16 8.5c-1.9-1.6-4.9-1.9-6.4-.1-1.2 1.5-1 3.6-.3 5.4.7 1.7 1.4 3.3 1.7 5.1.2 1.1.4 2.6 1.4 2.6s1.2-1.6 1.4-2.7c.2-.9.7-2.1 2.2-2.1s2 1.2 2.2 2.1c.2 1.1.4 2.7 1.4 2.7s1.2-1.5 1.4-2.6c.3-1.8 1-3.4 1.7-5.1.7-1.8.9-3.9-.3-5.4-1.5-1.8-4.5-1.5-6.4.1z"
                fill="#ffffff"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Facilita Lab</p>
            <p className="text-[11px] text-sidebar-text">Gestão · Lab Odontológico</p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar menu"
            className="ml-auto rounded-lg p-1.5 text-sidebar-text hover:bg-sidebar-soft hover:text-white md:hidden"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {itens.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onFechar}
              className={({ isActive }) =>
                `flex items-center gap-3 border-l-2 px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'border-sidebar-line bg-sidebar-soft font-medium text-white'
                    : 'border-transparent text-sidebar-text hover:bg-sidebar-soft hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="shrink-0 border-t border-white/10 p-4">
          <p className="truncate text-sm font-medium text-white">{nome}</p>
          <p className="text-xs text-sidebar-text">{PERFIS[perfil]?.label}</p>
          <button
            type="button"
            onClick={handleSair}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-text transition-colors hover:bg-sidebar-soft hover:text-white"
          >
            <LogOut size={16} />
            Sair
          </button>
          <p className="mt-3 text-center text-[11px] text-sidebar-text">Facilita Lab © 2026</p>
        </div>
      </aside>
    </>
  )
}