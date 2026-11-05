import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Bell,
  Camera,
  Home,
  LayoutDashboard,
  Radio,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cx, initials } from '../../lib/utils'
import Logo from '../ui/Logo'

const pageMeta = {
  '/diagnostico': {
    eyebrow: 'Módulo de campo',
    title: 'Diagnóstico IA',
    subtitle: 'Mapeo MAGA · modelo agronómico v2.4',
  },
  '/panel': {
    eyebrow: 'Agricultor',
    title: 'Mi panel',
    subtitle: 'Resumen de parcelas, pedidos y suscripción',
  },
  '/metricas': {
    eyebrow: 'Inversionistas',
    title: 'Métricas del negocio',
    subtitle: 'Unidad económica y tracción · Noviembre 2026',
  },
}

const quickNav = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/diagnostico', icon: Camera, label: 'Diagnóstico' },
  { to: '/panel', icon: LayoutDashboard, label: 'Panel' },
  { to: '/metricas', icon: BarChart3, label: 'Métricas' },
]

export default function AppTopbar() {
  const { pathname } = useLocation()
  const { profile, pushToast } = useApp()
  const meta = pageMeta[pathname] || pageMeta['/panel']

  return (
    <header className="sticky top-0 z-30 border-b border-forest-900/6 bg-cream-100/85 backdrop-blur-xl">
      <div className="flex h-17 items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="lg:hidden" aria-label="AgroGen Precision, inicio">
          <Logo size="sm" />
        </Link>

        <div className="hidden min-w-0 lg:block">
          <p className="text-[10px] font-bold tracking-[0.16em] text-forest-600 uppercase">
            {meta.eyebrow}
          </p>
          <div className="flex items-baseline gap-2.5">
            <h1 className="truncate text-lg font-bold tracking-tight text-forest-950">
              {meta.title}
            </h1>
            <span className="hidden truncate text-[11px] text-forest-900/45 xl:inline">
              {meta.subtitle}
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 lg:hidden">
          {quickNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                aria-label={item.label}
                className={({ isActive }) =>
                  cx(
                    'flex size-9 items-center justify-center rounded-xl transition',
                    isActive
                      ? 'bg-forest-900 text-cream-50'
                      : 'text-forest-900/55 hover:bg-forest-900/5',
                  )
                }
              >
                <Icon className="size-4.5" />
              </NavLink>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="hidden items-center gap-1.5 rounded-full border border-forest-900/10 bg-white/60 px-3 py-1.5 text-[10px] font-semibold text-forest-800 sm:flex">
            <Radio className="size-3 text-forest-500" />
            Sistema en línea
          </span>
          <button
            type="button"
            onClick={() =>
              pushToast({
                tone: 'info',
                title: 'Todo al día',
                message: 'No tienes notificaciones pendientes. Tu pedido AG-2481 llegará mañana.',
              })
            }
            className="relative flex size-9.5 items-center justify-center rounded-full border border-forest-900/10 bg-white/60 text-forest-800 transition hover:bg-white"
            aria-label="Notificaciones"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-clay-500 ring-2 ring-cream-100" />
          </button>
          <NavLink
            to="/panel"
            className="flex items-center gap-2 rounded-full border border-forest-900/10 bg-white/60 py-1 pr-2.5 pl-1 transition hover:bg-white"
          >
            <span className="flex size-7.5 items-center justify-center rounded-full bg-forest-700 text-[10px] font-bold text-cream-50">
              {initials(profile.name)}
            </span>
            <span className="hidden text-[11px] font-semibold text-forest-900 sm:inline">
              {profile.name.split(' ')[0]}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
