import { Quote, Star, TrendingUp, Users, Wallet } from 'lucide-react'
import { TESTIMONIALS } from '../../data/catalog'
import { useApp } from '../../context/AppContext'
import { cx } from '../../lib/utils'

const impact = [
  { icon: Users, value: '100+', label: 'agricultores activos' },
  { icon: TrendingUp, value: '32 %', label: 'más cosecha promedio' },
  { icon: Wallet, value: 'Q240', label: 'ahorro por manzana' },
]

export default function Impact() {
  const { isMobileView } = useApp()

  return (
    <section className="border-y border-forest-900/6 bg-cream-50/70 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">
              <Star className="size-3.5" />
              Historias de campo
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-4xl">
              Agricultores que ya tienen su médico de cabecera.
            </h2>
          </div>
          <div className="flex items-center gap-3 sm:pb-1">
            <div className="flex items-center gap-0.5 text-maize-600">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="text-[11px] font-semibold text-forest-900/55">
              4.8/5 · 86 reseñas de productores
            </p>
          </div>
        </div>

        <div
          className={cx(
            'mt-7 gap-4',
            isMobileView
              ? 'no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 pb-2'
              : 'grid md:grid-cols-3',
          )}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={cx(
                'card relative flex flex-col overflow-hidden p-5 sm:p-6',
                isMobileView ? 'w-[270px] shrink-0 snap-start' : '',
              )}
            >
              <Quote className="size-8 text-forest-200" strokeWidth={1.6} />
              <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-forest-900/70">
                “{testimonial.quote}”
              </p>
              <div className="mt-5 flex items-center gap-2.5 border-t border-forest-900/6 pt-4">
                <span
                  className={cx(
                    'flex size-9 items-center justify-center rounded-full text-[10px] font-bold text-forest-950',
                    ['bg-forest-300', 'bg-maize-400', 'bg-earth-300'][index % 3],
                  )}
                >
                  {testimonial.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] font-bold text-forest-950">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-[9.5px] text-forest-900/45">{testimonial.role}</p>
                </div>
                <span className="shrink-0 rounded-full bg-forest-100 px-2 py-1 text-[8.5px] font-bold text-forest-700">
                  {testimonial.metric}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-forest-900/8 bg-forest-900/8 sm:grid-cols-3">
          {impact.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-white/80 px-4 py-3.5 backdrop-blur"
              >
                <span className="flex size-8 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg leading-none font-extrabold text-forest-950">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-forest-900/45">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
