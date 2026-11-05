import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cx } from '../../lib/utils'

const toneMap = {
  success: {
    icon: CheckCircle2,
    ring: 'bg-forest-100 text-forest-700',
  },
  info: {
    icon: Info,
    ring: 'bg-maize-200 text-maize-700',
  },
  warning: {
    icon: TriangleAlert,
    ring: 'bg-clay-100 text-clay-600',
  },
}

export default function Toasts() {
  const { toasts, dismissToast, isMobileView } = useApp()

  return (
    <div
      className={cx(
        'pointer-events-none fixed left-1/2 z-[140] flex w-[min(94vw,26rem)] -translate-x-1/2 flex-col gap-2',
        isMobileView ? 'top-[4.6rem]' : 'top-5',
      )}
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const tone = toneMap[toast.tone] || toneMap.success
        const Icon = tone.icon
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex animate-fade-up items-start gap-3 rounded-2xl border border-forest-900/10 bg-white/95 p-3.5 pr-2.5 shadow-lift backdrop-blur-md"
          >
            <span className={cx('icon-tile size-9 rounded-xl', tone.ring)}>
              <Icon className="size-4.5" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[13px] leading-tight font-bold text-forest-950">{toast.title}</p>
              {toast.message ? (
                <p className="mt-1 text-xs leading-snug text-forest-900/65">{toast.message}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-full p-1 text-forest-900/35 transition hover:bg-forest-900/5 hover:text-forest-900"
              aria-label="Cerrar notificación"
            >
              <X className="size-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
