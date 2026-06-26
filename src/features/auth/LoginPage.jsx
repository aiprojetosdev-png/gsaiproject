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
    <div className="min-h-screen bg-gs-blue flex items-center justify-center relative overflow-hidden">
      {/* Animated geometric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 border border-white/5 rounded-full animate-float" />
        <div className="absolute top-[-40px] left-[-40px] w-80 h-80 border border-white/5 rounded-full animate-float" style={{animationDelay:'1s'}} />
        <div className="absolute bottom-[-60px] right-[-60px] w-[500px] h-[500px] border border-white/5 rounded-full animate-float2" />
        <div className="absolute top-1/4 right-10 w-48 h-48 border border-white/5 rotate-45 animate-float2" style={{animationDelay:'2s'}} />
        <div className="absolute bottom-1/4 left-10 w-32 h-32 border border-white/5 rotate-12 animate-float" style={{animationDelay:'3s'}} />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1"/>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1"/>
          <line x1="50%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1"/>
          <line x1="0" y1="50%" x2="100%" y2="0" stroke="white" strokeWidth="1"/>
        </svg>
        {/* Floating triangles */}
        <svg className="absolute top-20 right-20 w-24 h-24 opacity-10 animate-float" viewBox="0 0 100 100">
          <polygon points="50,5 95,90 5,90" fill="none" stroke="white" strokeWidth="1.5"/>
        </svg>
        <svg className="absolute bottom-32 left-20 w-16 h-16 opacity-10 animate-float2" viewBox="0 0 100 100">
          <polygon points="50,5 95,90 5,90" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-6">
        <div className="bg-gs-dark border border-white/15 rounded-2xl p-10 shadow-cyan-lg">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <h1 className="text-xl font-bold text-white text-center mb-1">Bem-vindo de volta</h1>
          <p className="text-sm text-white/50 text-center mb-8">Acesse sua plataforma de gestão</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gs-cyan focus:bg-white/10 transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gs-cyan focus:bg-white/10 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input type="checkbox" className="accent-gs-cyan" />
                Lembrar acesso
              </label>
              <button type="button" className="text-gs-cyan hover:underline">Esqueci a senha</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gs-cyan text-gs-dark font-bold py-3 rounded-xl text-sm hover:scale-[1.02] active:scale-95 transition-all duration-150 disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Autenticando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-8">
            Globalsys AI™ — Inteligência que transforma negócios
          </p>
        </div>

        <p className="text-center text-xs text-white/20 mt-4">
          16 anos de tecnologia B2B · globalsys.com.br
        </p>
      </div>
    </div>
  )
}
