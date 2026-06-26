export default function Logo({ size = 'md', dark = false }) {
  const sizes = {
    sm: { icon: 24, text: 'text-sm' },
    md: { icon: 30, text: 'text-lg' },
    lg: { icon: 38, text: 'text-xl' },
  }
  const s = sizes[size] || sizes.md
  const textColor = dark ? 'text-slate-900' : 'text-white'
  const accentColor = dark ? '#1A1AE6' : '#00E5FF'

  return (
    <div className="flex items-center gap-2.5">
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke={accentColor} strokeWidth="1.5" fill={dark ? '#EEF0FF' : 'rgba(255,255,255,0.1)'} />
        <polygon points="20,9 31,28 9,28" fill="none" stroke={accentColor} strokeWidth="1.8" strokeLinejoin="round" />
        <polygon points="20,16 26.5,28 13.5,28" fill={accentColor} fillOpacity="0.8" />
      </svg>
      <span className={`font-extrabold tracking-tight ${s.text} ${textColor}`}>
        global<span style={{ color: accentColor }}>sys</span>
      </span>
    </div>
  )
}
