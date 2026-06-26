export default function Logo({ size = 'md', dark = false, iconOnly = false }) {
  const sizes = {
    sm:   { icon: 24, text: 'text-sm',  gap: 'gap-2' },
    md:   { icon: 32, text: 'text-lg',  gap: 'gap-2.5' },
    lg:   { icon: 42, text: 'text-2xl', gap: 'gap-3' },
    xl:   { icon: 56, text: 'text-3xl', gap: 'gap-4' },
  }
  const s = sizes[size] || sizes.md
  const stroke  = dark ? '#1A1AE6' : '#ffffff'
  const accent  = '#00E5FF'
  const textCol = dark ? 'text-slate-900' : 'text-white'

  return (
    <div className={`flex items-center ${s.gap}`}>
      {/* Ícone globo circular — baseado no logo Globalsys */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Círculo externo */}
        <circle cx="28" cy="28" r="25" stroke={stroke} strokeWidth="2.5" fill="none" />

        {/* Meridiano vertical (elipse vertical) */}
        <ellipse cx="28" cy="28" rx="11" ry="25" stroke={stroke} strokeWidth="1.8" fill="none" />

        {/* Meridiano horizontal (elipse achatada) */}
        <ellipse cx="28" cy="28" rx="25" ry="10" stroke={stroke} strokeWidth="1.8" fill="none" />

        {/* Linha horizontal central */}
        <line x1="3" y1="28" x2="53" y2="28" stroke={stroke} strokeWidth="1.8" />

        {/* Linha vertical central */}
        <line x1="28" y1="3" x2="28" y2="53" stroke={stroke} strokeWidth="1.8" />

        {/* Ponto central acento ciano */}
        <circle cx="28" cy="28" r="4" fill={accent} />
        <circle cx="28" cy="28" r="2" fill={stroke} />
      </svg>

      {!iconOnly && (
        <span className={`font-extrabold tracking-tight leading-none ${s.text} ${textCol}`}>
          global<span style={{ color: accent }}>sys</span>
        </span>
      )}
    </div>
  )
}
