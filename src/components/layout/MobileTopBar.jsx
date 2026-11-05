import { Link } from 'react-router-dom'
import { Bell, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { initials } from '../../lib/utils'
import Logo from '../ui/Logo'

export default function MobileTopBar() {
  const { profile, pushToast } = useApp()

  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-forest-900/6 bg-cream-50/95 px-4 backdrop-blur">
      <Link to="/" aria-label="AgroGen Precision, inicio" className="rounded-lg">
        <Logo size="sm" />
      </Link>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() =>
            pushToast({
              tone: 'info',
              title: 'Recordatorio de campo',
              message: 'Tu pedido AG-2481 llega mañana. Revisa el panel para seguir el envío.',
            })
          }
          className="relative flex size-9 items-center justify-center rounded-full text-forest-800 transition hover:bg-forest-900/5"
          aria-label="Notificaciones"
        >
          <Bell className="size-4.5" />
          <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-clay-500 ring-2 ring-cream-50" />
        </button>
        <Link
          to="/panel"
          aria-label="Ir a mi panel"
          className="flex items-center gap-1 rounded-full border border-forest-900/10 bg-white/70 py-0.5 pr-1 pl-0.5 transition hover:bg-white"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-forest-700 text-[10px] font-bold text-cream-50">
            {initials(profile.name)}
          </span>
          <ChevronRight className="size-3.5 text-forest-900/35" />
        </Link>
      </div>
    </div>
  )
}
