import { Link } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Download,
  Gauge,
  Leaf,
  LineChart,
  Percent,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { METRICS } from '../data/catalog'
import { useApp } from '../context/AppContext'
import { useCountUp } from '../hooks/useCountUp'
import { cx, formatQ } from '../lib/utils'

function AnimatedValue({ value, format }) {
  const animated = useCountUp(value, { duration: 1400 })
  return <>{format ? format(animated) : animated.toLocaleString('es-GT')}</>
}

const primaryKpis = [
  {
    label: 'MRR',
    value: METRICS.mrr,
    note: `${METRICS.subscribers} suscriptores × Q150`,
    delta: '+8.7 % MoM',
    icon: CircleDollarSign,
    featured: true,
  },
  {
    label: 'ARR',
    value: METRICS.arr,
    note: 'Run-rate anual · 12 × MRR',
    delta: '12 meses',
    icon: TrendingUp,
    featured: false,
  },
  {
    label: 'LTV',
    value: METRICS.ltv,
    note: 'ARPU Q150 · vida útil 14.4 meses',
    delta: '7.2× CAC',
    icon: Wallet,
    featured: false,
  },
  {
    label: 'CAC',
    value: METRICS.cac,
    note: 'Costo de adquisición por agricultor',
    delta: '−12 % vs. Q2',
    icon: Target,
    featured: false,
    down: true,
  },
]

const secondaryKpis = [
  { label: 'LTV / CAC', value: '7.2×', note: 'Salud de unidad económica', pct: 72, icon: Gauge },
  { label: 'Margen bruto', value: '68 %', note: 'Suscripción + bio-insumos', pct: 68, icon: Percent },
  { label: 'Churn mensual', value: '4.2 %', note: 'Retención de agricultores', pct: 42, icon: LineChart },
  { label: 'Payback', value: '3 meses', note: 'Recuperación de CAC', pct: 30, icon: Zap },
]

const traction = [
  { label: 'Suscriptores activos', value: '100', icon: Users },
  { label: 'Parcelas monitoreadas', value: '312', icon: Leaf },
  { label: 'Diagnósticos realizados', value: '1,247', icon: BarChart3 },
  { label: 'NPS', value: '62', icon: Sparkles },
  { label: 'Recompra de bio-insumos', value: '74 %', icon: TrendingUp },
]

const mixColors = ['#1b4332', '#52b788', '#f4c95d']

