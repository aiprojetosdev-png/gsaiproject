import { useState } from 'react'
import { ArrowLeft, FileText, CheckCircle, Clock, AlertTriangle, MessageSquare, TrendingUp, Users, BarChart2, Send } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { clients } from '../../data/clients'

function HealthBadge({ score }) {
  const cfg = score >= 90
    ? { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', label: 'Excelente' }
    : score >= 75
    ? { bg: 'bg-blue-50', text: 'text-gs-blue', border: 'border-blue-100', label: 'Bom' }
    : { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', label: 'Atenção' }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {score} · {cfg.label}
    </span>
  )
}

function HealthBar({ score }) {
  const color = score >= 90 ? 'bg-emerald-500' : score >= 75 ? 'bg-gs-blue' : 'bg-amber-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold text-slate-600 w-5">{score}</span>
    </div>
  )
}

function StatusChip({ status }) {
  if (status === 'done')        return <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><CheckCircle size={11} />Concluído</span>
  if (status === 'in-progress') return <span className="flex items-center gap-1 text-xs text-gs-blue font-medium"><Clock size={11} />Em andamento</span>
  return <span className="text-xs text-slate-400">Planejado</span>
}

const aiReplies = [
  'Com base no NPS atual, recomendo agendar uma revisão trimestral para identificar oportunidades de expansão.',
  'Detectei 3 funcionalidades subutilizadas que podem aumentar o ROI em até 18%. Sugiro treinamento focado.',
  'Momento ideal para proposta de upsell no módulo Analytics Avançado. Probabilidade de aceitação: 76%.',
  'Aumento de tickets nos últimos 14 dias. Recomendo contato proativo do CS para evitar queda no NPS.',
]

