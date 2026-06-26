import { useState } from 'react'
import { ArrowLeft, FileText, CheckCircle, Clock, AlertTriangle, MessageSquare, TrendingUp, Users, BarChart2, Send } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { clients } from '../../data/clients'

function HealthBar({ score }) {
  const color = score >= 90 ? '#00E5FF' : score >= 75 ? '#34d399' : '#fbbf24'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-6" style={{ color }}>{score}</span>
    </div>
  )
}

function StatusBadge({ status }) {
  if (status === 'done') return <span className="text-green-400 flex items-center gap-1 text-xs"><CheckCircle size={11} />Concluído</span>
  if (status === 'in-progress') return <span className="text-gs-cyan flex items-center gap-1 text-xs"><Clock size={11} />Em andamento</span>
  return <span className="text-white/40 text-xs">Planejado</span>
}

const aiReplies = [
  'Com base no histórico do cliente e no NPS atual, recomendo agendar uma revisão trimestral para alinhar expectativas e identificar oportunidades de expansão do contrato.',
  'Analisando os dados de uso da plataforma, identifiquei 3 funcionalidades subutilizadas que poderiam aumentar o ROI do cliente em até 18%. Recomendo um treinamento focado.',
  'O cliente apresenta sinais de alta satisfação. Momento ideal para proposta de upsell no módulo Analytics Avançado. Probabilidade de aceitação: 76%.',
  'Detectei aumento de tickets nos últimos 14 dias. Recomendo contato proativo do CS nos próximos 2 dias para evitar queda no NPS.',
]

