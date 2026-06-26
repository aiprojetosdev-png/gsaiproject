import { useState } from 'react'
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X, Clock, Bot } from 'lucide-react'
import { initialPipeline, columnOrder } from '../../data/pipeline'

const ownerBg = { AL: 'bg-blue-100 text-blue-700', MR: 'bg-purple-100 text-purple-700', TS: 'bg-emerald-100 text-emerald-700' }

function KanbanCard({ card, onClick, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(card)}
      className="bg-white border border-slate-100 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-card-md transition-all duration-150 shadow-card"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="font-semibold text-slate-900 text-sm leading-tight">{card.company}</p>
        <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ml-2 shrink-0 ${ownerBg[card.owner] || 'bg-slate-100 text-slate-600'}`}>
          {card.owner}
        </div>
      </div>
      <p className="text-gs-blue font-bold text-sm mb-3">R$ {card.value.toLocaleString('pt-BR')}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{card.sector}</span>
        <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={10} />{card.days}d</span>
      </div>
    </div>
  )
}

function Column({ col, activeId, onCardClick }) {
  const total = col.cards.reduce((s, c) => s + c.value, 0)
  return (
    <div className="flex flex-col min-w-[210px] max-w-[210px]">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-slate-700 text-sm">{col.title}</h3>
          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{col.cards.length}</span>
        </div>
        <p className="text-xs text-gs-blue font-semibold">R$ {total.toLocaleString('pt-BR')}</p>
        <div className="h-0.5 bg-slate-100 mt-2 rounded-full">
          <div className="h-full bg-gs-blue rounded-full" style={{ width: `${Math.min(col.cards.length * 20, 100)}%` }} />
        </div>
      </div>
      <SortableContext items={col.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5 flex-1 min-h-16">
          {col.cards.map(card => (
            <KanbanCard key={card.id} card={card} onClick={onCardClick} isDragging={card.id === activeId} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

function CardModal({ card, onClose }) {
  const [showAI, setShowAI] = useState(false)
  if (!card) return null
  const aiSummary = `Com base na análise de ${card.days} dias de negociação com ${card.company}:\n\n1. Agendar call de revisão com o decisor financeiro.\n2. Preparar case de sucesso do setor ${card.sector}.\n3. Considerar desconto de 5% para fechar no mês.\n\nProbabilidade de fechamento estimada: 73%.`
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white border border-slate-100 rounded-2xl p-7 w-[520px] max-h-[80vh] overflow-y-auto shadow-card-lg animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-xl text-slate-400"><X size={16} /></button>
        <h2 className="text-lg font-bold text-slate-900 mb-0.5">{card.company}</h2>
        <p className="text-gs-blue font-bold mb-5">R$ {card.value.toLocaleString('pt-BR')}</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[['Setor', card.sector], ['Responsável', card.owner], ['Dias na etapa', `${card.days}d`]].map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase mb-1">{k}</p>
              <p className="text-sm font-bold text-slate-800">{v}</p>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2.5">Histórico</p>
          <div className="space-y-2">
            {['Email inicial enviado', 'Reunião de descoberta', 'Proposta enviada', 'Revisão de contrato agendada'].map((a, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-gs-blue shrink-0" />{a}
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
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4 animate-fade-in">
            {aiSummary}
          </div>
        )}

        <button className="w-full btn-primary py-3 text-sm">Passar para Comercial</button>
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const [columns, setColumns]     = useState(initialPipeline)
  const [activeId, setActiveId]   = useState(null)
  const [selectedCard, setSelected] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const findColumn = id => columnOrder.find(col => columns[col].cards.some(c => c.id === id))

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (!over || active.id === over.id) return
    const fromCol = findColumn(active.id)
    const toCol   = findColumn(over.id) || over.id
    if (!fromCol) return
    setColumns(prev => {
      const next = { ...prev }
      const src  = [...prev[fromCol].cards]
      const idx  = src.findIndex(c => c.id === active.id)
      const [card] = src.splice(idx, 1)
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

  const activeCard = activeId ? Object.values(columns).flatMap(c => c.cards).find(c => c.id === activeId) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Pipeline<span className="text-gs-cyan">_</span></h1>
        <p className="text-sm text-slate-500 mt-0.5">Arraste os cards entre as etapas do funil comercial</p>
      </div>

      {/* Column totals */}
      <div className="grid grid-cols-6 gap-3">
        {columnOrder.map(colId => {
          const col = columns[colId]
          const total = col.cards.reduce((s, c) => s + c.value, 0)
          return (
            <div key={colId} className="card p-3 text-center">
              <p className="text-xs text-slate-400 mb-0.5">{col.title}</p>
              <p className="text-sm font-bold text-gs-blue">R$ {(total/1000).toFixed(0)}k</p>
            </div>
          )
        })}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={({ active }) => setActiveId(active.id)} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6">
          {columnOrder.map(colId => (
            <Column key={colId} col={columns[colId]} activeId={activeId} onCardClick={setSelected} />
          ))}
        </div>
        <DragOverlay>
          {activeCard && (
            <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-card-lg rotate-1 w-52">
              <p className="font-semibold text-slate-900 text-sm">{activeCard.company}</p>
              <p className="text-gs-blue font-bold text-sm">R$ {activeCard.value.toLocaleString('pt-BR')}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CardModal card={selectedCard} onClose={() => setSelected(null)} />
    </div>
  )
}
