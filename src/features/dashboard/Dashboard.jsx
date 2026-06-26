import { useEffect, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, Users, DollarSign, Star, AlertCircle, ArrowUpRight, Zap, UserCheck, Bell } from 'lucide-react'
import { dashboardData, aiAgents } from '../../data/agents'
import BrazilMap from './BrazilMap'

function useCounter(target, duration = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return val
}

function KPICard({ icon: Icon, label, value, delta, color = 'blue' }) {
  const colors = {
    blue: { bg: 'bg-blue-50', icon: 'text-gs-blue', val: 'text-gs-blue' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', val: 'text-cyan-600' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', val: 'text-purple-600' },
    green: { bg: 'bg-emerald-50', icon: 'text-emerald-600', val: 'text-emerald-600' },
  }
  const c = colors[color]
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon size={17} className={c.icon} />
        </div>
        {delta && (
          <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight size={11} />{delta}
          </span>
        )}
      </div>
      <p className={`text-2xl font-black ${c.val} mb-1`}>{value}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  )
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-card-md text-sm">
      <p className="text-slate-400 text-xs mb-0.5">{label}</p>
      <p className="font-bold text-slate-900">{payload[0].value?.toLocaleString('pt-BR')}</p>
    </div>
  )
}

export default function Dashboard() {
  const leads = useCounter(dashboardData.kpis.leadsMonth)
  const mrr   = useCounter(dashboardData.kpis.mrr)
  const nps   = useCounter(dashboardData.kpis.npsAvg)
  const conv  = useCounter(234)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard<span className="text-gs-cyan">_</span></h1>
          <p className="text-sm text-slate-500 mt-0.5">Visão geral atualizada em tempo real</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Todos os agentes ativos
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={Users}      label="Leads este mês"    value={leads}              delta="+18%"  color="blue"   />
        <KPICard icon={TrendingUp} label="Taxa de conversão" value={`${Math.floor(conv/10*10)/10}%`} delta="+2.1%" color="purple" />
        <KPICard icon={DollarSign} label="MRR"               value={`R$ ${mrr.toLocaleString('pt-BR')}`} delta="+5.4%" color="green"  />
        <KPICard icon={Star}       label="NPS médio"         value={nps}                delta="+3"    color="cyan"   />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Leads por Semana</h2>
              <p className="text-xs text-slate-400 mt-0.5">Últimas 4 semanas</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dashboardData.weeklyLeads} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="leads" fill="#1A1AE6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Receita Mensal</h2>
              <p className="text-xs text-slate-400 mt-0.5">Evolução do MRR</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={dashboardData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Line dataKey="revenue" stroke="#1A1AE6" strokeWidth={2.5} dot={{ fill: '#1A1AE6', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#1A1AE6', strokeWidth: 2, stroke: '#EEF0FF' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Bell size={15} className="text-slate-400" />
          Atividade Recente
        </h2>
        <div className="space-y-3">
          {dashboardData.recentActivity.map(item => {
            const icons = {
              lead:   <div className="w-7 h-7 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center"><Users size={12} className="text-gs-blue" /></div>,
              client: <div className="w-7 h-7 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center"><UserCheck size={12} className="text-emerald-600" /></div>,
              deal:   <div className="w-7 h-7 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center"><TrendingUp size={12} className="text-purple-600" /></div>,
              ai:     <div className="w-7 h-7 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center"><Zap size={12} className="text-gs-blue" /></div>,
              alert:  <div className="w-7 h-7 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center"><AlertCircle size={12} className="text-amber-600" /></div>,
            }
            return (
              <div key={item.id} className="flex items-center gap-3 py-1.5">
                {icons[item.icon]}
                <p className="text-sm text-slate-700 flex-1">{item.text}</p>
                <span className="text-xs text-slate-400 shrink-0">há {item.time}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Agents */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Agentes IA Ativos</h2>
          <div className="space-y-4">
            {aiAgents.map(agent => (
              <div key={agent.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{agent.name}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{agent.lastAction}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">há {agent.lastActionTime} min · {agent.actionsToday} ações hoje</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="card p-5 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-gs-blue" />
          </div>
          <p className="text-5xl font-black text-gs-blue mb-1">{dashboardData.pendingApprovals}</p>
          <p className="text-sm font-semibold text-slate-700">Aprovações Pendentes</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Leads aguardando decisão</p>
          <span className="badge-cyan animate-pulse">REQUER ATENÇÃO</span>
        </div>

        {/* Brazil Map */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Cobertura por Estado</h2>
          <BrazilMap />
        </div>
      </div>
    </div>
  )
}
