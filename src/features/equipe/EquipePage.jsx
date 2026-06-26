import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { ArrowLeft, Mail, Phone, TrendingUp, Users, Star, CheckCircle } from 'lucide-react'
import { equipe, metas } from '../../data/equipe'

function ProgressBar({ value, max, color = 'bg-gs-blue' }) {
  const pct = Math.min((value / max) * 100, 100)
  const over = value > max
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${over ? 'bg-emerald-500' : color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold w-8 ${over ? 'text-emerald-600' : 'text-slate-600'}`}>{Math.round(pct)}%</span>
    </div>
  )
}

function MemberDetail({ member, onBack }) {
  const pct = member.meta > 0 ? ((member.realizado / member.meta) * 100).toFixed(0) : null
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-500">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900">{member.name}</h1>
          <p className="text-sm text-slate-500">{member.role} · Squad {member.squad}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {member.meta > 0 && (
          <>
            <div className="card p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Realizado</p>
              <p className="text-2xl font-black text-gs-blue">R$ {(member.realizado/1000).toFixed(0)}k</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Meta</p>
              <p className="text-2xl font-black text-slate-700">R$ {(member.meta/1000).toFixed(0)}k</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Win Rate</p>
              <p className="text-2xl font-black text-emerald-600">{member.win_rate}%</p>
            </div>
          </>
        )}
        <div className="card p-4">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">NPS Médio</p>
          <p className="text-2xl font-black text-gs-blue">{member.nps_medio}</p>
        </div>
        {member.leads > 0 && (
          <div className="card p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Leads Abordados</p>
            <p className="text-2xl font-black text-slate-700">{member.leads}</p>
          </div>
        )}
      </div>

      {member.historico.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Evolução de Receita — 6 meses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={member.historico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, fontSize: 12 }} formatter={v => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']} />
              <Line dataKey="v" stroke="#1A1AE6" strokeWidth={2.5} dot={{ fill: '#1A1AE6', r: 4, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
          {pct && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Atingimento da meta</span>
                <span className={Number(pct) >= 100 ? 'text-emerald-600 font-bold' : 'text-gs-blue font-bold'}>{pct}%</span>
              </div>
              <ProgressBar value={member.realizado} max={member.meta} />
            </div>
          )}
        </div>
      )}

      {member.clientes.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-3">Carteira de Clientes</h3>
          <div className="flex flex-wrap gap-2">
            {member.clientes.map(c => (
              <span key={c} className="text-sm bg-blue-50 border border-blue-100 text-gs-blue px-3 py-1.5 rounded-xl font-medium">{c}</span>
            ))}
          </div>
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-semibold text-slate-900 mb-3">Contato</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail size={14} className="text-slate-400" />{member.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={14} className="text-slate-400" />{member.phone}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EquipePage() {
  const [selected, setSelected] = useState(null)
  if (selected) return <MemberDetail member={selected} onBack={() => setSelected(null)} />

  const totalMeta      = metas.comercial.meta
  const totalRealizado = metas.comercial.realizado

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Equipe<span className="text-gs-cyan">_</span></h1>
        <p className="text-sm text-slate-500 mt-0.5">Performance do time comercial e de customer success</p>
      </div>

      {/* Squad metas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={14} className="text-gs-blue" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta Comercial Junho</p>
          </div>
          <p className="text-2xl font-black text-gs-blue mb-1">R$ {(totalRealizado/1000).toFixed(0)}k</p>
          <p className="text-xs text-slate-400 mb-3">de R$ {(totalMeta/1000).toFixed(0)}k</p>
          <ProgressBar value={totalRealizado} max={totalMeta} />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Star size={14} className="text-emerald-600" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">NPS Médio do Time</p>
          </div>
          <p className="text-2xl font-black text-emerald-600 mb-1">{metas.cs.nps_atual}</p>
          <p className="text-xs text-slate-400 mb-3">Meta: {metas.cs.nps_meta} · +{metas.cs.nps_atual - metas.cs.nps_meta}pts acima</p>
          <ProgressBar value={metas.cs.nps_atual} max={100} color="bg-emerald-500" />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users size={14} className="text-gs-blue" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Leads Prospecção</p>
          </div>
          <p className="text-2xl font-black text-gs-blue mb-1">{metas.leads_mes.realizado}</p>
          <p className="text-xs text-slate-400 mb-3">Meta: {metas.leads_mes.meta} · atingida ✓</p>
          <ProgressBar value={metas.leads_mes.realizado} max={metas.leads_mes.meta} />
        </div>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-3 gap-4">
        {equipe.map(member => {
          const pct = member.meta > 0 ? Math.round((member.realizado / member.meta) * 100) : null
          return (
            <div key={member.id} onClick={() => setSelected(member)} className="card card-hover p-5 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border border-slate-100 ${member.avatar}`}>
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{member.name}</p>
                  <p className="text-xs text-slate-400">{member.role}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${member.squad === 'CS' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-gs-blue'}`}>
                  {member.squad}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-slate-50 rounded-xl p-2.5">
                  <p className="text-[10px] text-slate-400 uppercase mb-0.5">NPS médio</p>
                  <p className="text-sm font-bold text-emerald-600">{member.nps_medio}</p>
                </div>
                {pct !== null ? (
                  <div className="bg-slate-50 rounded-xl p-2.5">
                    <p className="text-[10px] text-slate-400 uppercase mb-0.5">Meta</p>
                    <p className={`text-sm font-bold ${pct >= 100 ? 'text-emerald-600' : 'text-gs-blue'}`}>{pct}%</p>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-2.5">
                    <p className="text-[10px] text-slate-400 uppercase mb-0.5">Clientes</p>
                    <p className="text-sm font-bold text-slate-700">{member.clientes.length}</p>
                  </div>
                )}
              </div>

              {pct !== null && (
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Atingimento</span>
                    <span>R$ {(member.realizado/1000).toFixed(0)}k / {(member.meta/1000).toFixed(0)}k</span>
                  </div>
                  <ProgressBar value={member.realizado} max={member.meta} />
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-400 flex justify-between">
                <span>{member.leads > 0 ? `${member.leads} leads abordados` : `${member.clientes.length} clientes na carteira`}</span>
                <span className="text-gs-blue font-medium">Ver perfil →</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
