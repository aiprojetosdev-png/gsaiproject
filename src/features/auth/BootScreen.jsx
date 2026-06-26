import { useEffect, useState } from 'react'

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0=spin, 1=fill, 2=done

  useEffect(() => {
    // Progresso suave
    const prog = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(prog); return 100 }
        return p + 1.4
      })
    }, 28)

    setTimeout(() => setPhase(1), 800)
    setTimeout(onDone, 2200)

    return () => clearInterval(prog)
  }, [onDone])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1A1AE6 0%, #080863 100%)' }}
    >
      {/* Logo animada */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Anel externo girando */}
        <svg
          width="120" height="120" viewBox="0 0 120 120"
          className="absolute"
          style={{ animation: 'spin 2s linear infinite' }}
        >
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeDasharray="80 260"
            strokeLinecap="round"
          />
        </svg>

        {/* Anel interno girando ao contrário */}
        <svg
          width="90" height="90" viewBox="0 0 90 90"
          className="absolute"
          style={{ animation: 'spin 3s linear infinite reverse' }}
        >
          <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle
            cx="45" cy="45" r="38"
            fill="none"
            stroke="rgba(0,229,255,0.4)"
            strokeWidth="1.5"
            strokeDasharray="40 200"
            strokeLinecap="round"
          />
        </svg>

        {/* Globe icon central */}
        <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" opacity={phase === 1 ? 1 : 0.6} style={{ transition: 'opacity 0.6s' }} />
          <ellipse cx="20" cy="20" rx="18" ry="7" stroke="white" strokeWidth="1.5" opacity={phase === 1 ? 0.9 : 0.4} style={{ transition: 'opacity 0.6s' }} />
          <ellipse cx="20" cy="20" rx="9" ry="18" stroke="white" strokeWidth="1.5" opacity={phase === 1 ? 0.9 : 0.4} style={{ transition: 'opacity 0.6s' }} />
          <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeWidth="1.5" opacity={phase === 1 ? 0.9 : 0.4} style={{ transition: 'opacity 0.6s' }} />
          <circle cx="20" cy="20" r="2.5" fill="#00E5FF" />
        </svg>
      </div>

      {/* Progress bar */}
      <div className="w-48">
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
