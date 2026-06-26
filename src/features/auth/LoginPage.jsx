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
      {/* Soft animated blobs — clean, não futurístico */}
      <div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-25 blur-blob animate-blob"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-blob animate-blob2"
        style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)', animationDelay: '3s' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full opacity-15 blur-blob animate-blob3"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', animationDelay: '6s' }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] mx-6">
        <div className="bg-white rounded-3xl shadow-card-lg p-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Logo size="md" dark />
            <p className="text-xs text-slate-400 mt-3 tracking-wide">Plataforma de Gestão Inteligente</p>
          </div>

          <h1 className="text-xl font-bold text-slate-900 mb-1">Bem-vindo de volta</h1>
          <p className="text-sm text-slate-500 mb-7">Acesse sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Senha</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                <input type="checkbox" className="accent-gs-blue rounded" />
                Lembrar acesso
              </label>
              <button type="button" className="text-gs-blue hover:underline font-medium">
                Esqueci a senha
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gs-blue text-white font-semibold py-3 rounded-xl text-sm hover:bg-gs-mid active:scale-95 transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2 mt-2 shadow-blue"
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Entrando...</>
                : 'Entrar na plataforma'
              }
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Globalsys AI™ · 16 anos de tecnologia B2B
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
