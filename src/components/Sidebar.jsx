import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, Kanban, Users, BarChart3, Settings, LogOut, Activity } from 'lucide-react'
import Logo from './Logo'
import { aiAgents } from '../data/agents'

const nav = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/prospeccao',   icon: Search,           label: 'Prospecção' },
  { to: '/pipeline',     icon: Kanban,           label: 'Pipeline' },
  { to: '/clientes',     icon: Users,            label: 'Clientes' },
  { to: '/relatorios',   icon: BarChart3,        label: 'Relatórios' },
]

export default function Sidebar({ onLogout }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gs-dark flex flex-col z-30">
      <div className="px-5 py-5 border-b border-white/8">
        <Logo />
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="px-3 space-y-0.5">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative
                ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-gs-cyan rounded-r-full" />
                  )}
                  <Icon size={16} className={({ isActive }) => isActive ? 'text-gs-cyan' : ''} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* AI Status */}
      <div className="mx-3 mb-3 bg-white/5 border border-white/8 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={12} className="text-gs-cyan" />
          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">AI Agents</span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
        {aiAgents.map(agent => (
          <div key={agent.id} className="flex items-center gap-2 mb-2 last:mb-0">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            <span className="text-xs text-white/50 truncate">{agent.name}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8 p-3 space-y-0.5">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/5 rounded-xl transition-all">
          <Settings size={15} />
          Configurações
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/5 rounded-xl transition-all"
        >
          <LogOut size={15} />
          Sair
        </button>
      </div>
    </aside>
  )
}
