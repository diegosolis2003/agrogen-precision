import { Monitor, Smartphone } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cx } from '../../lib/utils'

export default function ViewModeToggle() {
  const { viewMode, setViewMode, isMobileView } = useApp()

  const options = [
    { key: 'mobile', label: 'Vista móvil', icon: Smartphone },
    { key: 'desktop', label: 'Vista web', icon: Monitor },
  ]

  return (
    <div
      className={cx(
        'fixed z-[110] flex items-center gap-1 rounded-full border border-white/15 bg-forest-950/85 p-1 shadow-lift backdrop-blur-xl',
        isMobileView
          ? 'top-3 left-1/2 -translate-x-1/2'
          : 'right-4 bottom-4 sm:right-5 sm:bottom-5',
      )}
      role="group"
      aria-label="Cambiar entre vista móvil y vista web"
    >
      {options.map((option) => {
        const active = viewMode === option.key
        const Icon = option.icon
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => setViewMode(option.key)}
            aria-pressed={active}
            className={cx(
              'flex h-9 cursor-pointer items-center gap-2 rounded-full px-3 text-[11px] font-semibold transition-all sm:text-xs',
              active
                ? 'bg-cream-50 text-forest-950 shadow-sm'
                : 'text-cream-100/65 hover:bg-white/8 hover:text-cream-50',
            )}
          >
            <Icon className="size-3.5" strokeWidth={2.3} />
            <span className="whitespace-nowrap">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