function ClientDetail({ client, onBack }) {
  const [tab, setTab]         = useState('overview')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages]   = useState([
    { role: 'ai', text: 'Olá! Sou o Agente IA da Globalsys. Como posso ajudar com a gestão deste cliente?' }
  ])

  const sendMessage = () => {
    if (!chatInput.trim()) return
    const userMsg = { role: 'user', text: chatInput }
    const aiMsg   = { role: 'ai', text: aiReplies[Math.floor(Math.random() * aiReplies.length)] }
    setMessages(prev => [...prev, userMsg])
    setChatInput('')
    setTimeout(() => setMessages(prev => [...prev, aiMsg]), 800)
  }

  const npsData = client.npsHistory.map((v, i) => ({ month: `M${i+1}`, nps: v }))

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart2 },
    { id: 'project',  label: 'Projeto',     icon: CheckCircle },
    { id: 'ai',       label: 'Acomp. IA',   icon: MessageSquare },
    { id: 'health',   label: 'Saúde',       icon: TrendingUp },
    { id: 'docs',     label: 'Documentos',  icon: FileText },
    { id: 'history',  label: 'Histórico',   icon: Clock },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white">{client.name}</h1>
          <p className="text-white/50 text-sm">{client.solution} · {client.sector}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {client.aiAlerts?.map((a, i) => (
            <div key={i} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${
              a.level === 'warning' ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-400' : 'border-gs-cyan/40 bg-gs-cyan/10 text-gs-cyan'
            }`}>
              <AlertTriangle size={12} />{a.msg}
            </div>
          ))}
        </div>
      </div>

      {/* Quick KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ['MRR', `R$ ${client.kpis.mrr.toLocaleString('pt-BR')}`, 'text-gs-cyan'],
          ['Economia gerada', client.kpis.savings, 'text-green-400'],
          ['Automações ativas', client.kpis.automations, 'text-gs-cyan'],
          ['Usuários ativos', client.kpis.users, 'text-white'],
        ].map(([k, v, c]) => (
          <div key={k} className="gs-card p-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{k}</p>
            <p className={`text-2xl font-black ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-gs-dark rounded-xl p-1 w-fit flex-wrap">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              tab === id ? 'bg-gs-cyan text-gs-dark font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Icon size={12} />{label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in">
        {tab === 'overview' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="gs-card p-6 space-y-4">
              <h3 className="font-bold text-white">Informações do Contrato</h3>
              {[
                ['Valor anual', client.contract],
                ['Início', client.contractStart],
                ['Renovação', client.renewal],
                ['SLA', client.sla],
                ['Uptime', `${client.uptime}%`],
                ['Tickets abertos', client.openTickets],
                ['Contato', client.contact],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/50">{k}</span>
                  <span className="text-white font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="gs-card p-6">
              <h3 className="font-bold text-white mb-4">Timeline</h3>
              <div className="space-y-4">
                {client.timeline.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-gs-cyan mt-1.5" />
                      {i < client.timeline.length - 1 && <div className="w-0.5 flex-1 bg-white/10 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs text-white/40">{t.date}</p>
                      <p className="text-sm text-white">{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'project' && (
          <div className="gs-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white">Squad & Entregas</h3>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-white/40" />
                <span className="text-xs text-white/50">{client.squad.length} membros</span>
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              {client.squad.map(s => (
                <div key={s} className="text-xs bg-gs-blue border border-white/20 text-white/70 px-3 py-1.5 rounded-full">{s}</div>
              ))}
            </div>
            <div className="space-y-3">
              {client.deliveries.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">{d.name}</p>
                    <p className="text-xs text-white/40">{d.date}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'ai' && (
          <div className="gs-card p-6 flex flex-col h-96">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-gs-cyan" />
              Acompanhamento com IA
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gs-cyan/20 border border-gs-cyan/40 flex items-center justify-center shrink-0">
                      <MessageSquare size={12} className="text-gs-cyan" />
                    </div>
                  )}
                  <div className={`max-w-[75%] text-sm px-4 py-3 rounded-2xl leading-relaxed ${
                    m.role === 'ai' ? 'bg-gs-mid border border-white/10 text-white/80' : 'bg-gs-cyan text-gs-dark font-medium'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Digite uma instrução para a IA..."
                className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gs-cyan transition-all"
              />
              <button onClick={sendMessage} className="bg-gs-cyan text-gs-dark p-3 rounded-xl hover:scale-105 transition-all">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {tab === 'health' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="gs-card p-6">
              <h3 className="font-bold text-white mb-4">Evolução do NPS</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={npsData}>
                  <defs>
                    <linearGradient id="npsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#00E5FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#080863', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="nps" stroke="#00E5FF" strokeWidth={2.5} fill="url(#npsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="gs-card p-6">
              <h3 className="font-bold text-white mb-4">Health Score</h3>
              <div className="flex flex-col items-center justify-center h-40">
                <div className="text-6xl font-black text-gs-cyan mb-2">{client.healthScore}</div>
                <HealthBar score={client.healthScore} />
                <p className="text-sm text-white/50 mt-4">
                  {client.healthScore >= 90 ? 'Excelente saúde' : client.healthScore >= 75 ? 'Boa saúde' : 'Atenção necessária'}
                </p>
              </div>
              {client.aiAlerts?.length === 0 && (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/30 rounded-xl px-4 py-3">
                  <CheckCircle size={14} />
                  Nenhum alerta de risco detectado pela IA
                </div>
              )}
              {client.aiAlerts?.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-4 py-3 mt-2">
                  <AlertTriangle size={14} />{a.msg}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'docs' && (
          <div className="gs-card p-6">
            <h3 className="font-bold text-white mb-4">Documentos</h3>
            <div className="space-y-3">
              {client.docs.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all group">
                  <div className="w-8 h-8 bg-gs-cyan/20 border border-gs-cyan/30 rounded-lg flex items-center justify-center">
                    <FileText size={14} className="text-gs-cyan" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{d.name}</p>
                    <p className="text-xs text-white/40">{d.size} · {d.date}</p>
                  </div>
                  <span className="text-xs text-gs-cyan opacity-0 group-hover:opacity-100 transition-all">Download</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="gs-card p-6">
            <h3 className="font-bold text-white mb-4">Histórico Comercial</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
              <div className="space-y-6 ml-10">
                {client.timeline.map((t, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 w-3 h-3 rounded-full bg-gs-cyan border-2 border-gs-dark" />
                    <p className="text-xs text-gs-cyan font-semibold mb-1">{t.date}</p>
                    <p className="text-sm text-white/80">{t.event}</p>
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
      <div>
        <h1 className="text-3xl font-black text-white">Clientes<span className="text-gs-cyan">_</span></h1>
        <p className="text-white/50 text-sm mt-1">{clients.length} clientes ativos · Portfólio Enterprise</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {clients.map(client => (
          <div
            key={client.id}
            onClick={() => setSelected(client)}
            className="gs-card gs-card-hover p-6 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gs-blue flex items-center justify-center text-sm font-black text-gs-cyan border border-gs-cyan/30">
                {client.logo}
              </div>
              <div>
                <p className="font-bold text-white">{client.name}</p>
                <p className="text-xs text-white/50">{client.sector}</p>
              </div>
            </div>
            <p className="text-xs text-white/40 mb-2">{client.solution}</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Health Score</span>
              </div>
              <HealthBar score={client.healthScore} />
            </div>
            <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-3">
              <span className="text-white/60 truncate">{client.contact.split('—')[0]}</span>
              <span className="text-gs-cyan font-semibold">Ver detalhes →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
