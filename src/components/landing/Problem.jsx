import { ArrowDown, Bug, FlaskConical, Timer } from 'lucide-react'

const problems = [
  {
    icon: Bug,
    tone: 'bg-clay-100 text-clay-600',
    title: 'Plagas que llegan sin aviso',
    text: 'Cuando la mancha aparece, parte de la cosecha ya se perdió. Sin un diagnóstico experto, el agricultor adivina y aplica de más.',
    stat: 'Hasta 40 % de pérdida',
  },
  {
    icon: FlaskConical,
    tone: 'bg-maize-200 text-maize-700',
    title: 'Químicos que empobrecen la tierra',
    text: 'Los fungicidas tradicionales resuelven hoy y degradan el suelo para la próxima temporada. El costo se paga dos veces.',
    stat: 'Suelo cada vez más débil',
  },
  {
    icon: Timer,
    tone: 'bg-forest-100 text-forest-700',
    title: 'Sensores caros y estudios lentos',
    text: 'Un sensor de campo cuesta cientos de dólares y un estudio de suelo tarda semanas. El cultivo no puede esperar tanto.',
    stat: 'Semanas sin respuesta',
  },
]

export default function Problem() {
  return (
    <section className="relative border-y border-forest-900/6 bg-cream-50/70 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-forest-500" />
              El problema real
            </span>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-4xl">
              El diagnóstico llega tarde.
              <span className="block text-forest-600">La cosecha no espera.</span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-sm leading-relaxed text-forest-900/60 sm:text-[15px]">
              En Centroamérica, el pequeño productor toma decisiones con información incompleta.
              AgroGen pone un agrónomo digital en su bolsillo: una foto basta para saber qué atacar
              y cómo nutrir la tierra sin gastar de más.
            </p>
            <a
              href="#como-funciona"
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-forest-700 hover:text-forest-900"
            >
              Así lo resolvemos
              <ArrowDown className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <article key={problem.title} className="card card-hover group relative overflow-hidden p-5 sm:p-6">
                <div className="pointer-events-none absolute -top-10 -right-8 size-28 rounded-full bg-forest-100/50 transition-transform duration-500 group-hover:scale-125" />
                <div className="relative flex items-start justify-between">
                  <span className={`icon-tile ${problem.tone}`}>
                    <Icon className="size-5" strokeWidth={2.1} />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-forest-900/8">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="relative mt-4 font-display text-[15.5px] font-bold tracking-tight text-forest-950">
                  {problem.title}
                </h3>
                <p className="relative mt-2 text-[12.5px] leading-relaxed text-forest-900/55">
                  {problem.text}
                </p>
                <div className="relative mt-4 flex items-center gap-1.5 border-t border-forest-900/6 pt-3 text-[10px] font-bold text-forest-700">
                  <span className="size-1.5 rounded-full bg-clay-400" />
                  {problem.stat}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
