import { NavLink } from 'react-router-dom'
import {
  ArrowUpRight,
  BarChart3,
  Camera,
  ChevronRight,
  Home,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cx, daysUntil, formatDate, formatQ, initials } from '../../lib/utils'
import Logo from '../ui/Logo'

const navItems = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/diagnostico', label: 'Diagnóstico IA', icon: Camera, badge: 'IA' },
  { to: '/panel', label: 'Mi panel', icon: LayoutDashboard },
  { to: '/metricas', label: 'Métricas', icon: BarChart3 },
]

export default function AppSidebar() {
  const { subscription, profile } = useApp()
  const days = daysUntil(subscription.renewsAt)
  const elapsed = Math.max(0, Math.min(100, ((30 - days) / 30) * 100))

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col overflow-hidden bg-forest-950 text-cream-100 lg:flex">
      <div className="pointer-events-none absolute -top-28 -right-24 size-64 rounded-full bg-forest-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-24 size-72 rounded-full bg-maize-500/8 blur-3xl" />

      <div className="relative px-6 pt-7 pb-5">
        <NavLink to="/" aria-label="AgroGen Precision, inicio">
          <Logo theme="light" />
        </NavLink>
      </div>

      <nav className="relative flex-1 space-y-1 px-3" aria-label="Navegación del panel">
        <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.2em] text-cream-100/35 uppercase">
          Plataforma
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition-all',
                  isActive
                    ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    : 'text-cream-100/60 hover:bg-white/5 hover:text-cream-50',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cx(
                      'flex size-9 items-center justify-center rounded-xl transition',
                      isActive
                        ? 'bg-forest-500 text-forest-950'
                        : 'bg-white/5 text-cream-100/60 group-hover:text-cream-50',
                    )}
                  >
                    <Icon className="size-4.5" strokeWidth={2.1} />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full bg-maize-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-maize-400">
                      {item.badge}
                    </span>
                  ) : null}
                  {isActive ? <span className="size-1.5 rounded-full bg-forest-400" /> : null}
                </>
              )}
            </NavLink>
          )
        })}

        <div className="px-3 pt-7 pb-2 text-[10px] font-bold tracking-[0.2em] text-cream-100/35 uppercase">
          Cooperativa
        </div>
        <div className="mx-1 rounded-2xl border border-white/8 bg-white/[0.04] p-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-forest-500/15 text-forest-300">
              <Leaf className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-cream-50">
                {profile.cooperative}
              </p>
              <p className="truncate text-[10px] text-cream-100/45">3 parcelas activas</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-cream-100/45">
            <LockKeyhole className="size-3" />
            Datos protegidos · MAGA
          </div>
        </div>
      </nav>

      <div className="relative p-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-forest-700/70 to-forest-900/60 p-4">
          <div className="flex items-center justify-between">
            <span className="chip bg-maize-500/15 text-maize-300">
              <Sparkles className="size-3" /> Plan Precisión
            </span>
            <span className="text-[10px] font-semibold text-cream-100/50">
              {formatQ(subscription.price)}/mes
            </span>
          </div>
          <p className="mt-3 text-[12px] leading-snug text-cream-100/65">
            Renueva en <span className="font-bold text-cream-50">{days} días</span> ·{' '}
            {formatDate(subscription.renewsAt)}
          </p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-forest-300"
              style={{ width: `${elapsed}%` }}
            />
          </div>
          <NavLink
            to="/panel"
            className="mt-3 flex items-center justify-between rounded-xl bg-white/8 px-3 py-2 text-[11px] font-semibold text-cream-50 transition hover:bg-white/12"
          >
            Gestionar suscripción
            <ChevronRight className="size-3.5" />
          </NavLink>
        </div>

        <NavLink
          to="/panel"
          className="group mt-3 flex items-center gap-3 rounded-2xl p-2 transition hover:bg-white/5"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-forest-400 text-[11px] font-bold text-forest-950">
            {initials(profile.name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] font-semibold text-cream-50">
              {profile.name}
            </span>
            <span className="block truncate text-[10px] text-cream-100/45">{profile.role}</span>
          </span>
          <ArrowUpRight className="size-3.5 text-cream-100/30 transition group-hover:text-cream-100" />
        </NavLink>
        <p className="mt-2 text-center text-[9px] tracking-wide text-cream-100/25">
          AgroGen Precision · Demo funcional 2026
        </p>
      </div>
    </aside>
  )
}
