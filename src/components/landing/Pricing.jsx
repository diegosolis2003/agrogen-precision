import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  CreditCard,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatQ } from '../../lib/utils'

const included = [
  'Diagnósticos ilimitados con foto',
  'Receta de bio-insumo personalizada',
  '1 bio-insumo al mes incluido',
  'Envío directo a tu parcela',
  'Historial de parcelas y alertas',
  'Soporte por WhatsApp con agrónomo',
]

const valueRows = [
  { label: 'Diagnóstico con IA', value: 'ilimitado', note: 'Q80 c/u en el mercado' },
  { label: 'Bio-insumo mensual', value: '1 incluido', note: 'valor Q145' },
  { label: 'Envío a parcela', value: 'incluido', note: 'valor Q35' },
  { label: 'Soporte agronómico', value: 'WhatsApp', note: 'respuesta < 2 h' },
]

export default function Pricing() {
  const { subscription, activateSubscription, renewSubscription, pushToast } = useApp()
  const navigate = useNavigate()
  const active = subscription.status === 'activa'

  const handlePlan = () => {
    if (active) renewSubscription()
    else activateSubscription()
    window.setTimeout(() => navigate('/panel'), 650)
  }

  return (
    <section id="planes" className="scroll-mt-20 border-y border-forest-900/6 bg-cream-50/70 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <CreditCard className="size-3.5" />
            Planes
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-4xl">
            Un plan simple. Una cosecha más sana.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-forest-900/55 sm:text-sm">
            Empieza con tu primer diagnóstico gratis. Si te sirve, activa el plan y recibe cada mes
            tu bio-insumo a la medida.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grain relative overflow-hidden rounded-[2rem] bg-forest-950 p-6 text-cream-50 shadow-lift sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-forest-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 size-56 rounded-full bg-maize-500/10 blur-3xl" />
            <Leaf className="pointer-events-none absolute top-6 right-6 size-24 text-white/5" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <span className="chip border border-forest-400/25 bg-forest-500/15 text-forest-200">
                  <Sparkles className="size-3" />
                  Precisión Mensual
                </span>
                <span className="rounded-full bg-maize-500 px-2.5 py-1 text-[9px] font-bold tracking-wide text-forest-950 uppercase">
                  Primer diagnóstico gratis
                </span>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                  {formatQ(150)}
                </span>
                <span className="pb-1.5 text-[12px] font-medium text-cream-100/45">/ mes</span>
              </div>
              <p className="mt-1 text-[11px] text-cream-100/45">
                Todo incluido · sin contrato · cancela cuando quieras
              </p>

              <button type="button" onClick={handlePlan} className="btn btn-amber btn-lg mt-6 w-full">
                {active ? 'Renovar mi plan por Q150' : 'Suscribirme por Q150/mes'}
                <ArrowRight className="size-4" />
              </button>
              {active ? (
                <p className="mt-2 text-center text-[10px] font-medium text-forest-300">
                  Tu plan está activo · próxima renovación{' '}
                  {new Intl.DateTimeFormat('es-GT', { day: 'numeric', month: 'short' }).format(
                    new Date(subscription.renewsAt),
                  )}
                </p>
              ) : null}

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] font-medium text-cream-100/70"
                  >
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-forest-500/20 text-forest-300">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] text-cream-100/35">
                <ShieldCheck className="size-3.5 text-forest-400" />
                Pago seguro · Factura electrónica · Datos protegidos
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="card flex-1 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[15px] font-bold text-forest-950">
                  ¿Qué recibe tu Q150?
                </h3>
                <span className="chip bg-forest-100 text-forest-700">Valor real Q330+</span>
              </div>
              <div className="mt-4 divide-y divide-forest-900/6">
                {valueRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-[11.5px] font-semibold text-forest-950">{row.label}</p>
                      <p className="text-[9.5px] text-forest-900/40">{row.note}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-forest-50 px-2.5 py-1 text-[10px] font-bold text-forest-700">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-maize-200/60 p-3.5">
                <p className="text-[10.5px] font-semibold text-maize-700">
                  Ahorro estimado de Q240 por manzana al evitar aplicaciones genéricas.
                </p>
              </div>
            </div>

            <div className="card flex items-start gap-3 p-5">
              <span className="icon-tile bg-earth-100 text-earth-700">
                <Users className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[13.5px] font-bold text-forest-950">
                  ¿Eres una cooperativa?
                </h3>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-forest-900/50">
                  Panel multi-parcela, precios por volumen y acompañamiento técnico presencial.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    pushToast({
                      tone: 'info',
                      title: 'Solicitud enviada',
                      message: 'Un asesor de AgroGen se pondrá en contacto con tu cooperativa en 24 h.',
                    })
                  }
                  className="mt-2.5 inline-flex items-center gap-1 text-[10.5px] font-bold text-forest-700 hover:text-forest-900"
                >
                  Solicitar cotización
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
