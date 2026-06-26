import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Download, Zap, TrendingUp, CheckCircle } from 'lucide-react'
import { clients } from '../../data/clients'

function Skeleton({ className = '' }) {
  return <div className={`bg-white/10 rounded-xl animate-pulse ${className}`} />
}

const weeklyData = {
  uptime: [
    { day: 'Seg', v: 99.9 }, { day: 'Ter', v: 100 }, { day: 'Qua', v: 99.7 },
    { day: 'Qui', v: 100 },  { day: 'Sex', v: 99.8 }, { day: 'Sáb', v: 100 }, { day: 'Dom', v: 100 },
  ],
  tickets: [
    { day: 'Seg', v: 3 }, { day: 'Ter', v: 5 }, { day: 'Qua', v: 2 },
    { day: 'Qui', v: 1 }, { day: 'Sex', v: 4 }, { day: 'Sáb', v: 0 }, { day: 'Dom', v: 0 },
  ],
}

const monthlyData = {
  roi: [
    { month: 'Jan', roi: 210 }, { month: 'Fev', roi: 230 }, { month: 'Mar', roi: 245 },
    { month: 'Abr', roi: 260 }, { month: 'Mai', roi: 275 }, { month: 'Jun', roi: 290 },
  ],
  nps: [
    { month: 'Jan', nps: 82 }, { month: 'Fev', nps: 84 }, { month: 'Mar', nps: 85 },
    { month: 'Abr', nps: 86 }, { month: 'Mai', nps: 87 }, { month: 'Jun', nps: 88 },
  ],
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gs-dark border border-white/15 rounded-xl px-4 py-3 text-sm">
      <p className="text-white/60 mb-1">{label}</p>
      <p className="text-gs-cyan font-bold">{payload[0].value}</p>
    </div>
  )
}

export default function ReportsPage() {
  const [client, setClient]   = useState(clients[0].id)
  const [type, setType]       = useState('Semanal')
  const [loading, setLoading] = useState(false)

  const selectedClient = clients.find(c => c.id === client) || clients[0]

  const applyFilter = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  useEffect(() => { applyFilter() }, [client, type])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Relatórios<span className="text-gs-cyan">_</span></h1>
          <p className="text-white/50 text-sm mt-1">Relatórios gerados automaticamente pelos agentes IA</p>
        </div>
        <button className="flex items-center gap-2 border border-white/30 text-white text-sm px-4 py-2.5 rounded-xl hover:bg-white/10 transition-all">
          <Download size={15} />
          Exportar PDF
        </button>
      </div>

      {/* Filters */}
      <div className="gs-card p-5 flex items-center gap-5 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40 uppercase tracking-wider">Cliente</label>
          <select
            value={client}
            onChange={e => setClient(e.target.value)}
            className="bg-gs-blue border border-white/20 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-gs-cyan"
          >
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/40 uppercase tracking-wider">Tipo</label>
          <div className="flex gap-1 bg-gs-dark rounded-xl p-1">
            {['Semanal', 'Mensal'].map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  type === t ? 'bg-gs-cyan text-gs-dark font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto text-xs text-gs-cyan bg-gs-cyan/10 border border-gs-cyan/30 px-3 py-2 rounded-xl">
          <Zap size={12} />
          Gerado por Globalsys AI™
        </div>
      </div>

      {loading ? (
        /* Skeleton */
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
          <Skeleton className="h-32" />
        </div>
      ) : type === 'Semanal' ? (
        <div className="space-y-6 animate-fade-in">
          {/* Summary */}
          <div className="gs-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-white">Resumo Executivo</h3>
              <span className="text-[10px] text-gs-cyan bg-gs-cyan/10 border border-gs-cyan/20 px-2 py-0.5 rounded-full">Semanal</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Na semana de 23/06 a 29/06/2026, <strong className="text-white">{selectedClient.name}</strong> manteve
              operação estável com uptime médio de <strong className="text-gs-cyan">99.9%</strong> e
              SLA dentro do contratado (<strong className="text-gs-cyan">{selectedClient.sla}</strong>).
              Foram abertos <strong className="text-white">15 chamados</strong>, todos resolvidos em até 4h.
              O Agente IA identificou <strong className="text-gs-cyan">2 oportunidades</strong> de otimização no ambiente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="gs-card p-6">
              <h3 className="text-sm font-semibold text-white/70 mb-4">Uptime Diário (%)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData.uptime} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[99, 100.1]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="v" fill="#00E5FF" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="gs-card p-6">
              <h3 className="text-sm font-semibold text-white/70 mb-4">Tickets por Dia</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData.tickets} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="v" fill="#a78bfa" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="gs-card p-5 border-l-4 border-gs-cyan">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><CheckCircle size={16} className="text-gs-cyan" />SLA da Semana</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                ['Tempo médio de resposta', '1h 23min', 'text-gs-cyan'],
                ['Chamados resolvidos', '15/15', 'text-green-400'],
                ['Dentro do SLA', '100%', 'text-green-400'],
              ].map(([k, v, c]) => (
                <div key={k}>
                  <p className="text-white/40 text-xs">{k}</p>
                  <p className={`font-bold text-lg mt-0.5 ${c}`}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-3 gap-4">
            {[
              ['ROI Estimado', '290%', <TrendingUp size={18} className="text-gs-cyan" />],
              ['NPS do Mês', '88', <span className="text-gs-cyan font-black">★</span>],
              ['Uptime Mensal', `${selectedClient.uptime}%`, <CheckCircle size={18} className="text-green-400" />],
            ].map(([k, v, icon]) => (
              <div key={k} className="gs-card p-5">
                <div className="flex items-center gap-2 mb-2">{icon}<p className="text-xs text-white/40 uppercase tracking-wider">{k}</p></div>
                <p className="text-3xl font-black text-gs-cyan">{v}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="gs-card p-6">
              <h3 className="text-sm font-semibold text-white/70 mb-4">ROI Acumulado (%)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={monthlyData.roi}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line dataKey="roi" stroke="#00E5FF" strokeWidth={2.5} dot={{ fill: '#00E5FF', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="gs-card p-6">
              <h3 className="text-sm font-semibold text-white/70 mb-4">Evolução NPS</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={monthlyData.nps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[78, 92]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line dataKey="nps" stroke="#34d399" strokeWidth={2.5} dot={{ fill: '#34d399', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="gs-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Zap size={16} className="text-gs-cyan" />
              Recomendações da IA para próximo mês
            </h3>
            <div className="space-y-3">
              {[
                'Aumentar frequência de checkpoints com o squad técnico — 2x por semana.',
                'Propor expansão do módulo de Analytics Avançado — potencial de upsell de R$ 8.000/mês.',
                'Agendar QBR (Quarterly Business Review) para apresentar resultados do semestre.',
                'Revisar SLA de tickets críticos — tempo médio 12% acima do target em dias de pico.',
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="text-gs-cyan font-bold shrink-0">{i + 1}.</span>
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
