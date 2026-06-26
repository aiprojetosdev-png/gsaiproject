import { Bell, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Header({ user }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const notifs = [
    { id: 1, msg: 'Lead Magazine Luiza aguarda aprovação', time: '3 min' },
    { id: 2, msg: 'Relatório Nestlé pronto para revisão', time: '15 min' },
    { id: 3, msg: 'Contrato ArcelorMittal vence em 129 dias', time: '1h' },
  ]

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-gs-mid border-b border-white/10 flex items-center px-6 z-20">
      <div className="ml-auto flex items-center gap-4">
        {/* Bell */}
        <div className="relative">
          <button onClick={() => setNotifOpen(v => !v)} className="relative p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <Bell size={20} />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gs-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gs-cyan" />
            </span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-gs-dark border border-white/15 rounded-xl shadow-cyan overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/10 text-xs font-semibold text-white/50 uppercase tracking-wider">
                Notificações
              </div>
              {notifs.map(n => (
                <div key={n.id} className="px-4 py-3 border-b border-white/5 hover:bg-white/5 cursor-pointer">
                  <p className="text-sm text-white/80">{n.msg}</p>
                  <p className="text-xs text-white/40 mt-0.5">há {n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gs-cyan flex items-center justify-center text-gs-dark font-bold text-sm">
            {user?.name?.[0] || 'G'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white leading-none">{user?.name || 'Gestor'}</p>
            <p className="text-xs text-white/50 mt-0.5">
              <span className="text-gs-cyan font-medium">Gestor</span>
            </p>
          </div>
          <ChevronDown size={14} className="text-white/40" />
        </div>
      </div>
    </header>
  )
}
