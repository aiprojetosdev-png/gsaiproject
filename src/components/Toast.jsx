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
      const msg = toastMessages[Math.floor(Math.random() * toastMessages.length)]
      addToast(msg)
    }, 30000)

    // First toast after 5s
    const first = setTimeout(() => addToast(toastMessages[0]), 5000)

    return () => { clearInterval(interval); clearTimeout(first); _addToast = null }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map(t => (
        <div key={t.id} className="animate-slide-in flex items-start gap-3 bg-gs-dark border border-gs-cyan/40 rounded-xl px-4 py-3 shadow-cyan">
          <Zap size={16} className="text-gs-cyan mt-0.5 shrink-0" />
          <span className="text-sm text-white/90 leading-snug">{t.msg}</span>
          <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-auto shrink-0 text-white/40 hover:text-white">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
