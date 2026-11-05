import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Map,
  MapPin,
  Package,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  cx,
  daysUntil,
  formatDate,
  formatQ,
  initials,
  orderStatusLabel,
  orderSteps,
  timeAgo,
} from '../lib/utils'
import SeverityBadge from '../components/ui/SeverityBadge'

const parcels = [
  { name: 'Parcela La Esperanza', crop: 'Tomate', area: '0.5 manzana', status: 'Atención', tone: 'clay' },
  { name: 'Finca El Mirador', crop: 'Café', area: '1 manzana', status: 'Monitoreo', tone: 'maize' },
  { name: 'Lote El Roble', crop: 'Maíz', area: '0.75 manzana', status: 'Saludable', tone: 'forest' },
]

const statusTone = {
  preparando: 'bg-maize-200 text-maize-700',
  en_camino: 'bg-forest-100 text-forest-700',
  entregado: 'bg-cream-200 text-forest-800/60',
}

export default function Dashboard() {
  const {
    isMobileView,
    profile,
    diagnostics,
    orders,
    subscription,
    renewSubscription,
    toggleAutoRenew,
    advanceOrder,
  } = useApp()
  const [filter, setFilter] = useState('Todos')

  const HeadingTag = isMobileView ? 'h1' : 'h2'
  const days = daysUntil(subscription.renewsAt)
  const activeOrders = orders.filter((order) => order.status !== 'entregado')
  const crops = useMemo(
    () => ['Todos', ...new Set(diagnostics.map((item) => item.crop))],
    [diagnostics],
  )
  const filtered =
    filter === 'Todos' ? diagnostics : diagnostics.filter((item) => item.crop === filter)

  const [today] = useState(() =>
    new Intl.DateTimeFormat('es-GT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(new Date()),
  )

  const stats = [
    {
      label: 'Diagnósticos',
      value: diagnostics.length,
      hint: `${diagnostics.filter((item) => timeAgo(item.date) === 'Hoy' || timeAgo(item.date) === 'Ayer').length} recientes`,
      icon: ScanLine,
      tone: 'bg-forest-100 text-forest-700',
    },
    {
      label: 'Pedidos en curso',
      value: activeOrders.length,
      hint: activeOrders[0] ? `Llega ${formatDate(activeOrders[0].eta)}` : 'Todo entregado',
      icon: Truck,
      tone: 'bg-maize-200 text-maize-700',
    },
    {
      label: 'Suscripción',
      value: subscription.status === 'activa' ? `${days} días` : 'Inactiva',
      hint: `Renueva ${formatDate(subscription.renewsAt)}`,
      icon: CreditCard,
      tone: 'bg-forest-100 text-forest-700',
    },
    {
      label: 'Parcelas',
      value: parcels.length,
      hint: `${new Set(diagnostics.map((item) => item.crop)).size} cultivos monitoreados`,
      icon: Map,
      tone: 'bg-earth-100 text-earth-700',
    },
  ]

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-7 sm:px-8 sm:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-forest-900/45 capitalize">
            <CalendarDays className="size-3" />
            {today}
          </p>
          <HeadingTag
            className={
              isMobileView
                ? 'mt-1 font-display text-[26px] leading-tight font-extrabold tracking-[-0.04em] text-forest-950'
                : 'mt-1 font-display text-3xl font-extrabold tracking-[-0.04em] text-forest-950'
            }
          >
            Hola, {profile.name.split(' ')[0]}
          </HeadingTag>
          <p className="mt-1 text-[11.5px] text-forest-900/50 sm:text-[13px]">
            Así está el estado de tus cultivos y tus bio-insumos hoy.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/metricas" className="btn btn-outline btn-md hidden sm:inline-flex">
            <ArrowUpRight className="size-4" />
            Métricas
          </Link>
          <Link to="/diagnostico" className="btn btn-primary btn-md">
            <ScanLine className="size-4" />
            Nuevo diagnóstico
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card p-3.5 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <span className={cx('flex size-8 items-center justify-center rounded-xl sm:size-9', stat.tone)}>
                  <Icon className="size-4" strokeWidth={2.2} />
                </span>
                <ArrowUpRight className="size-3.5 text-forest-900/20" />
              </div>
              <p className="mt-3 font-display text-xl leading-none font-extrabold tracking-tight text-forest-950 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-semibold text-forest-900/55 sm:text-[11px]">
                {stat.label}
              </p>
              <p className="mt-0.5 truncate text-[8.5px] text-forest-900/35 sm:text-[9.5px]">
                {stat.hint}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          <div className="card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-[15px] font-bold tracking-tight text-forest-950">
                    Historial de diagnósticos
                  </h3>
                  <span className="chip bg-forest-100 px-2 py-0.5 text-[9px] text-forest-700">
                    {diagnostics.length}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-forest-900/40">
                  Toca un caso para ver de nuevo la receta y el manejo.
                </p>
              </div>
              <div className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto">
                {crops.map((crop) => (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => setFilter(crop)}
                    aria-pressed={filter === crop}
                    className={cx(
                      'shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold transition',
                      filter === crop
                        ? 'bg-forest-900 text-cream-50'
                        : 'bg-forest-900/5 text-forest-900/50 hover:bg-forest-900/10',
                    )}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 divide-y divide-forest-900/6">
              {filtered.map((item) => {
                return (
                  <Link
                    key={item.id}
                    to={`/diagnostico?historial=${item.id}`}
                    className="group flex items-center gap-2.5 rounded-xl px-1.5 py-2.5 transition hover:bg-cream-50 sm:gap-3"
                  >
                    <img
                      src={item.image}
                      alt={`Diagnóstico de ${item.disease}`}
                      className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-forest-900/10 sm:size-12"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="truncate text-[11.5px] font-bold text-forest-950 sm:text-[12.5px]">
                          {item.disease}
                        </p>
                        <SeverityBadge severity={item.severity} size="sm" />
                      </div>
                      <p className="mt-0.5 truncate text-[9.5px] text-forest-900/45">
                        {item.crop} · {item.plot}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[8.5px] text-forest-900/35 sm:hidden">
                        <span>{timeAgo(item.date)}</span>
                        <span className="size-0.5 rounded-full bg-forest-900/25" />
                        <span>{item.confidence} % confianza</span>
                      </div>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-[10px] font-semibold text-forest-900/60">
                        {item.confidence} % conf.
                      </p>
                      <p className="text-[8.5px] text-forest-900/35">{timeAgo(item.date)}</p>
                    </div>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-forest-900/25 transition group-hover:bg-forest-100 group-hover:text-forest-700">
                      <ChevronRight className="size-4" />
                    </span>
                  </Link>
                )
              })}
            </div>

            {filtered.length === 0 ? (
              <p className="py-6 text-center text-[11px] text-forest-900/40">
                No hay diagnósticos para este cultivo todavía.
              </p>
            ) : null}

            <Link
              to="/diagnostico"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-forest-900/15 py-2.5 text-[10.5px] font-bold text-forest-700 transition hover:border-forest-500/40 hover:bg-forest-50"
            >
              <ScanLine className="size-3.5" />
              Hacer un nuevo diagnóstico
            </Link>
          </div>

          <div className="card p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-[15px] font-bold tracking-tight text-forest-950">
                    Pedidos de bio-insumos
                  </h3>
                  <span className="chip bg-maize-200 px-2 py-0.5 text-[9px] text-maize-700">
                    {activeOrders.length} en curso
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-forest-900/40">
                  Sigue el estado de cada lote hasta tu parcela.
                </p>
              </div>
              <Link
                to="/diagnostico"
                className="flex items-center gap-1 text-[9.5px] font-bold text-forest-700"
              >
                Pedir otro
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {orders.map((order) => {
                const currentIndex = orderSteps.findIndex((step) => step.key === order.status)
                return (
                  <div key={order.id} className="rounded-2xl border border-forest-900/8 bg-cream-50/60 p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-forest-700 ring-1 ring-forest-900/8">
                          <Package className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[11.5px] font-bold text-forest-950">{order.item}</p>
                          <p className="truncate text-[9px] text-forest-900/40">
                            {order.id} · {order.crop} · {order.plot}
                          </p>
                        </div>
                      </div>
                      <span className={cx('chip shrink-0 text-[8.5px]', statusTone[order.status])}>
                        <span
                          className={cx(
                            'size-1 rounded-full',
                            order.status === 'en_camino'
                              ? 'animate-pulse bg-forest-500'
                              : order.status === 'preparando'
                                ? 'bg-maize-600'
                                : 'bg-forest-900/25',
                          )}
                        />
                        {orderStatusLabel[order.status]}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center">
                      {orderSteps.map((step, index) => {
                        const done = index <= currentIndex
                        return (
                          <div key={step.key} className="flex flex-1 items-center last:flex-none">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className={cx(
                                  'flex size-5 items-center justify-center rounded-full text-[8px] font-bold transition',
                                  done
                                    ? index === currentIndex
                                      ? 'bg-forest-700 text-cream-50'
                                      : 'bg-forest-100 text-forest-700'
                                    : 'bg-forest-900/8 text-forest-900/30',
                                )}
                              >
                                {index < currentIndex ? (
                                  <Check className="size-2.5" strokeWidth={3} />
                                ) : (
                                  index + 1
                                )}
                              </span>
                              <span
                                className={cx(
                                  'whitespace-nowrap text-[8px] font-semibold',
                                  done ? 'text-forest-800' : 'text-forest-900/30',
                                )}
                              >
                                {step.label}
                              </span>
                            </div>
                            {index < orderSteps.length - 1 ? (
                              <div className="mx-1.5 mb-4 h-0.5 flex-1 overflow-hidden rounded-full bg-forest-900/8">
                                <div
                                  className={cx(
                                    'h-full rounded-full transition-all duration-500',
                                    index < currentIndex ? 'bg-forest-500' : 'bg-transparent',
                                  )}
                                />
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-forest-900/6 pt-2.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[8.5px] text-forest-900/40">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {order.status === 'entregado'
                            ? `Entregado ${formatDate(order.deliveredAt || order.eta)}`
                            : `Llega ${formatDate(order.eta)}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="size-3" />
                          {order.tracking}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-forest-950">
                          {formatQ(order.price)}
                        </span>
                        {order.status !== 'entregado' ? (
                          <button
                            type="button"
                            onClick={() => advanceOrder(order.id)}
                            className="btn btn-soft h-7 px-2.5 text-[9px]"
                          >
                            <RefreshCw className="size-2.5" />
                            {order.status === 'preparando' ? 'Simular envío' : 'Marcar recibido'}
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-[8.5px] font-semibold text-forest-600">
                            <CheckCircle2 className="size-3" />
                            Completado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-2 text-center text-[8px] text-forest-900/30">
              Los estados son simulados. Usa “Simular envío” para ver el seguimiento en acción.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-forest-950 p-5 text-cream-50 shadow-lift">
            <div className="pointer-events-none absolute -top-20 -right-14 size-48 rounded-full bg-forest-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 size-48 rounded-full bg-maize-500/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-2">
                <span className="chip border border-forest-400/25 bg-forest-500/15 text-forest-200">
                  <Sparkles className="size-2.5" />
                  Plan Precisión
                </span>
                <span
                  className={cx(
                    'chip text-[8.5px]',
                    subscription.status === 'activa'
                      ? 'bg-forest-500/20 text-forest-200'
                      : 'bg-white/10 text-cream-100/60',
                  )}
                >
                  <span className="size-1 rounded-full bg-forest-300" />
                  {subscription.status === 'activa' ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold tracking-tight">
                {formatQ(subscription.price)}
                <span className="text-[11px] font-medium text-cream-100/40"> / mes</span>
              </p>
              <p className="mt-1 text-[10px] text-cream-100/45">
                Renueva en <span className="font-bold text-cream-50">{days} días</span> ·{' '}
                {formatDate(subscription.renewsAt)}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-forest-300"
                  style={{ width: `${Math.max(4, Math.min(100, ((30 - days) / 30) * 100))}%` }}
                />
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-1.5">
                {['Diagnósticos ilimitados', '1 bio-insumo/mes', 'Envío incluido', 'Soporte agrónomo'].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-[8.5px] leading-snug text-cream-100/55"
                    >
                      <Check className="mt-0.5 size-2.5 shrink-0 text-forest-300" strokeWidth={3} />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <button type="button" onClick={renewSubscription} className="btn btn-amber btn-md mt-4 w-full">
                <RefreshCw className="size-3.5" />
                Renovar ahora · {formatQ(subscription.price)}
              </button>
              <div className="mt-2.5 flex items-center justify-between text-[8.5px] text-cream-100/35">
                <span className="flex items-center gap-1">
                  <CreditCard className="size-2.5" />
                  Visa •••• 4242
                </span>
                <button
                  type="button"
                  onClick={toggleAutoRenew}
                  className="font-semibold underline decoration-white/20 underline-offset-2 transition hover:text-cream-100"
                >
                  {subscription.autoRenew ? 'Desactivar renovación' : 'Reactivar renovación'}
                </button>
              </div>
            </div>
          </div>

          <div className="card p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[13.5px] font-bold text-forest-950">Tus parcelas</h3>
              <span className="chip bg-forest-100 text-[8.5px] text-forest-700">{parcels.length}</span>
            </div>
            <div className="mt-3 space-y-1">
              {parcels.map((parcel) => (
                <div
                  key={parcel.name}
                  className="flex items-center gap-2.5 rounded-xl px-1 py-2 transition hover:bg-cream-50"
                >
                  <span
                    className={cx(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      parcel.tone === 'clay'
                        ? 'bg-clay-100 text-clay-600'
                        : parcel.tone === 'maize'
                          ? 'bg-maize-200 text-maize-700'
                          : 'bg-forest-100 text-forest-700',
                    )}
                  >
                    <MapPin className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10.5px] font-bold text-forest-950">{parcel.name}</p>
                    <p className="text-[8.5px] text-forest-900/40">
                      {parcel.crop} · {parcel.area}
                    </p>
                  </div>
                  <span
                    className={cx(
                      'chip shrink-0 px-1.5 py-0.5 text-[7.5px]',
                      parcel.tone === 'clay'
                        ? 'bg-clay-100 text-clay-600'
                        : parcel.tone === 'maize'
                          ? 'bg-maize-200 text-maize-700'
                          : 'bg-forest-100 text-forest-700',
                    )}
                  >
                    {parcel.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-cream-50 p-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-forest-900 text-[8px] font-bold text-cream-50">
                {initials(profile.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9.5px] font-semibold text-forest-950">{profile.cooperative}</p>
                <p className="truncate text-[8px] text-forest-900/35">{profile.location}</p>
              </div>
              <BadgeCheck className="size-3.5 text-forest-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-forest-900/8 bg-cream-50/70 p-3.5">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-forest-500" />
              <div>
                <p className="text-[9.5px] font-bold text-forest-950">Tus datos están seguros</p>
                <p className="mt-0.5 text-[8.5px] leading-relaxed text-forest-900/40">
                  El historial se guarda solo en este dispositivo. Puedes borrarlo cerrando la demo
                  o limpiando los datos del navegador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
