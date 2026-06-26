import { useState, useEffect } from 'react'
import { X, ChevronRight, Cpu, AlertTriangle, CheckCircle, Filter, TrendingUp, Users2 } from 'lucide-react'
import { leads, pendingLeads, prospectLeads, rejectedLeads } from '../../data/leads'

function ScoreBar({ score }) {
  const color = score >= 80 ? 'bg-gs-blue' : score >= 65 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold text-slate-700 w-5">{score}</span>
    </div>
  )
}

function Countdown({ initialSeconds }) {
  const [secs, setSecs] = useState(initialSeconds)
  useEffect(() => {
    if (secs <= 0) return
    const t = setTimeout(() => setSecs(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs])
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return (
    <span className={`font-mono font-bold text-sm ${secs < 30 ? 'text-red-500' : 'text-gs-blue'}`}>
      {m}:{s}
    </span>
  )
}

function LeadDrawer({ lead, onClose }) {
  if (!lead) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-[520px] bg-white border-l border-slate-100 h-full overflow-y-auto animate-fade-in shadow-card-lg">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">{lead.company}</h2>
            <p className="text-xs text-slate-500">{lead.sector} · {lead.city}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Razão Social', lead.company],
              ['CNPJ', lead.cnpj],
              ['Faturamento', lead.revenue],
              ['Headcount', lead.headcount],
              ['Contato', lead.contact],
              ['Email', lead.email],
            ].map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{k}</p>
                <p className="text-sm text-slate-800 font-medium">{v}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Stack Tecnológica</p>
            <div className="flex flex-wrap gap-2">
              {lead.stack?.map(s => (
                <span key={s} className="text-xs bg-blue-50 border border-blue-100 text-gs-blue px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Cpu size={10} />{s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Dores Identificadas pela IA</p>
            <div className="space-y-2">
              {lead.pains?.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                  <AlertTriangle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-gs-blue uppercase tracking-wider mb-2">Análise IA — Score {lead.score}</p>
            <p className="text-sm text-slate-700 leading-relaxed">{lead.aiExplanation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PendingCard({ lead, onApprove, onReject, onOpen }) {
  const [exiting, setExiting] = useState(null)
  const handleApprove = () => { setExiting('approve'); setTimeout(() => onApprove(lead.id), 400) }
  const handleReject  = () => { setExiting('reject');  setTimeout(() => onReject(lead.id), 400) }
  return (
    <div
      className={`card p-5 cursor-pointer transition-all duration-300 ${
        exiting === 'approve' ? 'translate-x-4 opacity-0 ring-2 ring-green-400' :
        exiting === 'reject'  ? '-translate-x-4 opacity-0 ring-2 ring-red-400' :
        'card-hover'
      }`}
      onClick={() => onOpen(lead)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-gs-blue">
            {lead.logo}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{lead.company}</p>
            <p className="text-xs text-slate-400">{lead.sector}</p>
          </div>
        </div>
        <ChevronRight size={15} className="text-slate-300" />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="bg-slate-50 rounded-lg p-2">
          <span className="text-slate-400 block">Faturamento</span>
          <span className="font-semibold text-slate-700">{lead.revenue}</span>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <span className="text-slate-400 block">Headcount</span>
          <span className="font-semibold text-slate-700">{lead.headcount}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5"><span>Score IA</span></div>
        <ScoreBar score={lead.score} />
      </div>

      <div className="flex items-center justify-between mb-4 py-2 border-t border-slate-50">
        <span className="text-xs text-slate-400">IA decide em:</span>
        <Countdown initialSeconds={lead.timerSeconds} />
      </div>

      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
        <button onClick={handleApprove} className="flex-1 bg-gs-blue text-white text-xs font-semibold py-2 rounded-xl hover:bg-gs-mid transition-all flex items-center justify-center gap-1.5">
          <CheckCircle size={12} /> Aprovar
        </button>
        <button onClick={handleReject} className="flex-1 btn-ghost text-xs py-2 flex items-center justify-center gap-1.5">
          <X size={12} /> Recusar
        </button>
      </div>
    </div>
  )
}

export default function ProspectionPage() {
  const [tab, setTab]         = useState('pending')
  const [pending, setPending] = useState(pendingLeads)
  const [drawer, setDrawer]   = useState(null)
  const [filterSector, setFilterSector] = useState('')
  const [filterScore, setFilterScore]   = useState(0)

  const handleApprove = id => setPending(p => p.filter(l => l.id !== id))
  const handleReject  = id => setPending(p => p.filter(l => l.id !== id))

  const filtered = pending.filter(l =>
    (!filterSector || l.sector.toLowerCase().includes(filterSector.toLowerCase())) &&
    l.score >= filterScore
  )

  const tabs = [
    { id: 'pending',     label: 'Pendentes',       count: pending.length },
    { id: 'prospecting', label: 'Em Prospecção',   count: prospectLeads.length },
    { id: 'rejected',    label: 'Não Aprovados',   count: rejectedLeads.length },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Prospecção<span className="text-gs-cyan">_</span></h1>
        <p className="text-sm text-slate-500 mt-0.5">Leads qualificados pelos agentes de IA</p>
      </div>

      {/* Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3.5 flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gs-blue opacity-50" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gs-blue" />
        </span>
        <p className="text-sm text-slate-700">
          Agente prospectando ativamente —{' '}
          <span className="text-gs-blue font-semibold">3 novos perfis identificados</span> nas últimas 2 horas
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5">
          <Filter size={13} className="text-slate-400" />
          <input
            type="text"
            placeholder="Filtrar por setor..."
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-36"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5">
          <TrendingUp size={13} className="text-slate-400" />
          <span className="text-xs text-slate-400">Score mín.</span>
          <input type="range" min="0" max="100" value={filterScore} onChange={e => setFilterScore(Number(e.target.value))} className="accent-gs-blue w-20" />
          <span className="text-xs font-bold text-gs-blue w-5">{filterScore}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === t.id ? 'bg-gs-blue text-white' : 'bg-slate-200 text-slate-500'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'pending' && (
        <div className="grid grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-slate-400">
              <Users2 size={40} className="mx-auto mb-3 opacity-30" />
              <p>Nenhum lead pendente</p>
            </div>
          ) : filtered.map(lead => (
            <PendingCard key={lead.id} lead={lead} onApprove={handleApprove} onReject={handleReject} onOpen={setDrawer} />
          ))}
        </div>
      )}

      {tab === 'prospecting' && (
        <div className="grid grid-cols-3 gap-4">
          {prospectLeads.map(lead => (
            <div key={lead.id} className="card card-hover p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-gs-blue">{lead.logo}</div>
                <div>
                  <p className="font-semibold text-slate-900">{lead.company}</p>
                  <p className="text-xs text-slate-400">{lead.sector}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {lead.aiActions?.map((action, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${action.includes('✓') ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`} />
                    {action}
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-500 border-t border-slate-50 pt-3">
                <span className="text-gs-blue font-medium">Próxima: </span>{lead.nextAction}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'rejected' && (
        <div className="space-y-2">
          {rejectedLeads.map(lead => (
            <div key={lead.id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{lead.logo}</div>
                <div>
                  <p className="font-semibold text-slate-800">{lead.company}</p>
                  <p className="text-xs text-slate-400">{lead.rejectionReason}</p>
                </div>
              </div>
              <button className="btn-ghost text-xs py-1.5 px-3">Revisar</button>
            </div>
          ))}
        </div>
      )}

      <LeadDrawer lead={drawer} onClose={() => setDrawer(null)} />
    </div>
  )
}
