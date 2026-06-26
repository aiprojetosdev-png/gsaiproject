import { useState } from 'react'
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X, Clock, Bot, TrendingUp, ChevronRight } from 'lucide-react'
import { initialPipeline, columnOrder } from '../../data/pipeline'

/* Cor por etapa */
const stageConfig = {
  prospeccao: { label: 'Prospecção',      color: '#6366f1', bg: 'bg-indigo-50',  border: 'border-indigo-200', text: 'text-indigo-700',  dot: 'bg-indigo-400',  ring: 'ring-indigo-200',  header: 'bg-indigo-50 border-indigo-100'  },
  contato:    { label: 'Primeiro Contato', color: '#8b5cf6', bg: 'bg-purple-50',  border: 'border-purple-200', text: 'text-purple-700',  dot: 'bg-purple-400',  ring: 'ring-purple-200',  header: 'bg-purple-50 border-purple-100'  },
  proposta:   { label: 'Proposta Enviada', color: '#0ea5e9', bg: 'bg-sky-50',     border: 'border-sky-200',    text: 'text-sky-700',     dot: 'bg-sky-400',     ring: 'ring-sky-200',     header: 'bg-sky-50 border-sky-100'        },
  negociacao: { label: 'Negociação',       color: '#f59e0b', bg: 'bg-amber-50',   border: 'border-amber-200',  text: 'text-amber-700',   dot: 'bg-amber-400',   ring: 'ring-amber-200',   header: 'bg-amber-50 border-amber-100'    },
  fechamento: { label: 'Fechamento',       color: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-200',text: 'text-emerald-700', dot: 'bg-emerald-400', ring: 'ring-emerald-200', header: 'bg-emerald-50 border-emerald-100'},
  cliente:    { label: 'Cliente',          color: '#1A1AE6', bg: 'bg-blue-50',    border: 'border-blue-200',   text: 'text-blue-700',    dot: 'bg-blue-500',    ring: 'ring-blue-200',    header: 'bg-blue-50 border-blue-100'      },
}

const ownerConfig = {
  AL: { bg: 'bg-blue-100 text-blue-700' },
  MR: { bg: 'bg-purple-100 text-purple-700' },
  TS: { bg: 'bg-emerald-100 text-emerald-700' },
}

/* ─── Card kanban ─── */
function KanbanCard({ card, colId, onClick, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.35 : 1 }
  const cfg = stageConfig[colId]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(card, colId)}
      className="bg-white border border-slate-100 rounded-2xl shadow-card cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-card-md transition-all duration-150 overflow-hidden group"
    >
      {/* Barra colorida no topo do card */}
      <div className="h-1 w-full" style={{ background: cfg.color }} />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm leading-tight truncate">{card.company}</p>
            <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
              {card.sector}
            </span>
          </div>
          <div className={`text-[10px] font-black px-1.5 py-1 rounded-lg ml-2 shrink-0 ${ownerConfig[card.owner]?.bg || 'bg-slate-100 text-slate-600'}`}>
            {card.owner}
          </div>
        </div>

        <p className="text-base font-black mb-3" style={{ color: cfg.color }}>
          R$ {card.value.toLocaleString('pt-BR')}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={11} />
            <span>{card.days}d na etapa</span>
          </div>
          <ChevronRight size={13} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
        </div>
      </div>
    </div>
  )
}

