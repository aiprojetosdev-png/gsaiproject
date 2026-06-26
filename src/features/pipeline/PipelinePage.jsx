import { useState } from 'react'
import {
  DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X, Clock, DollarSign, Bot } from 'lucide-react'
import { initialPipeline, columnOrder } from '../../data/pipeline'

const ownerColors = { AL: '#00E5FF', MR: '#a78bfa', TS: '#34d399' }

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
      className="bg-gs-blue border border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-cyan transition-all duration-150"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="font-bold text-white text-sm leading-tight">{card.company}</p>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-gs-dark shrink-0 ml-2"
          style={{ background: ownerColors[card.owner] || '#00E5FF' }}
        >
          {card.owner}
        </div>
      </div>
      <p className="text-gs-cyan font-bold text-sm mb-3">
        R$ {card.value.toLocaleString('pt-BR')}
      </p>
      <div className="flex items-center justify-between text-[10px] text-white/40">
        <span className="bg-white/10 px-2 py-0.5 rounded-full">{card.sector}</span>
        <span className="flex items-center gap-1"><Clock size={10} />{card.days}d</span>
      </div>
    </div>
  )
}

function Column({ col, activeId, onCardClick }) {
  const total = col.cards.reduce((s, c) => s + c.value, 0)
  return (
    <div className="flex flex-col min-w-[220px] max-w-[220px]">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-white text-sm">{col.title}</h3>
          <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">{col.cards.length}</span>
        </div>
        <p className="text-xs text-gs-cyan font-semibold">R$ {total.toLocaleString('pt-BR')}</p>
        <div className="h-0.5 bg-gs-cyan/40 mt-2 rounded-full" />
      </div>
      <SortableContext items={col.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 flex-1 min-h-16">
          {col.cards.map(card => (
            <KanbanCard
              key={card.id}
              card={card}
              onClick={onCardClick}
              isDragging={card.id === activeId}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

function CardModal({ card, onClose }) {
  const [showAI, setShowAI] = useState(false)
  if (!card) return null
  const aiSummary = `Com base na análise de ${card.days} dias de negociação com ${card.company}, recomendo os seguintes próximos passos:\n\n1. Agendar call de revisão do contrato com o decisor financeiro.\n2. Preparar case de sucesso do setor ${card.sector} com ROI documentado.\n3. Considerar desconto de 5% para fechar até fim do mês.\n\nProbabilidade de fechamento estimada: 73%.`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-gs-dark border border-white/15 rounded-2xl p-8 w-[560px] max-h-[80vh] overflow-y-auto shadow-cyan-lg animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"><X size={18} /></button>
        <h2 className="text-xl font-black text-white mb-1">{card.company}</h2>
        <p className="text-gs-cyan font-bold mb-6">R$ {card.value.toLocaleString('pt-BR')}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[['Setor', card.sector], ['Responsável', card.owner], ['Dias na etapa', card.days + 'd']].map(([k, v]) => (
            <div key={k} className="bg-white/5 rounded-xl p-3">
              <p className="text-[10px] text-white/40 uppercase">{k}</p>
              <p className="text-sm font-bold text-white mt-0.5">{v}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Histórico de Ações</p>
          <div className="space-y-2">
            {['Email inicial enviado', 'Reunião de descoberta realizada', 'Proposta enviada', 'Revisão de contrato agendada'].map((a, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-gs-cyan shrink-0" />
                {a}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAI(v => !v)}
          className="w-full flex items-center justify-center gap-2 bg-gs-cyan/10 border border-gs-cyan/30 text-gs-cyan font-semibold py-3 rounded-xl hover:bg-gs-cyan/20 transition-all text-sm mb-4"
        >
          <Bot size={16} />
          {showAI ? 'Ocultar' : 'Ver'} Recomendações da IA
        </button>

        {showAI && (
          <div className="bg-gs-mid/60 border border-gs-cyan/20 rounded-xl p-4 text-sm text-white/70 leading-relaxed whitespace-pre-line animate-fade-in mb-4">
            {aiSummary}
          </div>
        )}

        <button className="w-full bg-gs-cyan text-gs-dark font-bold py-3 rounded-xl hover:scale-[1.02] transition-all text-sm">
          Passar para Comercial
        </button>
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const [columns, setColumns] = useState(initialPipeline)
  const [activeId, setActiveId] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const findColumn = id => columnOrder.find(col => columns[col].cards.some(c => c.id === id))

  const handleDragStart = ({ active }) => setActiveId(active.id)

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (!over || active.id === over.id) return

    const fromCol = findColumn(active.id)
    const toCol   = findColumn(over.id) || over.id

    if (!fromCol) return

    setColumns(prev => {
      const next = { ...prev }
      const sourceCards = [...prev[fromCol].cards]
      const cardIdx = sourceCards.findIndex(c => c.id === active.id)
      const [card] = sourceCards.splice(cardIdx, 1)

      if (fromCol === toCol) {
        const overIdx = sourceCards.findIndex(c => c.id === over.id)
        sourceCards.splice(overIdx >= 0 ? overIdx : sourceCards.length, 0, card)
        next[fromCol] = { ...prev[fromCol], cards: sourceCards }
      } else {
        const destCards = [...prev[toCol].cards]
        const overIdx  = destCards.findIndex(c => c.id === over.id)
        destCards.splice(overIdx >= 0 ? overIdx : destCards.length, 0, card)
        next[fromCol] = { ...prev[fromCol], cards: sourceCards }
        next[toCol]   = { ...prev[toCol],   cards: destCards }
      }
      return next
    })
  }

  const activeCard = activeId ? Object.values(columns).flatMap(c => c.cards).find(c => c.id === activeId) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white">Pipeline<span className="text-gs-cyan">_</span></h1>
        <p className="text-white/50 text-sm mt-1">Arraste os cards entre as etapas do funil</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-5 overflow-x-auto pb-6">
          {columnOrder.map(colId => (
            <Column
              key={colId}
              col={columns[colId]}
              activeId={activeId}
              onCardClick={setSelectedCard}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard && (
            <div className="bg-gs-blue border border-gs-cyan/50 rounded-xl p-4 shadow-cyan-lg rotate-2 w-52">
              <p className="font-bold text-white text-sm">{activeCard.company}</p>
              <p className="text-gs-cyan font-bold text-sm">R$ {activeCard.value.toLocaleString('pt-BR')}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  )
}
