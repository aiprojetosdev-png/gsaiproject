import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'

const lines = [
  { delay: 0,    text: '> Inicializando Globalsys AI™...' },
  { delay: 400,  text: '> Carregando módulos de prospecção...' },
  { delay: 800,  text: '> Conectando agentes de IA...' },
  { delay: 1100, text: '> Sincronizando base de clientes...' },
  { delay: 1400, text: '> Autenticando credenciais...' },
  { delay: 1700, text: '> Carregando dashboard executivo...' },
  { delay: 2000, text: '✓ Sistema pronto.' },
]

export default function BootScreen({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress]         = useState(0)

  useEffect(() => {
    lines.forEach(({ delay, text }) => {
      setTimeout(() => setVisibleLines(prev => [...prev, text]), delay)
    })
    const prog = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(prog); return 100 } return p + 2 })
    }, 40)
    setTimeout(onDone, 2800)
    return () => clearInterval(prog)
  }, [onDone])

  return (
    <div className="min-h-screen bg-gs-dark flex flex-col items-center justify-center">
      <div className="w-full max-w-lg px-6">
        <div className="flex justify-center mb-8"><Logo size="lg" /></div>

        <div className="bg-black/30 border border-white/10 rounded-xl p-6 font-mono text-sm mb-6 min-h-48">
          {visibleLines.map((line, i) => (
            <div key={i} className="animate-boot-line text-gs-cyan/90 mb-1">{line}</div>
          ))}
          <span className="inline-block w-2 h-4 bg-gs-cyan animate-pulse ml-0.5" />
        </div>

        <div className="mb-2 flex justify-between text-xs text-white/40">
          <span>Carregando sistema</span>
          <span className="text-gs-cyan">{progress}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gs-cyan rounded-full transition-all duration-75 shadow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
