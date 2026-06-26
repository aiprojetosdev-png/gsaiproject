import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Download, Zap, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react'
import { clients } from '../../data/clients'

function Skeleton({ className = '' }) {
  return <div className={`bg-slate-100 rounded-xl animate-pulse ${className}`} />
}

const weeklyData = {
  uptime:  [{ day: 'Seg', v: 99.9 },{ day: 'Ter', v: 100 },{ day: 'Qua', v: 99.7 },{ day: 'Qui', v: 100 },{ day: 'Sex', v: 99.8 },{ day: 'Sáb', v: 100 },{ day: 'Dom', v: 100 }],
  tickets: [{ day: 'Seg', v: 3 },{ day: 'Ter', v: 5 },{ day: 'Qua', v: 2 },{ day: 'Qui', v: 1 },{ day: 'Sex', v: 4 },{ day: 'Sáb', v: 0 },{ day: 'Dom', v: 0 }],
}
const monthlyData = {
  roi: [{ m: 'Jan', v: 210 },{ m: 'Fev', v: 230 },{ m: 'Mar', v: 245 },{ m: 'Abr', v: 260 },{ m: 'Mai', v: 275 },{ m: 'Jun', v: 290 }],
  nps: [{ m: 'Jan', v: 82 },{ m: 'Fev', v: 84 },{ m: 'Mar', v: 85 },{ m: 'Abr', v: 86 },{ m: 'Mai', v: 87 },{ m: 'Jun', v: 88 }],
}

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-card-md text-sm">
      <p className="text-slate-400 text-xs mb-0.5">{label}</p>
      <p className="font-bold text-slate-900">{payload[0].value}</p>
    </div>
  )
}

export default function ReportsPage() {
  const [client, setClient]   = useState(clients[0].id)
  const [type, setType]       = useState('Semanal')
  const [loading, setLoading] = useState(false)
  const selectedClient        = clients.find(c => c.id === client) || clients[0]

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 900)
  }, [client, type])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Relatórios<span className="text-gs-cyan">_</span></h1>
          <p className="text-sm text-slate-500 mt-0.5">Gerados automaticamente pelos agentes IA</p>
        </div>
        <button className="btn-ghost flex items-center gap-2">
          <Download size={14} /> Exportar PDF
        </button>
      </div>

      {/* Filters */}
      <div className="card p-5 flex items-center gap-5 flex-wrap">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Cliente</label>
          <select
            value={client}
            onChange={e => setClient(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-gs-blue"
          >
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Período</label>
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {['Semanal', 'Mensal'].map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${type === t ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="ml-auto badge-cyan gap-1.5 py-2 px-3">
          <Zap size={12} />Gerado por Globalsys AI™
        </div>
      </div>

      {loading ? (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}</div>
          <div className="grid grid-cols-2 gap-5"><Skeleton className="h-56" /><Skeleton className="h-56" /></div>
          <Skeleton className="h-36" />
        </div>
      ) : type === 'Semanal' ? (
        <div className="space-y-5 animate-fade-in">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-slate-900">Resumo Executivo</h3>
              <span className="badge-cyan">Semanal</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Na semana de 23/06 a 29/06/2026, <strong className="text-slate-900">{selectedClient.name}</strong> manteve
              operação estável com uptime médio de <strong className="text-gs-blue">{selectedClient.uptime}%</strong> e
              SLA dentro do contratado <strong className="text-gs-blue">({selectedClient.sla})</strong>.
              Foram abertos <strong className="text-slate-900">15 chamados</strong>, todos resolvidos em até 4h.
              O Agente IA identificou <strong className="text-gs-blue">2 oportunidades</strong> de otimização.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              ['Tempo médio de resposta', '1h 23min', 'text-gs-blue', TrendingUp],
              ['Chamados resolvidos', '15/15', 'text-emerald-600', CheckCircle],
              ['Dentro do SLA', '100%', 'text-emerald-600', CheckCircle],
            ].map(([k, v, c, Icon]) => (
              <div key={k} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon size={13} className="text-gs-blue" />
                  </div>
                  <p className="text-xs text-slate-400">{k}</p>
                </div>
                <p className={`text-2xl font-black ${c}`}>{v}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Uptime Diário (%)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData.uptime} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[99, 100.1]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="v" fill="#1A1AE6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Tickets por Dia</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData.tickets} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="v" fill="#6366f1" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-fade-in">
          <div className="grid grid-cols-3 gap-4">
            {[
              ['ROI Estimado', '290%', 'text-gs-blue', '+40% vs mês ant.'],
              ['NPS do Mês', '88', 'text-emerald-600', '+1 vs mês ant.'],
              ['Uptime Mensal', `${selectedClient.uptime}%`, 'text-gs-blue', 'SLA: ' + selectedClient.sla],
            ].map(([k, v, c, sub]) => (
              <div key={k} className="card p-5">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{k}</p>
                <p className={`text-3xl font-black ${c} mb-1`}>{v}</p>
                <p className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <ArrowUpRight size={11} />{sub}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">ROI Acumulado (%)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={monthlyData.roi}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="m" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Line dataKey="v" stroke="#1A1AE6" strokeWidth={2.5} dot={{ fill: '#1A1AE6', r: 4, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Evolução NPS</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={monthlyData.nps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="m" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[78, 92]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Line dataKey="v" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Zap size={15} className="text-gs-blue" />Recomendações da IA para o próximo mês
            </h3>
            <div className="space-y-3">
              {[
                'Aumentar frequência de checkpoints com o squad técnico — 2x por semana.',
                'Propor expansão do módulo Analytics Avançado — potencial de upsell de R$ 8.000/mês.',
                'Agendar QBR (Quarterly Business Review) para apresentar resultados do semestre.',
                'Revisar SLA de tickets críticos — tempo médio 12% acima do target em dias de pico.',
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-700">
                  <span className="text-gs-blue font-bold shrink-0 mt-0.5">{i + 1}.</span>{r}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
