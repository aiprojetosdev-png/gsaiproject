import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, Kanban, Users, BarChart3, Settings, LogOut } from 'lucide-react'
import Logo from './Logo'
import { aiAgents } from '../data/agents'

const nav = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/prospeccao',   icon: Search,           label: 'Prospecção' },
  { to: '/pipeline',     icon: Kanban,           label: 'Pipeline' },
  { to: '/clientes',     icon: Users,            label: 'Clientes' },
  { to: '/relatorios',   icon: BarChart3,         label: 'Relatórios' },
]

export default function Sidebar({ onLogout }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gs-dark flex flex-col z-30 border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <Logo />
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-150 relative
              ${isActive
                ? 'text-gs-cyan bg-white/5 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gs-cyan'
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* AI Status Widget */}
      <div className="mx-4 mb-4 p-4 bg-white/5 border border-white/10 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">AI Status</span>
          <span className="ml-auto text-[10px] text-gs-cyan font-semibold">ATIVO</span>
        </div>
        <div className="space-y-2">
          {aiAgents.map(agent => (
            <div key={agent.id} className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-white/70 truncate">{agent.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 p-4 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg transition-all">
          <Settings size={16} />
          Configurações
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  )
}
