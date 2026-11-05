import { NavLink } from 'react-router-dom'
import { BarChart3, Camera, Home, LayoutDashboard } from 'lucide-react'
import { cx } from '../../lib/utils'

const items = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/panel', label: 'Panel', icon: LayoutDashboard },
  { to: '/diagnostico', label: 'Diagnóstico', icon: Camera, primary: true },
  { to: '/metricas', label: 'Métricas', icon: BarChart3 },
]

export default function BottomNav() {
  return (
    <nav
      className="relative z-20 grid shrink-0 grid-cols-4 items-end border-t border-forest-900/8 bg-cream-50/95 px-2 pt-1.5 pb-1.5 backdrop-blur-xl"
      aria-label="Navegación de la aplicación"
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cx(
                'group relative flex flex-col items-center gap-1 rounded-xl py-1.5 text-[9.5px] font-semibold transition-colors',
                item.primary ? '-mt-6' : '',
                isActive ? 'text-forest-900' : 'text-forest-900/45 hover:text-forest-900/75',
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.primary ? (
                  <span
                    className={cx(
                      'flex size-12 items-center justify-center rounded-full shadow-glow ring-4 ring-cream-50 transition-all',
                      isActive
                        ? 'bg-forest-700 text-cream-50'
                        : 'bg-forest-900 text-cream-50 group-hover:bg-forest-800',
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2.2} />
                  </span>
                ) : (
                  <span
                    className={cx(
                      'flex h-8 w-12 items-center justify-center rounded-xl transition-all',
                      isActive ? 'bg-forest-100 text-forest-800' : 'text-current',
                    )}
                  >
                    <Icon className="size-5" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                )}
                <span className={item.primary ? 'mt-0.5' : ''}>{item.label}</span>
                {!item.primary && isActive ? (
                  <span className="absolute -top-1.5 size-1 rounded-full bg-forest-600" />
                ) : null}
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
