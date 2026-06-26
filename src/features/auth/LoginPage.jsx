import { useState } from 'react'
import { Mail, Lock, Loader2 } from 'lucide-react'
import Logo from '../../components/Logo'
import BootScreen from './BootScreen'

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
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A1AE6 0%, #080863 100%)' }}
    >
      {/* Blobs sutis */}
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full opacity-20 animate-blob"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 65%)', filter: 'blur(80px)' }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 animate-blob2"
        style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 65%)', filter: 'blur(80px)', animationDelay: '3s' }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[400px] mx-6">
        <div className="bg-white rounded-2xl shadow-card-lg overflow-hidden">

          {/* Header azul com logo */}
          <div className="bg-gs-dark px-8 pt-8 pb-7 flex flex-col items-center">
            <Logo size="md" />
            <p className="text-white/40 text-xs mt-3">Plataforma de Gestão Inteligente</p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <h1 className="text-lg font-bold text-slate-900 mb-0.5">Bem-vindo de volta</h1>
            <p className="text-sm text-slate-400 mb-6">Acesse sua conta para continuar</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">E-mail</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-gs-blue focus:ring-2 focus:ring-gs-blue/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Senha</label>
                  <button type="button" className="text-xs text-gs-blue hover:underline">Esqueci a senha</button>
                </div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-gs-blue focus:ring-2 focus:ring-gs-blue/10 transition-all"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="accent-gs-blue" />
                <span className="text-sm text-slate-500">Lembrar acesso</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gs-blue text-white font-semibold py-3 rounded-xl text-sm hover:bg-gs-mid active:scale-95 transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><Loader2 size={15} className="animate-spin" />Entrando...</>
                  : 'Entrar na plataforma'
                }
              </button>
            </form>

            <p className="text-center text-xs text-slate-300 mt-6">
              Globalsys AI™ · 16 anos de tecnologia B2B
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