function ClientDetail({ client, onBack }) {
  const [tab, setTab]           = useState('overview')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Olá! Sou o Agente IA da Globalsys. Como posso ajudar na gestão deste cliente?' }
  ])

  const sendMessage = () => {
    if (!chatInput.trim()) return
    setMessages(p => [...p, { role: 'user', text: chatInput }])
    setChatInput('')
    setTimeout(() => setMessages(p => [...p, { role: 'ai', text: aiReplies[Math.floor(Math.random() * aiReplies.length)] }]), 800)
  }

  const npsData = client.npsHistory.map((v, i) => ({ m: `M${i + 1}`, nps: v }))

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart2 },
    { id: 'project',  label: 'Projeto',     icon: CheckCircle },
    { id: 'ai',       label: 'Acomp. IA',  icon: MessageSquare },
    { id: 'health',   label: 'Saúde',       icon: TrendingUp },
    { id: 'docs',     label: 'Documentos',  icon: FileText },
    { id: 'history',  label: 'Histórico',   icon: Clock },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-500">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900">{client.name}</h1>
          <p className="text-sm text-slate-500">{client.solution} · {client.sector}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <HealthBadge score={client.healthScore} />
          {client.aiAlerts?.map((a, i) => (
            <span key={i} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-medium ${a.level === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-blue-100 bg-blue-50 text-gs-blue'}`}>
              <AlertTriangle size={11} />{a.msg}
            </span>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ['MRR', `R$ ${client.kpis.mrr.toLocaleString('pt-BR')}`, 'text-gs-blue'],
          ['Economia', client.kpis.savings, 'text-emerald-600'],
          ['Automações', client.kpis.automations, 'text-gs-blue'],
          ['Usuários', client.kpis.users, 'text-slate-900'],
        ].map(([k, v, c]) => (
          <div key={k} className="card p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{k}</p>
            <p className={`text-2xl font-black ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${tab === id ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Icon size={12} />{label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {tab === 'overview' && (
          <div className="grid grid-cols-2 gap-5">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Contrato & Contato</h3>
              <div className="space-y-3">
                {[
                  ['Valor anual', client.contract],
                  ['Início', client.contractStart],
                  ['Renovação', client.renewal],
                  ['SLA', client.sla],
                  ['Uptime', `${client.uptime}%`],
                  ['Tickets abertos', client.openTickets],
                  ['Contato', client.contact],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-50 last:border-0">
                    <span className="text-slate-400">{k}</span>
                    <span className="text-slate-800 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Timeline</h3>
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-100" />
                <div className="space-y-4 ml-8">
                  {client.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-gs-blue border-2 border-white ring-1 ring-blue-100" />
                      <p className="text-[10px] text-slate-400 mb-0.5">{t.date}</p>
                      <p className="text-sm text-slate-700">{t.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'project' && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-900">Squad & Entregas</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Users size={13} />{client.squad.length} membros</div>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {client.squad.map(s => (
                <span key={s} className="text-xs bg-blue-50 border border-blue-100 text-gs-blue px-3 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
            <div className="space-y-2">
              {client.deliveries.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{d.name}</p>
                    <p className="text-xs text-slate-400">{d.date}</p>
                  </div>
                  <StatusChip status={d.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'ai' && (
          <div className="card p-5 flex flex-col" style={{ height: '420px' }}>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gs-blue flex items-center justify-center"><MessageSquare size={12} className="text-white" /></div>
              Acompanhamento com IA
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gs-blue flex items-center justify-center shrink-0">
                      <MessageSquare size={11} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] text-sm px-4 py-3 rounded-2xl leading-relaxed ${m.role === 'ai' ? 'bg-slate-50 border border-slate-100 text-slate-700' : 'bg-gs-blue text-white font-medium'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 border-t border-slate-100 pt-4">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Digite uma instrução para a IA..."
                className="input-field flex-1"
              />
              <button onClick={sendMessage} className="btn-primary px-3.5">
                <Send size={15} />
              </button>
            </div>
          </div>
        )}

        {tab === 'health' && (
          <div className="grid grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Evolução do NPS</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={npsData}>
                  <defs>
                    <linearGradient id="npsG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1A1AE6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A1AE6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="m" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="nps" stroke="#1A1AE6" strokeWidth={2.5} fill="url(#npsG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Health Score</h3>
              <div className="flex flex-col items-center justify-center py-6">
                <p className="text-6xl font-black text-gs-blue mb-3">{client.healthScore}</p>
                <div className="w-full mb-4"><HealthBar score={client.healthScore} /></div>
                <HealthBadge score={client.healthScore} />
              </div>
              <div className="space-y-2 mt-2">
                {client.aiAlerts?.length === 0 && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                    <CheckCircle size={14} />Nenhum alerta de risco detectado
                  </div>
                )}
                {client.aiAlerts?.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                    <AlertTriangle size={14} />{a.msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'docs' && (
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Documentos</h3>
            <div className="space-y-2">
              {client.docs.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-all group border border-transparent hover:border-slate-100">
                  <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-gs-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{d.name}</p>
                    <p className="text-xs text-slate-400">{d.size} · {d.date}</p>
                  </div>
                  <span className="text-xs text-gs-blue opacity-0 group-hover:opacity-100 font-medium transition-all">Download ↓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 mb-5">Histórico Comercial</h3>
            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-100" />
              <div className="space-y-5 ml-8">
                {client.timeline.map((t, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-gs-blue border-2 border-white ring-1 ring-blue-100" />
                    <p className="text-xs text-gs-blue font-semibold mb-1">{t.date}</p>
                    <p className="text-sm text-slate-700">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ClientsPage() {
  const [selected, setSelected] = useState(null)
  if (selected) return <ClientDetail client={selected} onBack={() => setSelected(null)} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Clientes<span className="text-gs-cyan">_</span></h1>
          <p className="text-sm text-slate-500 mt-0.5">{clients.length} clientes ativos no portfólio Enterprise</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
          MRR Total: <span className="text-gs-blue font-bold ml-1">R$ 357.500</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {clients.map(client => (
          <div key={client.id} onClick={() => setSelected(client)} className="card card-hover p-5 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-black text-gs-blue">
                  {client.logo}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{client.name}</p>
                  <p className="text-xs text-slate-400">{client.sector}</p>
                </div>
              </div>
              <HealthBadge score={client.healthScore} />
            </div>

            <p className="text-xs text-slate-400 mb-3">{client.solution}</p>
            <div className="mb-4"><HealthBar score={client.healthScore} /></div>

            <div className="flex items-center justify-between text-xs border-t border-slate-50 pt-3">
              <span className="text-slate-500 truncate flex-1">{client.contact.split('—')[0].trim()}</span>
              <span className="text-gs-blue font-medium ml-2 shrink-0">Ver detalhes →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
