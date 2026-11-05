import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  FlaskConical,
  Leaf,
  MapPin,
  Sparkles,
  Sprout,
} from 'lucide-react'

const benefits = [
  {
    icon: FlaskConical,
    title: 'Receta de un ingeniero agrónomo',
    text: 'La IA propone; un especialista valida dosis, mezcla y frecuencia para tu cultivo.',
  },
  {
    icon: Sprout,
    title: 'Insumos biológicos y locales',
    text: 'Trichoderma, Bacillus, neem y vermicompost de proveedores guatemaltecos.',
  },
  {
    icon: Clock,
    title: 'Listo y entregado en 48 horas',
    text: 'Elaboramos cada lote en nuestro laboratorio y coordinamos la entrega en parcela.',
  },
  {
    icon: Leaf,
    title: 'Cuidas el suelo, no solo la hoja',
    text: 'Regeneramos la microbiota y reducimos la dependencia de agroquímicos.',
  },
]

const ingredients = [
  { name: 'Trichoderma harzianum', qty: '200 g', note: 'agente antagonista' },
  { name: 'Bacillus subtilis', qty: '150 g', note: 'protección foliar' },
  { name: 'Melaza orgánica', qty: '250 ml', note: 'activador microbiano' },
  { name: 'Agua no clorada', qty: '20 L', note: 'base de la mezcla' },
]

export default function Bioinputs() {
  return (
    <section id="bioinsumos" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <span className="eyebrow">
              <FlaskConical className="size-3.5" />
              Bio-insumos a la medida
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-4xl">
              No vendemos un químico.
              <span className="block text-forest-600">Formulamos tu solución.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-forest-900/60 sm:text-[15px]">
              Cada diagnóstico termina en una fórmula. Nuestro laboratorio en Chimaltenango prepara
              el bio-insumo específico para la plaga, el cultivo y el tamaño de tu parcela. Sin
              sobredosis, sin productos genéricos y sin sellar tu suelo.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.title} className="flex gap-3">
                    <span className="icon-tile size-9 rounded-xl bg-forest-100 text-forest-700">
                      <Icon className="size-4" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3 className="text-[12.5px] font-bold text-forest-950">{benefit.title}</h3>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-forest-900/50">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/diagnostico" className="btn btn-primary btn-md">
                Crear mi bio-insumo
                <ArrowRight className="size-4" />
              </Link>
              <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-forest-900/45">
                <MapPin className="size-3.5 text-forest-500" />
                Laboratorio en Chimaltenango · envíos a todo el altiplano
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] border border-forest-900/8 bg-forest-100/45" />
            <div className="pointer-events-none absolute -top-6 right-8 size-24 rounded-full bg-maize-400/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-forest-950 p-5 text-cream-50 shadow-lift sm:p-6">
              <div className="pointer-events-none absolute -right-10 -bottom-14 size-48 rounded-full border border-white/8" />
              <div className="pointer-events-none absolute -right-2 -bottom-4 size-56 rounded-full border border-white/5" />
              <Leaf className="pointer-events-none absolute -top-6 -right-4 size-36 text-forest-500/8" />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-maize-400/25 bg-maize-500/10 px-2 py-0.5 text-[8.5px] font-bold tracking-[0.16em] text-maize-300 uppercase">
                      Fórmula a la medida
                    </span>
                    <span className="text-[9px] font-medium text-cream-100/30">#GT-2481</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-[22px]">
                    Bio-Fungicida Tri-Guard
                  </h3>
                  <p className="mt-1 text-[10.5px] text-cream-100/45">
                    Para tizón temprano · Tomate · 0.5 manzana
                  </p>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-forest-500/15 text-forest-300 ring-1 ring-forest-400/20">
                  <FlaskConical className="size-5" />
                </span>
              </div>

              <div className="relative mt-5 rounded-2xl border border-white/8 bg-white/[0.04] p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold tracking-[0.16em] text-cream-100/35 uppercase">
                    Ingredientes activos
                  </p>
                  <span className="chip bg-forest-500/15 px-2 py-0.5 text-[8.5px] text-forest-300">
                    <Sprout className="size-2.5" />
                    100 % biológico
                  </span>
                </div>
                <ul className="mt-2 divide-y divide-white/6">
                  {ingredients.map((ingredient) => (
                    <li
                      key={ingredient.name}
                      className="flex items-center justify-between gap-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-forest-500/15 text-forest-300">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        <span className="truncate text-[11px] font-medium text-cream-100/80">
                          {ingredient.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10.5px] font-bold text-cream-50 tabular-nums">
                          {ingredient.qty}
                        </span>
                        <p className="text-[8px] text-cream-100/30">{ingredient.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: 'Dosis', value: '250 ml/planta' },
                  { label: 'Frecuencia', value: 'Cada 7 días' },
                  { label: 'Cobertura', value: '0.5 manzana' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/[0.04] p-2.5">
                    <p className="text-[8px] font-semibold tracking-wide text-cream-100/35 uppercase">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold text-cream-50">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-forest-400 text-[9px] font-bold text-forest-950">
                    AC
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold text-cream-50">Ing. Ana Cotí</p>
                    <p className="flex items-center gap-1 text-[8.5px] text-cream-100/35">
                      <BadgeCheck className="size-2.5 text-forest-400" /> Validación agronómica
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8.5px] text-cream-100/35">Lote completo</p>
                  <p className="font-display text-lg font-extrabold text-maize-400">Q145</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-3 hidden animate-float items-center gap-2 rounded-2xl border border-forest-900/10 bg-white px-3 py-2.5 shadow-lift sm:flex">
              <span className="flex size-8 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <Sparkles className="size-3.5" />
              </span>
              <div>
                <p className="text-[10px] font-bold text-forest-950">32 % menos costo</p>
                <p className="text-[8.5px] text-forest-900/45">vs. fungicida tradicional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
