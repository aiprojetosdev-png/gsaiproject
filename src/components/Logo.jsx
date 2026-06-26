export default function Logo({ size = 'md' }) {
  const sizes = { sm: { icon: 28, text: 'text-base' }, md: { icon: 36, text: 'text-xl' }, lg: { icon: 48, text: 'text-2xl' } }
  const s = sizes[size] || sizes.md
  return (
    <div className="flex items-center gap-2.5">
      <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#00E5FF" fillOpacity="0.15" />
        <circle cx="24" cy="24" r="22" stroke="#00E5FF" strokeWidth="1.5" />
        <polygon points="24,10 38,32 10,32" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="24,18 32,32 16,32" fill="#00E5FF" fillOpacity="0.7" />
        <circle cx="24" cy="24" r="3" fill="#ffffff" />
      </svg>
      <span className={`font-black tracking-tight text-white ${s.text}`}>
        global<span className="text-gs-cyan">sys</span>
      </span>
    </div>
  )
}
