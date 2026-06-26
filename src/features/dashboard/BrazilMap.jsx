const activeStates = ['SP', 'RJ', 'MG', 'RS', 'GO', 'PR']

const states = [
  { id: 'AM', d: 'M 120,80 L 200,60 L 260,90 L 280,130 L 230,160 L 160,150 L 110,120 Z', label: 'AM', cx: 185, cy: 110 },
  { id: 'PA', d: 'M 260,60 L 340,50 L 380,80 L 370,130 L 320,150 L 280,130 L 260,90 Z', label: 'PA', cx: 320, cy: 95 },
  { id: 'MA', d: 'M 370,80 L 420,70 L 440,100 L 420,130 L 380,130 L 370,100 Z', label: 'MA', cx: 405, cy: 100 },
  { id: 'CE', d: 'M 430,70 L 470,65 L 480,90 L 455,110 L 430,100 Z', label: 'CE', cx: 455, cy: 87 },
  { id: 'PE', d: 'M 430,120 L 500,110 L 510,130 L 470,140 L 430,135 Z', label: 'PE', cx: 470, cy: 125 },
  { id: 'BA', d: 'M 380,140 L 460,140 L 480,200 L 440,240 L 390,220 L 370,180 Z', label: 'BA', cx: 420, cy: 190 },
  { id: 'MT', d: 'M 200,160 L 290,150 L 310,220 L 270,250 L 200,240 L 180,200 Z', label: 'MT', cx: 245, cy: 200 },
  { id: 'GO', d: 'M 300,220 L 370,210 L 380,270 L 340,290 L 300,270 Z', label: 'GO', cx: 340, cy: 250 },
  { id: 'MS', d: 'M 240,260 L 310,255 L 320,310 L 270,320 L 235,300 Z', label: 'MS', cx: 278, cy: 290 },
  { id: 'MG', d: 'M 370,260 L 450,250 L 460,320 L 410,340 L 360,320 Z', label: 'MG', cx: 410, cy: 295 },
  { id: 'RJ', d: 'M 450,320 L 490,310 L 495,340 L 460,345 Z', label: 'RJ', cx: 472, cy: 328 },
  { id: 'ES', d: 'M 470,285 L 500,280 L 505,320 L 475,318 Z', label: 'ES', cx: 488, cy: 300 },
  { id: 'SP', d: 'M 330,320 L 420,310 L 430,370 L 380,385 L 330,365 Z', label: 'SP', cx: 378, cy: 348 },
  { id: 'PR', d: 'M 310,370 L 390,362 L 395,400 L 350,415 L 305,400 Z', label: 'PR', cx: 350, cy: 390 },
  { id: 'SC', d: 'M 330,410 L 400,405 L 402,430 L 345,435 Z', label: 'SC', cx: 366, cy: 420 },
  { id: 'RS', d: 'M 310,435 L 390,430 L 395,490 L 335,500 L 300,470 Z', label: 'RS', cx: 348, cy: 465 },
]

export default function BrazilMap() {
  return (
    <div className="relative">
      <svg viewBox="80 40 470 490" className="w-full h-48">
        {states.map(s => {
          const isActive = activeStates.includes(s.id)
          return (
            <g key={s.id}>
              <path
                d={s.d}
                fill={isActive ? 'rgba(0,229,255,0.25)' : 'rgba(8,8,99,0.6)'}
                stroke={isActive ? '#00E5FF' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isActive ? 1.5 : 0.8}
                className="transition-all duration-300 hover:fill-gs-cyan/30 cursor-pointer"
              />
              {isActive && (
                <circle cx={s.cx} cy={s.cy} r="4" fill="#00E5FF" opacity="0.9">
                  <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <text x={s.cx} y={s.cy + (isActive ? 14 : 6)} textAnchor="middle" fontSize="7" fill={isActive ? '#00E5FF' : 'rgba(255,255,255,0.3)'} fontWeight={isActive ? '700' : '400'}>
                {s.id}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex items-center gap-3 flex-wrap">
        {activeStates.map(s => (
          <span key={s} className="text-[10px] text-gs-cyan font-semibold bg-gs-cyan/10 border border-gs-cyan/30 px-2 py-0.5 rounded-full">{s}</span>
        ))}
      </div>
    </div>
  )
}
