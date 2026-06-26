import { useEffect, useRef, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, Users, DollarSign, Star, Clock, AlertCircle } from 'lucide-react'
import { dashboardData, aiAgents } from '../../data/agents'
import BrazilMap from './BrazilMap'

function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return val
}

function KPICard({ icon: Icon, label, value, suffix = '', prefix = '', color = 'cyan', animated }) {
  const displayVal = animated
    ? (prefix + animated.toLocaleString('pt-BR') + suffix)
    : value
  return (
    <div className="gs-card gs-card-hover p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Icon size={16} className="text-gs-cyan" />
        </div>
      </div>
      <div className="text-3xl font-black text-gs-cyan">{displayVal}</div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gs-dark border border-white/15 rounded-xl px-4 py-3 shadow-cyan text-sm">
      <p className="text-white/60 mb-1">{label}</p>
      <p className="text-gs-cyan font-bold">{payload[0].value?.toLocaleString('pt-BR')}</p>
    </div>
  )
}

export default function Dashboard() {
  const leads   = useCounter(dashboardData.kpis.leadsMonth)
  const conv    = useCounter(234)  // 23.4 * 10
  const mrr     = useCounter(dashboardData.kpis.mrr)
  const nps     = useCounter(dashboardData.kpis.npsAvg)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-1">
          Dashboard<span className="text-gs-cyan">_</span>
        </h1>
        <p className="text-white/50 text-sm">Visão geral em tempo real — atualizado agora</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={Users}      label="Leads este mês"    animated={leads}    suffix=""    />
        <KPICard icon={TrendingUp} label="Taxa de conversão" animated={Math.floor(conv/10*10)/10} suffix="%" />
        <KPICard icon={DollarSign} label="MRR"              animated={mrr}      prefix="R$ " />
        <KPICard icon={Star}       label="NPS médio"        animated={nps}      />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="gs-card p-6">
          <h2 className="text-sm font-semibold text-white/70 mb-4">Leads por Semana</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dashboardData.weeklyLeads} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="leads" fill="#00E5FF" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="gs-card p-6">
          <h2 className="text-sm font-semibold text-white/70 mb-4">Receita Mensal (R$)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dashboardData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line dataKey="revenue" stroke="#00E5FF" strokeWidth={2.5} dot={{ fill: '#00E5FF', r: 4 }} activeDot={{ r: 6, fill: '#00E5FF' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-6">
        {/* AI Agents */}
        <div className="gs-card p-6">
          <h2 className="text-sm font-semibold text-white/70 mb-4">Agentes IA Ativos</h2>
          <div className="space-y-4">
            {aiAgents.map(agent => (
              <div key={agent.id} className="flex items-start gap-3">
                <span className="relative flex h-2 w-2 mt-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{agent.name}</p>
                  <p className="text-xs text-white/50 truncate">{agent.lastAction}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">há {agent.lastActionTime} min</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="gs-card p-6 flex flex-col items-center justify-center text-center">
          <AlertCircle size={32} className="text-gs-cyan mb-3" />
          <div className="text-6xl font-black text-gs-cyan mb-2 relative">
            {dashboardData.pendingApprovals}
            <span className="absolute -top-1 -right-6 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gs-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gs-cyan" />
            </span>
          </div>
          <p className="text-sm font-semibold text-white/80">Aprovações Pendentes</p>
          <p className="text-xs text-white/40 mt-1">Leads aguardando decisão</p>
          <div className="mt-4 px-3 py-1 bg-gs-cyan/20 border border-gs-cyan/40 rounded-full text-xs text-gs-cyan font-semibold animate-pulse">
            URGENTE
          </div>
        </div>

        {/* Brazil Map */}
        <div className="gs-card p-6">
          <h2 className="text-sm font-semibold text-white/70 mb-3">Clientes por Estado</h2>
          <BrazilMap />
        </div>
      </div>
    </div>
  )
}
