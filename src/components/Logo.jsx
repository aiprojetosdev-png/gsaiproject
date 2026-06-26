export default function Logo({ size = 'md', dark = false }) {
  const sizes = {
    sm: { icon: 22, text: 'text-sm' },
    md: { icon: 28, text: 'text-base' },
    lg: { icon: 36, text: 'text-xl' },
  }
  const s = sizes[size] || sizes.md
  const stroke = dark ? '#1A1AE6' : '#ffffff'
  const textColor = dark ? 'text-slate-900' : 'text-white'
  const accentColor = dark ? '#1A1AE6' : '#00E5FF'

  return (
    <div className="flex items-center gap-2">
      {/* Globe icon — baseado no logo Globalsys */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="20" cy="20" r="18" stroke={stroke} strokeWidth="2.2" />
        {/* Horizontal equator */}
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke={stroke} strokeWidth="1.6" />
        {/* Vertical meridian */}
        <ellipse cx="20" cy="20" rx="9" ry="18" stroke={stroke} strokeWidth="1.6" />
        {/* Horizontal middle line */}
        <line x1="2" y1="20" x2="38" y2="20" stroke={stroke} strokeWidth="1.6" />
        {/* Accent dot */}
        <circle cx="20" cy="20" r="2.5" fill={accentColor} />
      </svg>

      <span className={`font-extrabold tracking-tight leading-none ${s.text} ${textColor}`}>
        global<span style={{ color: accentColor }}>sys</span>
      </span>
    </div>
  )
}