/* ─── Coluna ─── */
function Column({ col, colId, activeId, onCardClick }) {
  const cfg  = stageConfig[colId]
  const total = col.cards.reduce((s, c) => s + c.value, 0)

  return (
    <div className="flex flex-col min-w-[220px] max-w-[220px]">
      {/* Header da coluna */}
      <div className={`rounded-2xl border p-3.5 mb-3 ${cfg.header}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cfg.color }} />
          <span className="font-bold text-slate-800 text-sm flex-1 truncate">{cfg.label}</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-100 text-slate-600 shadow-card">
            {col.cards.length}
          </span>
        </div>
        <p className="text-sm font-black" style={{ color: cfg.color }}>
          R$ {(total / 1000).toFixed(0)}k
        </p>
      </div>

      <SortableContext items={col.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5 flex-1 min-h-12">
          {col.cards.map(card => (
            <KanbanCard
              key={card.id}
              card={card}
              colId={colId}
              onClick={onCardClick}
              isDragging={card.id === activeId}
            />
          ))}
          {col.cards.length === 0 && (
            <div className="border-2 border-dashed border-slate-200 rounded-2xl h-24 flex items-center justify-center">
              <p className="text-xs text-slate-300 font-medium">Arraste aqui</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

/* ─── Modal do card ─── */
function CardModal({ card, colId, onClose }) {
  const [showAI, setShowAI] = useState(false)
  if (!card || !colId) return null
  const cfg = stageConfig[colId]
  const aiSummary = `Com base em ${card.days} dias de negociação com ${card.company}:\n\n1. Agendar call de revisão com o decisor financeiro.\n2. Preparar case de sucesso do setor ${card.sector} com ROI documentado.\n3. Considerar desconto de 5% para fechar até fim do mês.\n\nProbabilidade de fechamento: 73%.`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-[520px] max-h-[85vh] overflow-y-auto shadow-card-lg animate-fade-in">
        {/* Top bar colorida */}
        <div className="h-1.5 rounded-t-2xl" style={{ background: cfg.color }} />

        <div className="p-7">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-xl text-slate-400">
            <X size={16} />
          </button>

          <div className="flex items-start gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border ${cfg.border} ${cfg.bg} ${cfg.text}`}>
              {card.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{card.company}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-black" style={{ color: cfg.color }}>R$ {card.value.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-slate-400">{card.sector}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[['Setor', card.sector], ['Responsável', card.owner], ['Dias na etapa', `${card.days}d`]].map(([k, v]) => (
              <div key={k} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{k}</p>
                <p className="text-sm font-bold text-slate-800">{v}</p>
              </div>
            ))}
          </div>

          {/* Histórico */}
          <div className="mb-5">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Histórico de ações</p>
            <div className="space-y-2">
              {[
                ['Email inicial enviado', '14 dias atrás'],
                ['Reunião de descoberta realizada', '10 dias atrás'],
                ['Proposta enviada', '5 dias atrás'],
                ['Revisão de contrato agendada', 'Amanhã'],
              ].map(([a, t]) => (
                <div key={a} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.color }} />
                  <span className="text-slate-700 flex-1">{a}</span>
                  <span className="text-xs text-slate-400">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowAI(v => !v)}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm mb-3"
          >
            <Bot size={15} className="text-gs-blue" />
            {showAI ? 'Ocultar' : 'Ver'} recomendações da IA
          </button>

          {showAI && (
            <div className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line mb-4 animate-fade-in ${cfg.text}`}>
              {aiSummary}
            </div>
          )}

          <button className="w-full btn-primary py-3">Passar para Comercial →</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Funil visual no topo ─── */
function FunnelSummary({ columns }) {
  const total = columnOrder.reduce((s, id) => s + columns[id].cards.reduce((ss, c) => ss + c.value, 0), 0)
  return (
    <div className="grid grid-cols-6 gap-3">
      {columnOrder.map(colId => {
        const col  = columns[colId]
        const cfg  = stageConfig[colId]
        const val  = col.cards.reduce((s, c) => s + c.value, 0)
        const pct  = total > 0 ? (val / total) * 100 : 0
        return (
          <div key={colId} className={`card p-4 border-t-4 transition-all hover:-translate-y-0.5`} style={{ borderTopColor: cfg.color }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
              <span className="text-xs font-semibold text-slate-400">{col.cards.length}</span>
            </div>
            <p className="text-xs text-slate-500 mb-1 truncate">{cfg.label}</p>
            <p className="text-sm font-black text-slate-900">R$ {(val / 1000).toFixed(0)}k</p>
            <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cfg.color }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Page ─── */
export default function PipelinePage() {
  const [columns, setColumns]       = useState(initialPipeline)
  const [activeId, setActiveId]     = useState(null)
  const [activeColId, setActiveColId] = useState(null)
  const [selectedCard, setSelected] = useState(null)
  const [selectedColId, setSelectedColId] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const findColumn = id => columnOrder.find(col => columns[col].cards.some(c => c.id === id))

  const handleDragStart = ({ active }) => {
    setActiveId(active.id)
    setActiveColId(findColumn(active.id))
  }

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null); setActiveColId(null)
    if (!over || active.id === over.id) return
    const fromCol = findColumn(active.id)
    const toCol   = findColumn(over.id) || over.id
    if (!fromCol) return
    setColumns(prev => {
      const next = { ...prev }
      const src  = [...prev[fromCol].cards]
      const [card] = src.splice(src.findIndex(c => c.id === active.id), 1)
      if (fromCol === toCol) {
        const oi = src.findIndex(c => c.id === over.id)
        src.splice(oi >= 0 ? oi : src.length, 0, card)
        next[fromCol] = { ...prev[fromCol], cards: src }
      } else {
        const dst = [...prev[toCol].cards]
        const oi  = dst.findIndex(c => c.id === over.id)
        dst.splice(oi >= 0 ? oi : dst.length, 0, card)
        next[fromCol] = { ...prev[fromCol], cards: src }
        next[toCol]   = { ...prev[toCol],   cards: dst }
      }
      return next
    })
  }

  const totalValue  = columnOrder.reduce((s, id) => s + columns[id].cards.reduce((ss, c) => ss + c.value, 0), 0)
  const totalDeals  = columnOrder.reduce((s, id) => s + columns[id].cards.length, 0)
  const activeCard  = activeId ? Object.values(columns).flatMap(c => c.cards).find(c => c.id === activeId) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Pipeline<span className="text-gs-cyan">_</span></h1>
          <p className="text-sm text-slate-500 mt-0.5">Funil comercial completo · arraste os cards entre etapas</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-400">Pipeline total</p>
            <p className="text-xl font-black text-gs-blue">R$ {(totalValue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="text-right pl-4 border-l border-slate-200">
            <p className="text-xs text-slate-400">Deals ativos</p>
            <p className="text-xl font-black text-slate-900">{totalDeals}</p>
          </div>
        </div>
      </div>

      {/* Funil resumo */}
      <FunnelSummary columns={columns} />

      {/* Kanban */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columnOrder.map(colId => (
            <Column
              key={colId}
              col={columns[colId]}
              colId={colId}
              activeId={activeId}
              onCardClick={(card, cId) => { setSelected(card); setSelectedColId(cId) }}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard && activeColId && (
            <div
              className="bg-white rounded-2xl shadow-card-lg w-52 overflow-hidden rotate-2"
              style={{ border: `2px solid ${stageConfig[activeColId]?.color}` }}
            >
              <div className="h-1" style={{ background: stageConfig[activeColId]?.color }} />
              <div className="p-4">
                <p className="font-bold text-slate-900 text-sm">{activeCard.company}</p>
                <p className="text-sm font-black mt-1" style={{ color: stageConfig[activeColId]?.color }}>
                  R$ {activeCard.value.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CardModal
        card={selectedCard}
        colId={selectedColId}
        onClose={() => { setSelected(null); setSelectedColId(null) }}
      />
    </div>
  )
}
