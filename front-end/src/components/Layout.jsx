import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar aberto={menuAberto} onFechar={() => setMenuAberto(false)} />
      <div className="md:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-card px-4 md:hidden">
          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-ink">Facilita Lab</span>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}