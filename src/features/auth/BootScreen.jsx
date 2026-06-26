import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'

const lines = [
  { delay: 0,    text: '→ Inicializando Globalsys AI™...' },
  { delay: 400,  text: '→ Carregando módulos de prospecção...' },
  { delay: 750,  text: '→ Conectando agentes de IA...' },
  { delay: 1050, text: '→ Sincronizando base de clientes...' },
  { delay: 1350, text: '→ Autenticando sessão...' },
  { delay: 1650, text: '✓ Sistema pronto. Bem-vindo!' },
]

export default function BootScreen({ onDone }) {
  const [visible, setVisible]   = useState([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    lines.forEach(({ delay, text }) => {
      setTimeout(() => setVisible(p => [...p, text]), delay)
    })
    const prog = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(prog); return 100 } return p + 2 })
    }, 36)
    setTimeout(onDone, 2400)
    return () => clearInterval(prog)
  }, [onDone])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1A1AE6 0%, #080863 100%)' }}>
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center mb-8"><Logo /></div>

        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 font-mono text-sm mb-6 min-h-40">
          {visible.map((line, i) => (
            <div key={i} className="animate-boot-line text-white/80 mb-1.5 leading-relaxed">{line}</div>
          ))}
          <span className="inline-block w-1.5 h-4 bg-white/60 animate-pulse ml-0.5" />
        </div>

        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Carregando...</span>
          <span className="text-white/70 font-medium">{progress}%</span>
        </div>
        <div className="h-1 bg-white/15 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
