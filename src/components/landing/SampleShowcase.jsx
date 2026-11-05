import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ImagePlus, ScanLine } from 'lucide-react'
import { SAMPLES } from '../../data/catalog'
import { useApp } from '../../context/AppContext'
import { cx, severityTone } from '../../lib/utils'
import SeverityBadge from '../ui/SeverityBadge'

export default function SampleShowcase() {
  const { isMobileView } = useApp()

  return (
    <section id="diagnostico" className="scroll-mt-20 border-y border-forest-900/6 bg-cream-50/70 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">
              <ScanLine className="size-3.5" />
              Demo interactiva
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-4xl">
              Prueba el diagnóstico con un caso real.
            </h2>
            <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-forest-900/55 sm:text-sm">
              Estas son muestras reales del mapeo MAGA. Elige una, observa el análisis de IA y
              recibe la receta de bio-insumo que recomendaría nuestro equipo agronómico.
            </p>
          </div>
          <Link to="/diagnostico" className="btn btn-soft btn-md shrink-0">
            <ImagePlus className="size-4" />
            Subir mi propia foto
          </Link>
        </div>

        <div
          className={cx(
            'mt-7 gap-3.5',
            isMobileView
              ? 'no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 pb-2'
              : 'grid sm:grid-cols-2 lg:grid-cols-4',
          )}
        >
          {SAMPLES.map((sample) => {
            const tone = severityTone(sample.severity)
            return (
              <Link
                key={sample.id}
                to={`/diagnostico?muestra=${sample.id}`}
                className={cx(
                  'group card card-hover overflow-hidden',
                  isMobileView ? 'w-[230px] shrink-0 snap-start' : '',
                )}
              >
                <div className="relative overflow-hidden bg-forest-950">
                  <img
                    src={sample.image}
                    alt={`Muestra de ${sample.disease} en ${sample.crop}`}
                    className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
                  <span className="chip absolute top-2.5 left-2.5 bg-forest-950/65 text-[9px] text-cream-50 backdrop-blur">
                    <span className={cx('size-1.5 rounded-full', tone.dot)} />
                    {sample.category}
                  </span>
                  <span className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-white/15 text-cream-50 backdrop-blur transition group-hover:bg-white group-hover:text-forest-900">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                  <div className="absolute right-2.5 bottom-2.5 left-2.5 flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-wide text-cream-50/80 uppercase">
                      {sample.crop}
                    </span>
                    <SeverityBadge severity={sample.severity} size="sm" className="backdrop-blur" />
                  </div>
                </div>
                <div className="p-3.5">
                  <h3 className="font-display text-[13.5px] font-bold tracking-tight text-forest-950">
                    {sample.disease}
                  </h3>
                  <p className="mt-0.5 truncate text-[10px] text-forest-900/45 italic">
                    {sample.scientificName}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between border-t border-forest-900/6 pt-2.5">
                    <span className="text-[9.5px] font-semibold text-forest-600">
                      Confianza {sample.confidence} %
                    </span>
                    <span className="flex items-center gap-1 text-[9.5px] font-bold text-forest-800">
                      Probar
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-forest-900/8 bg-white/60 px-3.5 py-2.5">
          <span className="flex size-6 items-center justify-center rounded-full bg-forest-100 text-forest-700">
            <ScanLine className="size-3.5" />
          </span>
          <p className="text-[10.5px] leading-snug text-forest-900/55">
            Los casos son demostrativos. Cada diagnóstico real se valida con el historial de la
            parcela y, si hace falta, con un ingeniero agrónomo.
          </p>
        </div>
      </div>
    </section>
  )
}
