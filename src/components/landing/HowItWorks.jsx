import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  CheckCircle2,
  FlaskConical,
  Leaf,
  ShieldCheck,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Toma una foto',
    text: 'Enfoca una hoja afectada desde tu teléfono. Si aún no tienes una, elige un caso de ejemplo precargado.',
    hint: 'Toma 2 segundos',
  },
  {
    number: '02',
    icon: BrainCircuit,
    title: 'La IA diagnostica',
    text: 'El modelo compara color, textura y patrón foliar con el mapeo agroecológico del MAGA y calcula la severidad.',
    hint: 'Menos de 3 minutos',
  },
  {
    number: '03',
    icon: FlaskConical,
    title: 'Recibe tu bio-insumo',
    text: 'Un agrónomo valida la receta y fabricamos el bio-insumo específico para tu parcela. Llega lista para aplicar.',
    hint: 'Entrega en 48 horas',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grain relative overflow-hidden rounded-[2.25rem] bg-forest-950 px-5 py-9 text-cream-50 sm:rounded-[2.75rem] sm:px-9 sm:py-12 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(82,183,136,0.22),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(244,201,93,0.1),transparent_45%)]" />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

          <div className="relative grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <span className="eyebrow text-forest-300">
                <Leaf className="size-3.5" />
                Cómo funciona
              </span>
              <h2 className="mt-3 max-w-lg font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
                Tres pasos.
                <span className="text-forest-300"> Cero adivinanzas.</span>
              </h2>
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-cream-100/55 sm:text-sm lg:justify-self-end">
              El mismo flujo en la app móvil y en el panel web. Diseñado para usarse con una mano,
              bajo el sol y con señal intermitente.
            </p>
          </div>

          <div className="relative mt-9 grid gap-3.5 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="group relative">
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-forest-500/15 text-forest-300 ring-1 ring-forest-400/20">
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <span className="font-display text-[28px] leading-none font-extrabold text-white/10">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[16px] font-bold text-cream-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-cream-100/55">
                      {step.text}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold text-maize-400">
                      <CheckCircle2 className="size-3" />
                      {step.hint}
                    </div>
                  </div>
                  {index < steps.length - 1 ? (
                    <span className="absolute top-1/2 -right-3 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-forest-900 text-cream-100/40 md:flex">
                      <ArrowRight className="size-3" />
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="relative mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {[
                { icon: ShieldCheck, text: 'Validado por agrónomos' },
                { icon: Leaf, text: 'Insumos 100 % biológicos' },
                { icon: CheckCircle2, text: 'Primer diagnóstico gratis' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <span
                    key={item.text}
                    className="flex items-center gap-1.5 text-[10.5px] font-medium text-cream-100/50"
                  >
                    <Icon className="size-3.5 text-forest-400" />
                    {item.text}
                  </span>
                )
              })}
            </div>
            <Link to="/diagnostico" className="btn btn-amber btn-md shrink-0">
              Probar el diagnóstico
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
