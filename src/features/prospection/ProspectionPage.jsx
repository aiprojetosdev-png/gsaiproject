import { useState, useEffect, useMemo } from 'react'
import {
  X, ChevronRight, Cpu, AlertTriangle, CheckCircle, Filter,
  TrendingUp, Users2, Search, BarChart2, Zap, Clock, RefreshCw,
  ArrowUpRight, Target,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { leads, pendingLeads, prospectLeads, rejectedLeads, leadsStats } from '../../data/leads'

/* ─── Score bar ─── */
function ScoreBar({ score, small = false }) {
  const color = score >= 80 ? 'bg-gs-blue' : score >= 65 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className={`flex items-center gap-2 ${small ? '' : ''}`}>
      <div className={`flex-1 ${small ? 'h-1' : 'h-1.5'} bg-slate-100 rounded-full overflow-hidden`}>
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`font-bold text-slate-700 ${small ? 'text-[10px] w-4' : 'text-xs w-5'}`}>{score}</span>
    </div>
  )
}

/* ─── Countdown ─── */
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
    <span className={`font-mono font-bold text-xs ${secs < 30 ? 'text-red-500' : 'text-gs-blue'}`}>
      {m}:{s}
    </span>
  )
}

/* ─── Lead Drawer (perfil completo) ─── */
function LeadDrawer({ lead, onClose, onApprove, onReject }) {
  if (!lead) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose} />
      <div className="w-[540px] bg-white border-l border-slate-100 h-full overflow-y-auto shadow-card-lg animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-gs-blue">
            {lead.logo}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-slate-900">{lead.company}</h2>
            <p className="text-xs text-slate-400">{lead.sector} · {lead.city}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><X size={16} /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Score em destaque */}
          {lead.score && (
            <div className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gs-blue uppercase tracking-wider mb-1">Score IA</p>
                <ScoreBar score={lead.score} />
              </div>
              <div className="text-3xl font-black text-gs-blue">{lead.score}</div>
            </div>
          )}

          {/* Dados */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Razão Social', lead.company],
              ['CNPJ', lead.cnpj],
              ['Faturamento', lead.revenue],
              ['Headcount', lead.headcount],
              ['Cidade', lead.city],
              ['Origem', lead.origem || '—'],
              ['Contato', lead.contact],
              ['Email', lead.email],
            ].map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{k}</p>
                <p className="text-xs text-slate-800 font-medium leading-snug">{v}</p>
              </div>
            ))}
          </div>

          {/* Stack */}
          {lead.stack && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Stack Tecnológica</p>
              <div className="flex flex-wrap gap-2">
                {lead.stack.map(s => (
                  <span key={s} className="flex items-center gap-1.5 text-xs bg-blue-50 border border-blue-100 text-gs-blue px-3 py-1 rounded-full">
                    <Cpu size={10} />{s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dores */}
          {lead.pains && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Dores Identificadas</p>
              <div className="space-y-2">
                {lead.pains.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-slate-700">
                    <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />{p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Análise IA */}
          {lead.aiExplanation && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-gs-blue" />
                <p className="text-xs font-semibold text-gs-blue uppercase tracking-wider">Análise da IA</p>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{lead.aiExplanation}</p>
            </div>
          )}

          {/* Ações */}
          {lead.status === 'pending' && (
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => { onApprove(lead.id); onClose() }}
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
              >
                <CheckCircle size={15} />Aprovar Lead
              </button>
              <button
                onClick={() => { onReject(lead.id); onClose() }}
                className="flex-1 btn-ghost py-3 flex items-center justify-center gap-2"
              >
                <X size={15} />Recusar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Card pendente ─── */
function PendingCard({ lead, onApprove, onReject, onOpen, selected, onSelect }) {
  const [exiting, setExiting] = useState(null)
  const approve = (e) => { e.stopPropagation(); setExiting('approve'); setTimeout(() => onApprove(lead.id), 350) }
  const reject  = (e) => { e.stopPropagation(); setExiting('reject');  setTimeout(() => onReject(lead.id),  350) }

  return (
    <div
      className={`card p-5 cursor-pointer transition-all duration-300 relative ${
        exiting === 'approve' ? 'translate-x-4 opacity-0 ring-2 ring-green-400' :
        exiting === 'reject'  ? '-translate-x-4 opacity-0 ring-2 ring-red-300' :
        'card-hover'
      } ${selected ? 'ring-2 ring-gs-blue' : ''}`}
      onClick={() => onOpen(lead)}
    >
      {/* Checkbox */}
      <div
        className="absolute top-4 right-4"
        onClick={e => { e.stopPropagation(); onSelect(lead.id) }}
      >
        <div className={`w-4 h-4 rounded border-2 transition-all ${selected ? 'bg-gs-blue border-gs-blue' : 'border-slate-200 hover:border-gs-blue'} flex items-center justify-center`}>
          {selected && <CheckCircle size={10} className="text-white" />}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 pr-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-gs-blue shrink-0">
          {lead.logo}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{lead.company}</p>
          <p className="text-xs text-slate-400">{lead.sector}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[10px] text-slate-400">Faturamento</p>
          <p className="text-xs font-semibold text-slate-700">{lead.revenue}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[10px] text-slate-400">Origem</p>
          <p className="text-xs font-semibold text-slate-700">{lead.origem}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>Score IA</span></div>
        <ScoreBar score={lead.score} />
      </div>

      <div className="flex items-center justify-between mb-4 py-2 border-t border-slate-50">
        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} />IA decide em</span>
        <Countdown initialSeconds={lead.timerSeconds} />
      </div>

      <div className="flex gap-2">
        <button onClick={approve} className="flex-1 bg-gs-blue text-white text-xs font-semibold py-2 rounded-xl hover:bg-gs-mid transition-all flex items-center justify-center gap-1.5">
          <CheckCircle size={11} />Aprovar
        </button>
        <button onClick={reject} className="flex-1 btn-ghost text-xs py-2 flex items-center justify-center gap-1.5">
          <X size={11} />Recusar
        </button>
      </div>
    </div>
  )
}

/* ─── Stats bar ─── */
function StatsBar() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {[
        { label: 'Identificados hoje', value: leadsStats.qualificadosHoje, icon: Zap, color: 'text-gs-blue bg-blue-50 border-blue-100' },
        { label: 'Total no pipeline',  value: leadsStats.totalIdentificados, icon: Users2, color: 'text-purple-600 bg-purple-50 border-purple-100' },
        { label: 'Taxa de aprovação',  value: `${leadsStats.taxaAprovacao}%`, icon: Target, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        { label: 'Score mediano',      value: leadsStats.scoreMediano, icon: BarChart2, color: 'text-gs-blue bg-blue-50 border-blue-100' },
        { label: 'Setores mapeados',   value: leadsStats.setores.length, icon: TrendingUp, color: 'text-amber-600 bg-amber-50 border-amber-100' },
      ].map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="card p-4">
          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center mb-2 ${color}`}>
            <Icon size={13} />
          </div>
          <p className="text-lg font-black text-slate-900">{value}</p>
          <p className="text-xs text-slate-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}

/* ─── Radar IA ─── */
function RadarIA() {
  const [scanning, setScanning] = useState(true)
  const [found, setFound] = useState(3)

  useEffect(() => {
    const t = setInterval(() => {
      setScanning(v => !v)
      if (Math.random() > 0.5) setFound(f => f + 1)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="card p-5 flex items-center gap-5">
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <div className={`absolute inset-0 rounded-full border-2 border-gs-blue transition-all duration-1000 ${scanning ? 'scale-150 opacity-0' : 'scale-100 opacity-40'}`} />
        <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
          <RefreshCw size={16} className={`text-gs-blue ${scanning ? 'animate-spin' : ''}`} />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">Radar IA — Prospectando ativamente</p>
        <p className="text-xs text-slate-400">Analisando LinkedIn, bases públicas e news em tempo real</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gs-blue opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gs-blue" />
        </span>
        <span className="text-sm font-bold text-gs-blue">{found} novos hoje</span>
      </div>
    </div>
  )
}

/* ─── Gráfico origens ─── */
function OrigensChart() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Origem dos Leads</h3>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={leadsStats.origens} layout="vertical" barSize={16}>
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
          <Tooltip
            contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, fontSize: 12 }}
            formatter={v => [`${v} leads`]}
          />
          <Bar dataKey="count" fill="#1A1AE6" radius={[0,4,4,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ─── Setores ─── */
function SetoresChart() {
  const total = leadsStats.setores.reduce((s, i) => s + i.count, 0)
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Leads por Setor</h3>
      <div className="space-y-2.5">
        {leadsStats.setores.map(s => (
          <div key={s.name}>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{s.name}</span>
              <span className="font-medium">{s.count}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gs-blue rounded-full" style={{ width: `${(s.count / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main ─── */
export default function ProspectionPage() {
  const [tab, setTab]             = useState('pending')
  const [pending, setPending]     = useState(pendingLeads)
  const [drawer, setDrawer]       = useState(null)
  const [selected, setSelected]   = useState([])
  const [search, setSearch]       = useState('')
  const [filterScore, setFilterScore] = useState(0)
  const [filterSector, setFilterSector] = useState('')
  const [sortBy, setSortBy]       = useState('score')
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleApprove = (id) => setPending(p => p.filter(l => l.id !== id))
  const handleReject  = (id) => setPending(p => p.filter(l => l.id !== id))
  const toggleSelect  = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const approveAll    = () => { selected.forEach(id => setPending(p => p.filter(l => l.id !== id))); setSelected([]) }

  const filtered = useMemo(() => {
    let list = [...pending]
    if (search) list = list.filter(l => l.company.toLowerCase().includes(search.toLowerCase()) || l.sector.toLowerCase().includes(search.toLowerCase()))
    if (filterSector) list = list.filter(l => l.sector.toLowerCase().includes(filterSector.toLowerCase()))
    if (filterScore > 0) list = list.filter(l => l.score >= filterScore)
    list.sort((a, b) => sortBy === 'score' ? b.score - a.score : sortBy === 'revenue' ? b.faturamentoNum - a.faturamentoNum : a.company.localeCompare(b.company))
    return list
  }, [pending, search, filterSector, filterScore, sortBy])

  const tabs = [
    { id: 'pending',     label: 'Pendentes',     count: pending.length },
    { id: 'prospecting', label: 'Em Prospecção', count: prospectLeads.length },
    { id: 'rejected',    label: 'Não Aprovados', count: rejectedLeads.length },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Prospecção<span className="text-gs-cyan">_</span></h1>
          <p className="text-sm text-slate-500 mt-0.5">Leads qualificados pelo Agente IA em tempo real</p>
        </div>
        <button
          onClick={() => setShowAnalytics(v => !v)}
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition-all ${showAnalytics ? 'bg-gs-blue text-white border-gs-blue' : 'btn-ghost'}`}
        >
          <BarChart2 size={14} />Analytics
        </button>
      </div>

      {/* Stats */}
      <StatsBar />

      {/* Radar IA */}
      <RadarIA />

      {/* Analytics panel */}
      {showAnalytics && (
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <OrigensChart />
          <SetoresChart />
        </div>
      )}

      {/* Filters */}
      <div className="card p-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <Search size={13} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar empresa ou setor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-44"
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <Filter size={13} className="text-slate-400" />
          <input
            type="text"
            placeholder="Setor..."
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-28"
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <TrendingUp size={13} className="text-slate-400" />
          <span className="text-xs text-slate-400">Score ≥</span>
          <input type="range" min="0" max="100" value={filterScore} onChange={e => setFilterScore(Number(e.target.value))} className="accent-gs-blue w-20" />
          <span className="text-xs font-bold text-gs-blue w-5">{filterScore}</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5">
          <span className="text-xs text-slate-400 mr-1">Ordenar:</span>
          {[['score', 'Score'], ['revenue', 'Faturamento'], ['name', 'Nome']].map(([v, l]) => (
            <button key={v} onClick={() => setSortBy(v)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${sortBy === v ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-slate-500">{selected.length} selecionados</span>
            <button onClick={approveAll} className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
              <CheckCircle size={12} />Aprovar todos
            </button>
            <button onClick={() => setSelected([])} className="btn-ghost text-xs py-1.5 px-3">Limpar</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === t.id ? 'bg-gs-blue text-white' : 'bg-slate-200 text-slate-500'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* PENDING */}
      {tab === 'pending' && (
        <div className="animate-fade-in">
          {filtered.length === 0 ? (
            <div className="card p-16 text-center text-slate-400">
              <Users2 size={40} className="mx-auto mb-3 opacity-30" />
              <p>Nenhum lead encontrado com esses filtros</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-400 mb-3">{filtered.length} lead{filtered.length > 1 ? 's' : ''} encontrado{filtered.length > 1 ? 's' : ''}</p>
              <div className="grid grid-cols-3 gap-4">
                {filtered.map(lead => (
                  <PendingCard
                    key={lead.id}
                    lead={lead}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onOpen={setDrawer}
                    selected={selected.includes(lead.id)}
                    onSelect={toggleSelect}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* PROSPECTING */}
      {tab === 'prospecting' && (
        <div className="space-y-3 animate-fade-in">
          {prospectLeads.map(lead => (
            <div key={lead.id} className="card p-5 flex items-center gap-5 card-hover cursor-pointer" onClick={() => setDrawer(lead)}>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-gs-blue shrink-0">
                {lead.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{lead.company}</p>
                <p className="text-xs text-slate-400">{lead.sector} · {lead.revenue}</p>
              </div>
              <div className="flex items-center gap-3">
                {lead.aiActions?.map((action, i) => (
                  <span key={i} className={`text-xs flex items-center gap-1 font-medium ${action.includes('✓') ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {action.includes('✓') ? <CheckCircle size={11} /> : <Clock size={11} />}
                    {action.replace(' ✓', '')}
                  </span>
                ))}
              </div>
              <div className="text-right min-w-40">
                <p className="text-xs text-slate-400">Próxima ação</p>
                <p className="text-xs font-medium text-gs-blue mt-0.5">{lead.nextAction}</p>
              </div>
              <div className="w-24">
                <ScoreBar score={lead.score} small />
              </div>
              <ChevronRight size={15} className="text-slate-300" />
            </div>
          ))}
        </div>
      )}

      {/* REJECTED */}
      {tab === 'rejected' && (
        <div className="space-y-2 animate-fade-in">
          <div className="card overflow-hidden">
            {rejectedLeads.map((lead, i) => (
              <div key={lead.id} className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-all ${i < rejectedLeads.length - 1 ? 'border-b border-slate-50' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                  {lead.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{lead.company}</p>
                  <p className="text-xs text-slate-400 truncate">{lead.rejectionReason}</p>
                </div>
                <div className="w-24"><ScoreBar score={lead.score} small /></div>
                <span className="text-xs text-slate-400">{lead.sector}</span>
                <button className="btn-ghost text-xs py-1.5 px-3">Revisar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawer */}
      <LeadDrawer
        lead={drawer}
        onClose={() => setDrawer(null)}
        onApprove={id => { handleApprove(id); setDrawer(null) }}
        onReject={id => { handleReject(id); setDrawer(null) }}
      />
    </div>
  )
}
