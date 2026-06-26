import { Bell, ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'

export default function Header({ user }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const notifs = [
    { id: 1, msg: 'Lead Magazine Luiza aguarda aprovação', time: '3 min', dot: 'bg-blue-500' },
    { id: 2, msg: 'Relatório Nestlé pronto para revisão', time: '15 min', dot: 'bg-gs-cyan' },
    { id: 3, msg: 'Contrato ArcelorMittal vence em 129 dias', time: '1h', dot: 'bg-amber-400' },
  ]

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white border-b border-slate-100 flex items-center px-6 z-20">
      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-72">
        <Search size={14} className="text-slate-400" />
        <input placeholder="Buscar clientes, leads..." className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none flex-1" />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(v => !v)}
            className="relative w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gs-blue border-2 border-white" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-slate-100 rounded-2xl shadow-card-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notificações</span>
                <span className="text-xs text-gs-blue font-medium cursor-pointer hover:underline">Marcar todas como lidas</span>
              </div>
              {notifs.map(n => (
                <div key={n.id} className="px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-sm text-slate-700">{n.msg}</p>
                    <p className="text-xs text-slate-400 mt-0.5">há {n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-slate-200" />

        {/* User */}
        <div className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 rounded-xl px-2 py-1.5 transition-all">
          <div className="w-7 h-7 rounded-full bg-gs-blue flex items-center justify-center text-white font-bold text-xs">
            {user?.name?.[0]?.toUpperCase() || 'G'}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'Gestor'}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Gestor · Admin</p>
          </div>
          <ChevronDown size={13} className="text-slate-400" />
        </div>
      </div>
    </header>
  )
}
