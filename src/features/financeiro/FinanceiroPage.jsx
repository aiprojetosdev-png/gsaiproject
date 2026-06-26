import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle, Clock } from 'lucide-react'
import { financeiroData } from '../../data/financeiro'

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-card-md text-sm min-w-32">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `R$ ${p.value.toLocaleString('pt-BR')}` : p.value}
        </p>
      ))}
    </div>
  )
}

function MetricCard({ label, value, sub, trend, trendVal, color = 'blue' }) {
  const colors = {
    blue:   { bg: 'bg-blue-50',    icon: 'text-gs-blue',    val: 'text-gs-blue' },
    green:  { bg: 'bg-emerald-50', icon: 'text-emerald-600', val: 'text-emerald-600' },
    red:    { bg: 'bg-red-50',     icon: 'text-red-500',    val: 'text-red-500' },
    purple: { bg: 'bg-purple-50',  icon: 'text-purple-600', val: 'text-purple-600' },
  }
  const c = colors[color]
  return (
    <div className="card p-5">
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">{label}</p>
      <p className={`text-2xl font-black mb-1 ${c.val}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
      {trendVal && (
        <div className={`flex items-center gap-1 text-xs font-medium mt-2 ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trendVal}
        </div>
      )}
    </div>
  )
}

const statusStyle = {
  pago:     'bg-emerald-50 text-emerald-700 border-emerald-100',
  pendente: 'bg-amber-50 text-amber-700 border-amber-100',
  vencido:  'bg-red-50 text-red-700 border-red-100',
}

export default function FinanceiroPage() {
  const [tab, setTab] = useState('mrr')
  const d = financeiroData

  const tabs = [
    { id: 'mrr',      label: 'MRR & Crescimento' },
    { id: 'clientes', label: 'Receita por Cliente' },
    { id: 'projecao', label: 'Projeção' },
    { id: 'invoices', label: 'Faturas' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Financeiro<span className="text-gs-cyan">_</span></h1>
        <p className="text-sm text-slate-500 mt-0.5">Indicadores financeiros e receita recorrente</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="MRR Atual"     value={`R$ ${(d.mrr/1000).toFixed(0)}k`}   sub="Receita mensal recorrente" trend="up"   trendVal="+R$ 1.500 vs mês ant." color="blue"   />
        <MetricCard label="ARR"           value={`R$ ${(d.arr/1000000).toFixed(2)}M`} sub="Receita anual recorrente"  trend="up"   trendVal="+18% YoY"             color="green"  />
        <MetricCard label="Churn Rate"    value={`${d.churnRate}%`}                    sub="Taxa de cancelamento MoM"  trend="down" trendVal="-0.3pp vs mês ant."   color="red"    />
        <MetricCard label="LTV médio"     value={`R$ ${(d.ltv/1000000).toFixed(2)}M`} sub="Lifetime value por cliente" trend="up"  trendVal="+R$ 120k vs Jan/26"   color="purple" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="New MRR"       value={`R$ ${(d.newMRR/1000).toFixed(0)}k`}       sub="De novos clientes este mês"  trend="up"   trendVal="+R$ 14k vs maio"  color="green" />
        <MetricCard label="Expansion MRR" value={`R$ ${(d.expansionMRR/1000).toFixed(1)}k`}  sub="Upsell de clientes atuais"   trend="up"   trendVal="+R$ 5.5k vs maio" color="blue" />
        <MetricCard label="Churned MRR"   value={`R$ ${(d.churnMRR/1000).toFixed(1)}k`}      sub="Receita perdida este mês"    trend="down" trendVal="+R$ 4k vs maio"   color="red" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-card' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'mrr' && (
        <div className="space-y-5 animate-fade-in">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Evolução do MRR — 18 meses</h3>
            <p className="text-xs text-slate-400 mb-4">Jan/2025 → Jun/2026</p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={d.mrrHistory}>
                <defs>
                  <linearGradient id="mrrG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1A1AE6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1A1AE6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="mrr" name="MRR" stroke="#1A1AE6" strokeWidth={2.5} fill="url(#mrrG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Composição do MRR — Último mês</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={d.mrrHistory.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                <Bar dataKey="new"       name="New MRR"       fill="#1A1AE6" radius={[3,3,0,0]} stackId="a" />
                <Bar dataKey="expansion" name="Expansion MRR" fill="#6366f1" radius={[3,3,0,0]} stackId="a" />
                <Bar dataKey="churn"     name="Churn MRR"     fill="#f87171" radius={[3,3,0,0]} stackId="b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'clientes' && (
        <div className="space-y-4 animate-fade-in">
          {d.clienteMRR.map((c, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-xs font-black text-gs-blue border border-blue-100">
                    {c.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.pct}% da receita total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gs-blue">R$ {c.mrr.toLocaleString('pt-BR')}/mês</p>
                  <p className={`text-xs flex items-center gap-0.5 justify-end mt-0.5 font-medium ${c.trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {c.trend > 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                    R$ {Math.abs(c.trend).toLocaleString('pt-BR')} vs mês ant.
                  </p>
                </div>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gs-blue rounded-full" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'projecao' && (
        <div className="space-y-5 animate-fade-in">
          <div className="card p-4 border-l-4 border-gs-blue">
            <p className="text-sm text-slate-700">
              Projeção baseada em taxa de crescimento histórica de <strong className="text-gs-blue">4.8% MoM</strong> e pipeline comercial de
              <strong className="text-gs-blue"> R$ 14,6M</strong>. Cenário pessimista considera churn de 3% e sem novos deals.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Projeção MRR — Jul → Dez 2026</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={d.projecao}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                <Line dataKey="pessimista" name="Pessimista"  stroke="#f87171" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line dataKey="mrr"        name="Base"        stroke="#1A1AE6" strokeWidth={2.5} dot={{ fill: '#1A1AE6', r: 4, strokeWidth: 0 }} />
                <Line dataKey="otimista"   name="Otimista"    stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <div className="card animate-fade-in">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Faturas Junho/2026</h3>
            <span className="badge-cyan">
              <DollarSign size={10} />
              R$ {d.invoices.reduce((s, i) => s + i.value, 0).toLocaleString('pt-BR')} total
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {d.invoices.map(inv => (
              <div key={inv.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${statusStyle[inv.status]}`}>
                  {inv.status === 'pago' ? <CheckCircle size={13} /> : <Clock size={13} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{inv.client}</p>
                  <p className="text-xs text-slate-400">{inv.id} · Vence: {inv.due}</p>
                </div>
                <p className="font-bold text-slate-900 text-sm">R$ {inv.value.toLocaleString('pt-BR')}</p>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusStyle[inv.status]}`}>
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
