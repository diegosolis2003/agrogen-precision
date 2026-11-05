import { useRef, useState } from 'react'
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ImagePlus,
  Leaf,
  ScanLine,
  Sparkles,
  Sun,
  Upload,
  X,
} from 'lucide-react'
import { SAMPLES } from '../../data/catalog'
import { cx, severityTone } from '../../lib/utils'

const filters = ['Todos', 'Hongo', 'Plaga', 'Nutrición']
const plots = ['Parcela La Esperanza', 'Finca El Mirador', 'Lote El Roble']

const photoTips = [
  { icon: Sun, text: 'Luz natural, sin sombra directa' },
  { icon: Camera, text: 'Enfoca una sola hoja afectada' },
  { icon: Leaf, text: 'Incluye el envés y el haz' },
]

export default function UploadStep({
  selected,
  onSelect,
  customImage,
  onFile,
  onClearPhoto,
  plot,
  setPlot,
  onAnalyze,
}) {
  const [filter, setFilter] = useState('Todos')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const filtered = SAMPLES.filter((sample) => filter === 'Todos' || sample.category === filter)
  const ready = Boolean(selected || customImage)

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="card p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="icon-tile bg-forest-100 text-forest-700">
              <Camera className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-[15px] font-bold tracking-tight text-forest-950">
                Foto de la hoja afectada
              </h3>
              <p className="text-[10.5px] text-forest-900/45">
                Sube una imagen o elige un caso de ejemplo
              </p>
            </div>
          </div>
          <span className="chip bg-maize-200 text-[9px] text-maize-700">
            <Sparkles className="size-2.5" />
            Gratis
          </span>
        </div>

        <div
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cx(
            'mt-4 rounded-2xl border-2 border-dashed p-1.5 transition-all',
            customImage
              ? 'border-forest-300 bg-forest-50/60'
              : dragging
                ? 'border-forest-500 bg-forest-50'
                : 'border-forest-900/15 bg-cream-50 hover:border-forest-500/40',
          )}
        >
          {customImage ? (
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={customImage}
                alt="Foto del cultivo cargada"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/65 via-transparent to-transparent" />
              <span className="chip absolute top-2.5 left-2.5 bg-white/90 text-[9px] text-forest-800 backdrop-blur">
                <Check className="size-2.5" strokeWidth={3} />
                Foto lista para analizar
              </span>
              <div className="absolute right-2.5 bottom-2.5 left-2.5 flex items-center justify-between">
                <p className="truncate text-[9.5px] font-medium text-cream-50/80">
                  Imagen cargada desde tu dispositivo
                </p>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold text-forest-900 backdrop-blur transition hover:bg-white"
                  >
                    Cambiar
                  </button>
                  <button
                    type="button"
                    onClick={onClearPhoto}
                    className="flex size-6 items-center justify-center rounded-full bg-forest-950/55 text-cream-50 backdrop-blur transition hover:bg-forest-950/80"
                    aria-label="Quitar foto"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl px-5 py-7 text-center transition hover:bg-forest-50/50 sm:py-8"
            >
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-forest-900 text-cream-50 shadow-soft">
                <ImagePlus className="size-6" />
                <span className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-full bg-maize-500 text-forest-950 ring-2 ring-white">
                  <Upload className="size-3" strokeWidth={2.6} />
                </span>
              </span>
              <p className="mt-3 text-[13px] font-bold text-forest-950">
                Arrastra una foto o toca para subir
              </p>
              <p className="mt-1 max-w-[240px] text-[10.5px] leading-relaxed text-forest-900/45">
                Una hoja bien enfocada es suficiente. JPG, PNG o HEIC · máx. 8 MB.
              </p>
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) onFile(file)
              event.target.value = ''
            }}
          />
        </div>

        {selected && !customImage ? (
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-forest-900/8 bg-forest-50 p-2">
            <img
              src={selected.image}
              alt=""
              className="size-10 rounded-lg object-cover ring-1 ring-forest-900/10"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold tracking-wide text-forest-600 uppercase">
                Caso seleccionado
              </p>
              <p className="truncate text-[11px] font-semibold text-forest-950">
                {selected.disease} · {selected.crop}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="rounded-full p-1.5 text-forest-900/35 transition hover:bg-forest-900/5 hover:text-forest-900"
              aria-label="Quitar caso seleccionado"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : null}

        <div className="mt-4">
          <label className="label" htmlFor="plot">
            Parcela
          </label>
          <div className="relative">
            <select
              id="plot"
              value={plot}
              onChange={(event) => setPlot(event.target.value)}
              className="input appearance-none pr-9"
            >
              {plots.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-forest-900/40" />
          </div>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!ready}
          className="btn btn-primary btn-lg mt-3 w-full"
        >
          <ScanLine className="size-4.5" />
          Analizar con IA
          <ArrowRight className="size-4" />
        </button>
        <p className="mt-2 text-center text-[9.5px] text-forest-900/40">
          {ready
            ? 'Análisis con el mapeo MAGA · resultado en menos de 3 minutos'
            : 'Primero sube una foto o elige un caso de ejemplo'}
        </p>

        <div className="mt-4 grid gap-2 border-t border-forest-900/6 pt-3.5 sm:grid-cols-3">
          {photoTips.map((tip) => {
            const Icon = tip.icon
            return (
              <div key={tip.text} className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                  <Icon className="size-3" />
                </span>
                <p className="text-[9.5px] leading-snug text-forest-900/50">{tip.text}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-3.5">
        <div className="card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                Casos de ejemplo
              </p>
              <h3 className="mt-0.5 font-display text-[14px] font-bold text-forest-950">
                O elige una muestra
              </h3>
            </div>
            <span className="chip bg-forest-100 text-[9px] text-forest-700">
              {filtered.length} casos
            </span>
          </div>

          <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={cx(
                  'shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-semibold transition',
                  filter === item
                    ? 'bg-forest-900 text-cream-50'
                    : 'bg-forest-900/5 text-forest-900/55 hover:bg-forest-900/10',
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {filtered.map((sample) => {
              const active = selected?.id === sample.id && !customImage
              const tone = severityTone(sample.severity)
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onSelect(sample)}
                  aria-pressed={active}
                  className={cx(
                    'group overflow-hidden rounded-xl border text-left transition-all',
                    active
                      ? 'border-forest-600 bg-forest-50 ring-2 ring-forest-500/15'
                      : 'border-forest-900/8 bg-white hover:-translate-y-0.5 hover:border-forest-900/20 hover:shadow-soft',
                  )}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={sample.image}
                      alt={`${sample.disease} en ${sample.crop}`}
                      className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent" />
                    <span className={cx('absolute top-1.5 left-1.5 size-1.5 rounded-full', tone.dot)} />
                    {active ? (
                      <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-forest-900 text-cream-50">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    ) : null}
                    <span className="absolute bottom-1.5 left-1.5 text-[8px] font-bold tracking-wide text-cream-50/80 uppercase">
                      {sample.crop}
                    </span>
                  </div>
                  <div className="p-2">
                    <p className="truncate text-[10px] font-bold text-forest-950">{sample.disease}</p>
                    <p className="mt-0.5 flex items-center justify-between text-[8.5px] text-forest-900/40">
                      <span>{sample.category}</span>
                      <span className="font-semibold text-forest-700">{sample.confidence} %</span>
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-2xl border border-maize-600/20 bg-maize-200/40 p-3.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-maize-500 text-forest-950">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-[10.5px] font-bold text-forest-950">¿No tienes una foto a mano?</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-forest-900/55">
              Elige una muestra y experimenta el flujo completo: análisis, resultado y receta de
              bio-insumo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
