import {
  Activity,
  Check,
  FlaskConical,
  LoaderCircle,
  Map,
  ScanLine,
  ShieldCheck,
  X,
} from 'lucide-react'
import { cx } from '../../lib/utils'

const stages = [
  {
    at: 0,
    label: 'Preprocesando imagen',
    detail: 'Nitidez, color y contraste foliar',
    icon: ScanLine,
  },
  {
    at: 26,
    label: 'Comparando con mapeo MAGA',
    detail: '12,400 muestras del altiplano guatemalteco',
    icon: Map,
  },
  {
    at: 54,
    label: 'Evaluando severidad',
    detail: 'Área afectada y etapa fenológica',
    icon: Activity,
  },
  {
    at: 80,
    label: 'Formulando bio-insumo',
    detail: 'Dosis y mezcla para tu parcela',
    icon: FlaskConical,
  },
]

const messages = [
  'Buscando coincidencias en el mapa agroecológico...',
  'Cruzando patrón foliar con el historial del cultivo...',
  'Midiendo el porcentaje de área afectada...',
  'Preparando la receta con nuestro equipo agronómico...',
]

export default function AnalyzingStep({ image, crop, progress, onCancel }) {
  const activeIndex = stages.reduce((acc, stage, index) => (progress >= stage.at ? index : acc), 0)
  const message = messages[Math.min(activeIndex, messages.length - 1)]

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="relative overflow-hidden rounded-3xl bg-forest-950 shadow-lift">
        <img src={image} alt="Cultivo en análisis" className="aspect-square w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-forest-950/45" />

        <div className="absolute inset-3 sm:inset-4">
          <span className="absolute top-0 left-0 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 border-forest-300/80" />
          <span className="absolute top-0 right-0 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-forest-300/80" />
          <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-forest-300/80" />
          <span className="absolute right-0 bottom-0 h-6 w-6 rounded-br-lg border-r-2 border-b-2 border-forest-300/80" />
          <div className="absolute right-3 left-3 h-px animate-scan bg-gradient-to-r from-transparent via-forest-200 to-transparent shadow-[0_0_24px_3px_rgba(149,213,178,0.7)]" />
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          <span className="chip bg-forest-950/65 text-[9px] text-cream-50 backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-forest-300" />
            Procesando imagen
          </span>
        </div>

        <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/15 bg-forest-950/55 p-3.5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[8.5px] font-bold tracking-[0.16em] text-forest-300 uppercase">
                Motor AgroGen v2.4
              </p>
              <p className="mt-0.5 truncate text-[11.5px] font-semibold text-cream-50">
                {message}
              </p>
            </div>
            <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-forest-300/30">
              <LoaderCircle className="size-5 animate-spin text-forest-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="card flex flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="eyebrow">
              <span className="size-1.5 animate-pulse rounded-full bg-forest-500" />
              Análisis en curso
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-forest-950">
              Estamos revisando tu cultivo
            </h2>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-forest-900/50">
              La IA cruza la foto con el mapeo agroecológico del MAGA y el historial de tu parcela.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-forest-900/10 text-forest-900/40 transition hover:bg-forest-900/5 hover:text-forest-900"
            aria-label="Cancelar análisis"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                Progreso del análisis
              </p>
              <p className="mt-0.5 text-[10px] text-forest-900/40">
                {crop ? `Cultivo: ${crop}` : 'Procesando tu imagen'}
              </p>
            </div>
            <p className="font-display text-3xl font-extrabold tracking-tight text-forest-950 tabular-nums">
              {progress}
              <span className="text-base font-bold text-forest-900/30">%</span>
            </p>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-forest-900/8"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso del análisis"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-forest-700 to-forest-400 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          {stages.map((stage, index) => {
            const nextAt = stages[index + 1]?.at ?? 100
            const done = progress >= nextAt
            const active = !done && progress >= stage.at
            const Icon = stage.icon
            return (
              <div
                key={stage.label}
                className={cx(
                  'flex items-center gap-3 rounded-xl border p-2.5 transition-all',
                  active
                    ? 'border-forest-500/20 bg-forest-50'
                    : 'border-transparent bg-transparent',
                )}
              >
                <span
                  className={cx(
                    'flex size-7 shrink-0 items-center justify-center rounded-lg',
                    done
                      ? 'bg-forest-100 text-forest-700'
                      : active
                        ? 'bg-forest-900 text-cream-50'
                        : 'bg-forest-900/5 text-forest-900/30',
                  )}
                >
                  {done ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : active ? (
                    <LoaderCircle className="size-3.5 animate-spin" />
                  ) : (
                    <Icon className="size-3.5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={cx(
                      'text-[11px] font-semibold',
                      done || active ? 'text-forest-950' : 'text-forest-900/35',
                    )}
                  >
                    {stage.label}
                  </p>
                  <p
                    className={cx(
                      'truncate text-[9px]',
                      done || active ? 'text-forest-900/40' : 'text-forest-900/25',
                    )}
                  >
                    {stage.detail}
                  </p>
                </div>
                {done ? (
                  <span className="text-[8.5px] font-bold text-forest-600">Listo</span>
                ) : active ? (
                  <span className="flex items-center gap-1 text-[8.5px] font-bold text-forest-700">
                    <span className="size-1 animate-pulse rounded-full bg-forest-500" />
                    En curso
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-forest-900/6 pt-4">
          <ShieldCheck className="size-3.5 shrink-0 text-forest-500" />
          <p className="text-[9.5px] leading-snug text-forest-900/40">
            Análisis simulado para esta demo. En la app real se valida con un ingeniero agrónomo
            cuando la confianza es menor al 80 %.
          </p>
        </div>
      </div>
    </div>
  )
}
