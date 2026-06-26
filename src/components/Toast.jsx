import { useEffect, useState } from 'react'
import { X, Zap } from 'lucide-react'
import { toastMessages } from '../data/agents'

let _addToast = null
export const addToast = (msg) => _addToast && _addToast(msg)

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    _addToast = (msg) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, msg }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000)
    }
    const interval = setInterval(() => {
      addToast(toastMessages[Math.floor(Math.random() * toastMessages.length)])
    }, 30000)
    const first = setTimeout(() => addToast(toastMessages[0]), 6000)
    return () => { clearInterval(interval); clearTimeout(first); _addToast = null }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div key={t.id} className="animate-slide-in flex items-start gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-card-lg">
          <div className="w-6 h-6 rounded-lg bg-gs-blue/10 flex items-center justify-center shrink-0 mt-0.5">
            <Zap size={12} className="text-gs-blue" />
          </div>
          <span className="text-sm text-slate-700 leading-snug flex-1">{t.msg}</span>
          <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="text-slate-300 hover:text-slate-500 shrink-0 mt-0.5">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
