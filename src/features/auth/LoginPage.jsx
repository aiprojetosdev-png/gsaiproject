import { useState } from 'react'
import { Mail, Lock, Loader2, CheckCircle, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react'
import Logo from '../../components/Logo'
import BootScreen from './BootScreen'

const features = [
  { icon: Zap,        text: 'Agentes de IA prospectam 24h por dia' },
  { icon: TrendingUp, text: 'Pipeline e CRM integrados em tempo real' },
  { icon: Users,      text: 'Gestão completa de clientes enterprise' },
  { icon: CheckCircle,text: '16 anos de tecnologia B2B comprovada' },
]

const stats = [
  { value: '312+', label: 'Leads qualificados/mês' },
  { value: '88',   label: 'NPS médio dos clientes' },
  { value: '290%', label: 'ROI médio gerado' },
]

export default function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [booting, setBooting]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setBooting(true) }, 1500)
  }

  if (booting) return <BootScreen onDone={() => onLogin({ name: email.split('@')[0] || 'Gestor', email })} />

  return (
    <div className="min-h-screen flex">

      {/* ── LADO ESQUERDO — Branding ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[55%] relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(160deg, #1A1AE6 0%, #0C0C8A 50%, #080863 100%)' }}
      >
        {/* Blobs decorativos */}
        <div
          className="absolute top-[-120px] left-[-80px] w-[500px] h-[500px] rounded-full opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-25 animate-blob2"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '3s' }}
        />
        <div
          className="absolute top-[45%] right-[15%] w-[280px] h-[280px] rounded-full opacity-10 animate-blob3"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '6s' }}
        />

        {/* Grid sutil de fundo */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>

        {/* Logo */}
        <div className="relative z-10">
          <Logo size="md" />
        </div>

        {/* Centro — tagline + features */}
        <div className="relative z-10 space-y-10">
          <div>
            <h1 className="text-4xl font-black text-white leading-tight mb-4">
              Inteligência que<br />
              <span style={{ color: '#00E5FF' }}>transforma</span> negócios.
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-md">
              Plataforma B2B com IA integrada para prospecção, CRM e gestão de clientes enterprise — tudo em um único lugar.
            </p>
          </div>

          <div className="space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-white/80" />
                </div>
                <span className="text-white/75 text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-2">
            {stats.map(({ value, label }, i) => (
              <div key={label} className={`${i < stats.length - 1 ? 'pr-6 border-r border-white/15' : ''}`}>
                <p className="text-2xl font-black" style={{ color: '#00E5FF' }}>{value}</p>
                <p className="text-xs text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-white/25 text-xs">© 2026 Globalsys · 16 anos de tecnologia B2B</p>
        </div>
      </div>

      {/* ── LADO DIREITO — Login form ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[380px]">

          {/* Mobile: logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="md" dark />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-1.5">Bem-vindo de volta</h2>
            <p className="text-slate-400 text-sm">Entre com suas credenciais para acessar a plataforma.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">E-mail</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-gs-blue focus:ring-3 focus:ring-gs-blue/8 transition-all bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Senha</label>
                <button type="button" className="text-xs text-gs-blue hover:underline font-medium">
                  Esqueci a senha
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-gs-blue focus:ring-3 focus:ring-gs-blue/8 transition-all bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 border-2 border-slate-300 rounded peer-checked:bg-gs-blue peer-checked:border-gs-blue transition-all" />
                </div>
                <span className="text-sm text-slate-500">Lembrar acesso</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gs-blue hover:bg-gs-mid text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-150 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 shadow-blue mt-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" />Autenticando...</>
              ) : (
                <>Entrar na plataforma <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-300">
              Globalsys AI™ · Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
