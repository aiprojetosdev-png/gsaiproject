import { useState, useRef, useEffect } from 'react'
import { Bot, Send, ChevronRight, MessageSquare, Phone, Sparkles, CheckCircle2, Clock, User, Search } from 'lucide-react'
import { resumosData } from '../../data/resumos'

/* ── Avatar ── */
function Avatar({ initials, className = '' }) {
  return (
    <div className={`flex items-center justify-center rounded-xl font-black text-xs shrink-0 ${className}`}>
      {initials}
    </div>
  )
}

/* ── Badge de etapa ── */
function StageBadge({ label, color, bg, text }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${bg} ${text}`}
      style={{ borderColor: color + '33' }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      {label}
    </span>
  )
}

/* ── Bloco WhatsApp ── */
function WhatsappBlock({ messages }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors group"
      >
        <MessageSquare size={13} className="text-emerald-500" />
        Conversa WhatsApp
        <ChevronRight size={12} className={`transition-transform duration-200 ${open ? 'rotate-90' : ''} text-slate-300 group-hover:text-slate-500`} />
      </button>

      {open && (
        <div className="mt-2 bg-[#ECE5DD] rounded-xl p-3 space-y-2 animate-fade-in">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'IA' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs shadow-card ${
                m.from === 'IA'
                  ? 'bg-white text-slate-700 rounded-tl-sm'
                  : 'bg-[#DCF8C6] text-slate-800 rounded-tr-sm'
              }`}>
                {m.from === 'IA' && (
                  <p className="text-[10px] font-bold text-gs-blue mb-0.5">Globalsys IA</p>
                )}
                {m.from !== 'IA' && (
                  <p className="text-[10px] font-bold text-emerald-700 mb-0.5">{m.from}</p>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Bloco Transcrição ── */
function TranscriptBlock({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors group"
      >
        <Phone size={12} className="text-gs-blue" />
        Trecho da ligação
        <ChevronRight size={12} className={`transition-transform duration-200 ${open ? 'rotate-90' : ''} text-slate-300 group-hover:text-slate-500`} />
      </button>

      {open && (
        <div className="mt-2 bg-slate-50 border border-slate-100 rounded-xl p-3 animate-fade-in">
          <p className="text-xs text-slate-500 leading-relaxed font-mono">{text}</p>
        </div>
      )}
    </div>
  )
}

/* ── Thread de mensagens ── */
function MessageThread({ messages: initial, stageId, clientId }) {
  const [msgs, setMsgs] = useState(initial)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setSending(true)
    const now = new Date()
    const time = `${now.getDate()} Jun, ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    setTimeout(() => {
      setMsgs(prev => [...prev, { from: 'Você', avatar: 'VC', text, time }])
      setInput('')
      setSending(false)
    }, 300)
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Complemento da equipe</p>

      {msgs.length > 0 && (
        <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
          {msgs.map((m, i) => (
            <div key={i} className="flex items-start gap-2.5 animate-fade-in">
              <div className="w-7 h-7 rounded-lg bg-gs-blue text-white flex items-center justify-center text-[10px] font-black shrink-0">
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-xs font-bold text-slate-700">{m.from}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Adicione uma observação para a próxima equipe..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gs-blue focus:ring-2 focus:ring-gs-blue/10 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sending}
          className="w-9 h-9 bg-gs-blue rounded-xl flex items-center justify-center text-white hover:bg-gs-mid transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}

/* ── Card de resumo por etapa ── */
function SummaryCard({ stage, index }) {
  return (
    <div className="relative animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      {/* Linha do timeline */}
      <div className="absolute left-[19px] top-12 bottom-0 w-px bg-slate-100" style={{ zIndex: 0 }} />

      <div className="flex gap-4">
        {/* Dot timeline */}
        <div className="relative z-10 shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black shadow-card"
            style={{ background: stage.color + '15', border: `2px solid ${stage.color}33`, color: stage.color }}>
            {index + 1}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 pb-8">
          <div className="card overflow-hidden hover:-translate-y-0.5 transition-all duration-200">
            {/* Barra colorida */}
            <div className="h-1" style={{ background: stage.color }} />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <StageBadge label={stage.label} color={stage.color} bg={stage.bg} text={stage.text} />
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={11} /> {stage.date}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black ${stage.avatarColor}`}>
                    {stage.avatar}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{stage.responsible}</span>
                </div>
              </div>

              {/* Resumo IA */}
              <div className={`${stage.bg} border rounded-xl p-4 mb-4`} style={{ borderColor: stage.color + '33' }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-5 h-5 rounded-lg bg-gs-blue flex items-center justify-center shrink-0">
                    <Bot size={11} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-gs-blue uppercase tracking-widest">Resumo gerado pela IA</span>
                  <Sparkles size={10} className="text-gs-cyan ml-auto" />
                </div>
                <p className={`text-sm leading-relaxed ${stage.text}`}>{stage.aiSummary}</p>
              </div>

              {/* Destaques */}
              <div className="mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Pontos de destaque</p>
                <div className="space-y-2">
                  {stage.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: stage.color }} />
                      <span className="text-sm text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp + Ligação */}
              <WhatsappBlock messages={stage.whatsapp} />
              <TranscriptBlock text={stage.callTranscript} />

              {/* Thread */}
              <MessageThread
                messages={stage.messages}
                stageId={stage.id}
                clientId={stage.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Card de cliente na lista ── */
function ClientCard({ client, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 rounded-xl transition-all duration-150 border ${
        selected
          ? 'bg-gs-blue/5 border-gs-blue/20 shadow-card'
          : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-card'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
          style={{ background: client.color }}>
          {client.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold truncate ${selected ? 'text-gs-blue' : 'text-slate-800'}`}>{client.company}</p>
          <p className="text-[11px] text-slate-400 truncate">{client.sector}</p>
        </div>
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-gs-blue shrink-0" />}
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: client.color }}>
          {client.lastStage}
        </span>
        <span className="text-[10px] text-slate-400">{client.lastUpdate}</span>
      </div>
    </button>
  )
}

/* ── Página principal ── */
export default function ResumosPage() {
  const [selectedId, setSelectedId] = useState(resumosData[0].id)
  const [search, setSearch] = useState('')

  const filtered = resumosData.filter(c =>
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.sector.toLowerCase().includes(search.toLowerCase())
  )

  const client = resumosData.find(c => c.id === selectedId)

  return (
    <div className="flex gap-6 h-[calc(100vh-88px)]">

      {/* ── Painel esquerdo: lista de clientes ── */}
      <div className="w-64 shrink-0 flex flex-col gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Resumos<span className="text-gs-cyan">_</span></h1>
          <p className="text-xs text-slate-500 mt-0.5">Histórico inteligente por cliente</p>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gs-blue focus:ring-2 focus:ring-gs-blue/10 transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map(c => (
            <ClientCard
              key={c.id}
              client={c}
              selected={c.id === selectedId}
              onClick={() => setSelectedId(c.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-8">Nenhum cliente encontrado</p>
          )}
        </div>
      </div>

      {/* ── Painel direito: resumos do cliente ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {client && (
          <>
            {/* Header do cliente */}
            <div className="card p-4 mb-5 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-card"
                  style={{ background: client.color }}>
                  {client.initials}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black text-slate-900">{client.company}</h2>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-500">{client.sector}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <User size={10} /> {client.responsible}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-0.5">Valor total</p>
                  <p className="text-xl font-black text-gs-blue">{client.totalValue}</p>
                </div>
                <div className="text-right pl-4 border-l border-slate-100">
                  <p className="text-xs text-slate-400 mb-0.5">Etapas</p>
                  <p className="text-xl font-black text-slate-900">{client.stages.length}</p>
                </div>
              </div>
            </div>

            {/* Timeline de resumos */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="space-y-0">
                {client.stages.map((stage, i) => (
                  <SummaryCard key={stage.id} stage={stage} index={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
