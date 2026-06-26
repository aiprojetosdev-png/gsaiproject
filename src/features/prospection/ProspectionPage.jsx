import { useState, useEffect } from 'react'
import { X, ChevronRight, Building2, Users2, TrendingUp, Cpu, AlertTriangle, CheckCircle, Filter } from 'lucide-react'
import { leads, pendingLeads, prospectLeads, rejectedLeads } from '../../data/leads'

function ScoreBar({ score }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gs-cyan rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold text-gs-cyan w-6">{score}</span>
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
    <span className={`font-mono font-bold text-sm ${secs < 30 ? 'text-red-400' : 'text-gs-cyan'}`}>
      {m}:{s}
    </span>
  )
}

function LeadDrawer({ lead, onClose }) {
  if (!lead) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div className="w-[520px] bg-gs-dark border-l border-white/15 h-full overflow-y-auto animate-fade-in">
        <div className="sticky top-0 bg-gs-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-white text-lg">{lead.company}</h2>
            <p className="text-xs text-white/50">{lead.sector} · {lead.city}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Razão Social', lead.company],
              ['CNPJ', lead.cnpj],
              ['Faturamento', lead.revenue],
              ['Headcount', lead.headcount],
              ['Contato', lead.contact],
              ['Email', lead.email],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/5 rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{k}</p>
                <p className="text-sm text-white font-medium">{v}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Stack Tecnológica</p>
            <div className="flex flex-wrap gap-2">
              {lead.stack?.map(s => (
                <span key={s} className="text-xs bg-gs-blue border border-white/20 text-white/80 px-3 py-1 rounded-full flex items-center gap-1">
                  <Cpu size={10} />{s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Dores Identificadas pela IA</p>
            <div className="space-y-2">
              {lead.pains?.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <AlertTriangle size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gs-mid/80 border border-gs-cyan/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gs-cyan font-bold uppercase tracking-wider">Análise IA — Score {lead.score}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{lead.aiExplanation}</p>
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
      className={`gs-card p-5 cursor-pointer transition-all duration-300 ${
        exiting === 'approve' ? 'translate-x-8 opacity-0 scale-95 border-green-400' :
        exiting === 'reject'  ? '-translate-x-8 opacity-0 scale-95 border-red-400' :
        'hover:-translate-y-1 hover:shadow-cyan'
      }`}
      onClick={() => onOpen(lead)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gs-blue flex items-center justify-center text-xs font-black text-gs-cyan border border-gs-cyan/30">
            {lead.logo}
          </div>
          <div>
            <p className="font-bold text-white">{lead.company}</p>
            <p className="text-xs text-white/50">{lead.sector}</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-white/30" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
        <div><span className="text-white/40">Faturamento: </span><span className="text-white">{lead.revenue}</span></div>
        <div><span className="text-white/40">Headcount: </span><span className="text-white">{lead.headcount}</span></div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>Score IA</span>
        </div>
        <ScoreBar score={lead.score} />
      </div>

      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="text-white/40">IA decide em:</span>
        <Countdown initialSeconds={lead.timerSeconds} />
      </div>

      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
        <button onClick={handleApprove} className="flex-1 bg-gs-cyan text-gs-dark text-xs font-bold py-2 rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-1">
          <CheckCircle size={12} /> Aprovar
        </button>
        <button onClick={handleReject} className="flex-1 border border-white/30 text-white text-xs font-medium py-2 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-1">
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
    { id: 'pending',     label: `Pendentes (${pending.length})` },
    { id: 'prospecting', label: `Em Prospecção (${prospectLeads.length})` },
    { id: 'rejected',    label: `Não Aprovados (${rejectedLeads.length})` },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white">Prospecção<span className="text-gs-cyan">_</span></h1>
        <p className="text-white/50 text-sm mt-1">Gestão de leads identificados pelos agentes de IA</p>
      </div>

      {/* Banner */}
      <div className="bg-gs-mid border border-gs-cyan/30 rounded-xl px-5 py-3 flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gs-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gs-cyan" />
        </span>
        <p className="text-sm text-white">
          Agente de IA prospectando ativamente —{' '}
          <span className="text-gs-cyan font-bold">3 novos perfis identificados</span> nas últimas 2 horas
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-gs-mid border border-white/15 rounded-xl px-4 py-2.5">
          <Filter size={14} className="text-white/40" />
          <input
            type="text"
            placeholder="Filtrar setor..."
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-36"
          />
        </div>
        <div className="flex items-center gap-2 bg-gs-mid border border-white/15 rounded-xl px-4 py-2.5">
          <TrendingUp size={14} className="text-white/40" />
          <span className="text-xs text-white/40">Score mín.</span>
          <input
            type="range" min="0" max="100" value={filterScore}
            onChange={e => setFilterScore(Number(e.target.value))}
            className="accent-gs-cyan w-24"
          />
          <span className="text-xs text-gs-cyan font-bold w-6">{filterScore}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gs-dark rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? 'bg-gs-cyan text-gs-dark font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'pending' && (
        <div className="grid grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-white/30">
              <Users2 size={48} className="mx-auto mb-3 opacity-30" />
              <p>Nenhum lead pendente no momento</p>
            </div>
          ) : filtered.map(lead => (
            <PendingCard
              key={lead.id}
              lead={lead}
              onApprove={handleApprove}
              onReject={handleReject}
              onOpen={setDrawer}
            />
          ))}
        </div>
      )}

      {tab === 'prospecting' && (
        <div className="grid grid-cols-3 gap-4">
          {prospectLeads.map(lead => (
            <div key={lead.id} className="gs-card gs-card-hover p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gs-blue flex items-center justify-center text-xs font-black text-gs-cyan border border-gs-cyan/30">
                  {lead.logo}
                </div>
                <div>
                  <p className="font-bold text-white">{lead.company}</p>
                  <p className="text-xs text-white/50">{lead.sector}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {lead.aiActions?.map((action, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <div className={`w-1.5 h-1.5 rounded-full ${action.includes('✓') ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
                    {action}
                  </div>
                ))}
              </div>
              <div className="text-xs text-white/40 border-t border-white/10 pt-3">
                <span className="text-gs-cyan">Próxima ação: </span>{lead.nextAction}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'rejected' && (
        <div className="space-y-3">
          {rejectedLeads.map(lead => (
            <div key={lead.id} className="gs-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gs-blue flex items-center justify-center text-xs font-black text-white/40 border border-white/10">
                  {lead.logo}
                </div>
                <div>
                  <p className="font-semibold text-white">{lead.company}</p>
                  <p className="text-xs text-white/40">{lead.rejectionReason}</p>
                </div>
              </div>
              <button className="text-xs text-gs-cyan border border-gs-cyan/30 px-3 py-1.5 rounded-lg hover:bg-gs-cyan/10 transition-all">
                Revisar
              </button>
            </div>
          ))}
        </div>
      )}

      <LeadDrawer lead={drawer} onClose={() => setDrawer(null)} />
    </div>
  )
}