export default function Metrics() {
  const { isMobileView, pushToast } = useApp()
  const HeadingTag = isMobileView ? 'h1' : 'h2'
  const maxMrr = Math.max(...METRICS.months.map((item) => item.mrr))
  const maxFunnel = METRICS.funnel[0].value

  const handleDownload = () => {
    const content = [
      'AGROGEN PRECISION — One-pager de métricas',
      'Un médico para los cultivos · Guatemala, noviembre 2026',
      '',
      'MÉTRICAS CLAVE',
      `MRR: ${formatQ(METRICS.mrr)}`,
      `ARR: ${formatQ(METRICS.arr)}`,
      `LTV: ${formatQ(METRICS.ltv)}`,
      `CAC: ${formatQ(METRICS.cac)}`,
      `LTV / CAC: ${METRICS.ltvCac}×`,
      `Margen bruto: ${METRICS.grossMargin}%`,
      `Churn mensual: ${METRICS.churn}%`,
      `Payback: ${METRICS.paybackMonths} meses`,
      '',
      'TRACCIÓN',
      `Suscriptores activos: ${METRICS.subscribers}`,
      `Parcelas monitoreadas: ${METRICS.activePlots}`,
      `Diagnósticos realizados: ${METRICS.diagnoses}`,
      `NPS: ${METRICS.nps}`,
      '',
      'EVOLUCIÓN DEL MRR',
      ...METRICS.months.map((item) => `${item.month}: ${formatQ(item.mrr)} · ${item.farmers} agricultores`),
      '',
      'MEZCLA DE INGRESOS',
      ...METRICS.revenueMix.map((item) => `${item.label}: ${item.value}%`),
      '',
      'USO DE FONDOS',
      ...METRICS.useOfFunds.map((item) => `${item.label}: ${item.value}%`),
      '',
      'Documento generado desde la demo funcional de AgroGen Precision.',
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'AgroGen-metricas.txt'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    pushToast({
      tone: 'success',
      title: 'One-pager descargado',
      message: 'Incluye KPIs, tracción, evolución de MRR y uso de fondos.',
    })
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-7 sm:px-8 sm:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">
              <BarChart3 className="size-3.5" />
              Panel interno · Inversionistas
            </span>
            <span className="chip border border-forest-900/8 bg-white/60 text-[9px] text-forest-900/55">
              Datos demo · Nov 2026
            </span>
          </div>
          <HeadingTag
            className={
              isMobileView
                ? 'mt-1.5 font-display text-[26px] leading-tight font-extrabold tracking-[-0.04em] text-forest-950'
                : 'mt-1.5 font-display text-3xl font-extrabold tracking-[-0.04em] text-forest-950'
            }
          >
            Tracción y unidad económica
          </HeadingTag>
          <p className="mt-1 max-w-2xl text-[11.5px] leading-relaxed text-forest-900/50 sm:text-[13px]">
           Cómo crece AgroGen, cuánto vale cada agricultor y en qué se invierte cada quetzal de la
            operación.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="btn btn-outline btn-md">
            <ArrowUpRight className="size-4" />
            Ver landing
          </Link>
          <button type="button" onClick={handleDownload} className="btn btn-primary btn-md">
            <Download className="size-4" />
            Descargar one-pager
          </button>
        </div>
      </div>

      <div
        className={cx(
          'mt-5 grid grid-cols-2 gap-2.5',
          isMobileView ? '' : 'lg:grid-cols-4 lg:gap-3',
        )}
      >
        {primaryKpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <article
              key={kpi.label}
              className={cx(
                'relative overflow-hidden rounded-3xl border p-4 shadow-soft sm:p-5',
                kpi.featured
                  ? 'border-white/10 bg-forest-950 text-cream-50'
                  : 'border-forest-900/8 bg-white',
              )}
            >
              {kpi.featured ? (
                <>
                  <div className="pointer-events-none absolute -top-16 -right-12 size-40 rounded-full bg-forest-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-16 -left-10 size-36 rounded-full bg-maize-500/10 blur-3xl" />
                </>
              ) : null}
              <div className="relative flex items-start justify-between gap-2">
                <span
                  className={cx(
                    'flex size-9 items-center justify-center rounded-xl',
                    kpi.featured
                      ? 'bg-forest-500/20 text-forest-200'
                      : 'bg-forest-100 text-forest-700',
                  )}
                >
                  <Icon className="size-4.5" strokeWidth={2.1} />
                </span>
                <span
                  className={cx(
                    'flex items-center gap-0.5 rounded-full px-1.5 py-1 text-[8px] font-bold',
                    kpi.featured
                      ? 'bg-white/10 text-forest-200'
                      : kpi.down
                        ? 'bg-forest-100 text-forest-700'
                        : 'bg-forest-100 text-forest-700',
                  )}
                >
                  {kpi.down ? (
                    <ArrowDownRight className="size-2.5" />
                  ) : (
                    <ArrowUpRight className="size-2.5" />
                  )}
                  {kpi.delta}
                </span>
              </div>
              <p
                className={cx(
                  'relative mt-4 text-[9px] font-bold tracking-[0.16em] uppercase',
                  kpi.featured ? 'text-forest-300' : 'text-forest-600',
                )}
              >
                {kpi.label}
              </p>
              <p
                className={cx(
                  'relative mt-1 font-display font-extrabold tracking-[-0.03em] tabular-nums',
                  isMobileView ? 'text-[22px]' : 'text-[26px] lg:text-3xl',
                )}
              >
                <AnimatedValue value={kpi.value} format={formatQ} />
              </p>
              <p
                className={cx(
                  'relative mt-1 text-[8.5px] leading-snug sm:text-[9.5px]',
                  kpi.featured ? 'text-cream-100/45' : 'text-forest-900/40',
                )}
              >
                {kpi.note}
              </p>
            </article>
          )
        })}
      </div>

      <div
        className={cx(
          'mt-3 grid grid-cols-2 gap-2.5',
          isMobileView ? '' : 'lg:grid-cols-4 lg:gap-3',
        )}
      >
        {secondaryKpis.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="card p-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[8.5px] font-bold tracking-[0.1em] text-forest-900/40 uppercase">
                  {item.label}
                </p>
                <Icon className="size-3.5 text-forest-600" />
              </div>
              <p className="mt-1.5 font-display text-lg font-extrabold tracking-tight text-forest-950">
                {item.value}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-forest-900/8">
                <div
                  className="h-full rounded-full bg-forest-500"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[8.5px] text-forest-900/35">{item.note}</p>
            </div>
          )
        })}
      </div>

      <div
        className={cx(
          'mt-4 grid gap-4',
          isMobileView ? '' : 'lg:grid-cols-[1.35fr_0.65fr]',
        )}
      >
        <div className="card p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                Ingresos recurrentes
              </p>
              <h3 className="mt-0.5 font-display text-[15px] font-bold tracking-tight text-forest-950">
                Evolución del MRR
              </h3>
              <p className="mt-0.5 text-[9.5px] text-forest-900/40">
                Últimos 6 meses · de {METRICS.months[0].farmers} a{' '}
                {METRICS.months[METRICS.months.length - 1].farmers} agricultores
              </p>
            </div>
            <span className="chip bg-forest-100 text-[9px] text-forest-700">
              <TrendingUp className="size-2.5" />
              +108 % en 6 meses
            </span>
          </div>

          <div className="mt-5 flex items-end gap-1.5 sm:gap-2.5">
            {METRICS.months.map((month, index) => {
              const pct = (month.mrr / maxMrr) * 100
              const current = index === METRICS.months.length - 1
              return (
                <div key={month.month} className="group flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className={cx(
                      'text-[7.5px] font-bold tabular-nums transition sm:text-[8.5px]',
                      current
                        ? 'text-forest-950'
                        : 'text-forest-900/35 opacity-0 group-hover:opacity-100 sm:opacity-100',
                    )}
                  >
                    {formatQ(month.mrr)}
                  </span>
                  <div className="flex h-28 w-full items-end sm:h-36">
                    <div
                      className={cx(
                        'w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80',
                        current
                          ? 'bg-gradient-to-t from-forest-600 to-maize-400'
                          : 'bg-gradient-to-t from-forest-800 to-forest-400',
                      )}
                      style={{ height: `${Math.max(8, pct)}%` }}
                      title={`${month.month}: ${formatQ(month.mrr)} · ${month.farmers} agricultores`}
                    />
                  </div>
                  <span
                    className={cx(
                      'text-[8px] font-semibold sm:text-[9px]',
                      current ? 'text-forest-950' : 'text-forest-900/40',
                    )}
                  >
                    {month.month}
                  </span>
                  <span className="text-[7px] text-forest-900/30">{month.farmers}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-forest-900/6 pt-2.5 text-[8px] text-forest-900/30">
            <span>Barras: MRR mensual</span>
            <span>Número inferior: agricultores activos</span>
          </div>
        </div>

        <div className="card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                Mezcla de ingresos
              </p>
              <h3 className="mt-0.5 font-display text-[15px] font-bold tracking-tight text-forest-950">
                De dónde viene el MRR
              </h3>
            </div>
            <PieChart className="size-4 text-forest-600" />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex size-32 shrink-0 items-center justify-center rounded-full">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${mixColors[0]} 0 ${METRICS.revenueMix[0].value}%, ${mixColors[1]} ${METRICS.revenueMix[0].value}% ${METRICS.revenueMix[0].value + METRICS.revenueMix[1].value}%, ${mixColors[2]} ${METRICS.revenueMix[0].value + METRICS.revenueMix[1].value}% 100%)`,
                }}
              />
              <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="font-display text-lg font-extrabold tracking-tight text-forest-950">
                  {formatQ(METRICS.mrr)}
                </span>
                <span className="text-[7px] font-bold tracking-wide text-forest-900/35 uppercase">
                  MRR total
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2.5">
              {METRICS.revenueMix.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-[9px] font-semibold text-forest-900/65">
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: mixColors[index] }}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="text-[9px] font-bold text-forest-950">{item.value}%</span>
                  </div>
                  <p className="mt-0.5 pl-3 text-[8px] text-forest-900/35">
                    {formatQ(Math.round((METRICS.mrr * item.value) / 100))} / mes
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-forest-50 p-2.5">
            <p className="flex items-start gap-1.5 text-[8.5px] leading-relaxed text-forest-900/50">
              <Leaf className="mt-0.5 size-3 shrink-0 text-forest-600" />
              El 90 % del ingreso es recurrente o recurrente-biológico: suscripción + bio-insumos
              mensuales.
            </p>
          </div>
        </div>
      </div>

      <div
        className={cx(
          'mt-4 grid gap-4',
          isMobileView ? '' : 'lg:grid-cols-[1.1fr_0.9fr]',
        )}
      >
        <div className="card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                Adquisición
              </p>
              <h3 className="mt-0.5 font-display text-[15px] font-bold tracking-tight text-forest-950">
                Embudo de agricultores
              </h3>
            </div>
            <span className="chip bg-maize-200 text-[8.5px] text-maize-700">
              24 % trial → pago
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {METRICS.funnel.map((stage, index) => {
              const previous = METRICS.funnel[index - 1]
              const conversion = previous ? (stage.value / previous.value) * 100 : null
              return (
                <div key={stage.label}>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold text-forest-950">{stage.label}</p>
                      <p className="text-[8px] text-forest-900/35">{stage.hint}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-[15px] font-extrabold text-forest-950 tabular-nums">
                        {stage.value.toLocaleString('es-GT')}
                      </p>
                      {conversion ? (
                        <p className="text-[7.5px] font-bold text-forest-600">
                          {conversion.toFixed(1)} % del paso anterior
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-forest-900/6">
                    <div
                      className={cx(
                        'h-full rounded-full transition-all duration-700',
                        index === METRICS.funnel.length - 1
                          ? 'bg-forest-900'
                          : index === 0
                            ? 'bg-forest-300'
                            : 'bg-gradient-to-r from-forest-400 to-forest-600',
                      )}
                      style={{ width: `${Math.max(4, (stage.value / maxFunnel) * 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                Ronda semilla
              </p>
              <h3 className="mt-0.5 font-display text-[15px] font-bold tracking-tight text-forest-950">
                Uso de fondos
              </h3>
            </div>
            <Wallet className="size-4 text-forest-600" />
          </div>
          <div className="mt-4 space-y-3">
            {METRICS.useOfFunds.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[9px] font-semibold text-forest-900/65">{item.label}</p>
                  <span className="text-[9px] font-bold text-forest-950">{item.value}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-forest-900/6">
                  <div
                    className={cx(
                      'h-full rounded-full',
                      index === 0
                        ? 'bg-forest-700'
                        : index === 1
                          ? 'bg-forest-500'
                          : index === 2
                            ? 'bg-maize-500'
                            : 'bg-earth-500',
                    )}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-cream-50 p-2.5">
            <p className="flex items-start gap-1.5 text-[8.5px] leading-relaxed text-forest-900/45">
              <Target className="mt-0.5 size-3 shrink-0 text-forest-600" />
              Asignación prevista para 18 meses: modelo de IA, expansión a 3 departamentos y
              logística de bio-insumos.
            </p>
          </div>
        </div>
      </div>

      <div className="card mt-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[13.5px] font-bold text-forest-950">
            Tracción operativa
          </h3>
          <span className="text-[8.5px] text-forest-900/35">
            Datos acumulados a noviembre 2026
          </span>
        </div>
        <div
          className={cx(
            'mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-forest-900/8 bg-forest-900/8',
            isMobileView ? '' : 'sm:grid-cols-3 lg:grid-cols-5',
          )}
        >
          {traction.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="bg-white px-3 py-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                  <Icon className="size-3.5" />
                </span>
                <p className="mt-2 font-display text-lg font-extrabold tracking-tight text-forest-950">
                  {item.value}
                </p>
                <p className="text-[8.5px] leading-snug text-forest-900/40">{item.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-forest-900/8 bg-cream-50/70 p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-[9px] leading-relaxed text-forest-900/40">
          <Sparkles className="mt-0.5 size-3 shrink-0 text-forest-500" />
          Cifras simuladas a partir de la presentación de AgroGen Precision: MRR Q15,000, ARR
          Q180,000, LTV Q2,160 y CAC Q300. La demo no representa una oferta de inversión.
        </p>
        <Link
          to="/panel"
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-bold text-forest-700"
        >
          Volver al panel
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </div>
  )
}
