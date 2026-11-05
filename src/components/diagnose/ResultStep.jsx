import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FlaskConical,
  Leaf,
  MapPin,
  MessageCircle,
  PackageCheck,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import {
  cx,
  daysUntil,
  formatDate,
  formatQ,
  orderStatusLabel,
  severityTone,
} from '../../lib/utils'
import CircularGauge from '../ui/CircularGauge'
import SeverityBadge from '../ui/SeverityBadge'

export default function ResultStep({ result, onNew }) {
  const {
    orders,
    requestBioinput,
    subscription,
    renewSubscription,
    activateSubscription,
    pushToast,
  } = useApp()

  const { sample, record } = result
  const tone = severityTone(sample.severity)
  const image = record.image || sample.image
  const existingOrder = orders.find((order) => order.diagnosisId === record.id)
  const active = subscription.status === 'activa'

  const handleDownload = () => {
    const content = [
      'AGROGEN PRECISION — Receta de bio-insumo',
      'Un médico para los cultivos',
      '',
      `Diagnóstico: ${sample.disease} (${sample.scientificName})`,
      `Cultivo: ${sample.crop}`,
      `Parcela: ${record.plot}`,
      `Severidad: ${sample.severity} (${sample.severityScore}%)`,
      `Confianza IA: ${sample.confidence}%`,
      `Fecha: ${formatDate(record.date, { year: 'numeric' })}`,
      '',
      `BIO-INSUMO: ${sample.bioinput.name}`,
      `Tipo: ${sample.bioinput.type}`,
      '',
      'INGREDIENTES',
      ...sample.bioinput.ingredients.map((item) => `- ${item.name}: ${item.qty}`),
      '',
      'PREPARACIÓN',
      sample.bioinput.prep,
      '',
      `Dosis: ${sample.bioinput.dose}`,
      `Frecuencia: ${sample.bioinput.frequency}`,
      `Cobertura: ${sample.bioinput.coverage}`,
      `Precio: ${formatQ(sample.bioinput.price)}`,
      '',
      'MANEJO PREVENTIVO',
      ...sample.prevention.map((item) => `- ${item}`),
      '',
      'Documento generado por la demo de AgroGen Precision.',
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `AgroGen-${sample.id}-receta.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    pushToast({
      tone: 'success',
      title: 'Receta descargada',
      message: 'El archivo .txt incluye ingredientes, dosis y manejo preventivo.',
    })
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-forest-500/20 bg-forest-100/60 p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream-50">
            <CheckCircle2 className="size-4.5" />
          </span>
          <div>
            <p className="text-[11.5px] font-bold text-forest-950">Diagnóstico completado</p>
            <p className="text-[10px] text-forest-900/50">
              Guardado en tu historial · {record.plot} ·{' '}
              {formatDate(record.date, { year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onNew} className="btn btn-outline btn-sm bg-white">
            <RefreshCw className="size-3.5" />
            Nuevo diagnóstico
          </button>
          <Link to="/panel" className="btn btn-primary btn-sm">
            Ir a mi panel
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative min-h-[250px] overflow-hidden bg-forest-950 lg:min-h-[390px]">
            <img
              src={image}
              alt={`Muestra analizada de ${sample.crop}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-forest-950/35" />

            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="chip bg-forest-950/60 text-[9px] text-cream-50 backdrop-blur-md">
                <ScanLine className="size-2.5" />
                Muestra analizada
              </span>
              <span className="chip bg-white/85 text-[9px] text-forest-800 backdrop-blur-md">
                {sample.category}
              </span>
            </div>

            <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
              <div className="rounded-xl border border-white/15 bg-forest-950/50 p-3 backdrop-blur-md">
                <p className="text-[8px] font-bold tracking-[0.14em] text-forest-300 uppercase">
                  Confianza del modelo
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <CircularGauge value={sample.confidence} size={44} stroke={4.5} color="#95d5b2">
                    <span className="font-display text-[10px] font-extrabold text-cream-50">
                      {sample.confidence}%
                    </span>
                  </CircularGauge>
                  <div>
                    <p className="text-[10px] font-semibold text-cream-50">Mapeo MAGA</p>
                    <p className="text-[8.5px] text-cream-100/45">Modelo AgroGen v2.4</p>
                  </div>
                </div>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-[8.5px] font-semibold text-cream-100/70 backdrop-blur-md sm:flex">
                <ShieldCheck className="size-3 text-forest-300" />
                Caso guardado
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={sample.severity} />
              <span className={cx('chip', tone.chip)}>
                <span className={cx('size-1.5 rounded-full', tone.dot)} />
                {tone.label}
              </span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-3xl">
              {sample.disease}
            </h2>
            <p className="mt-0.5 text-[11px] text-forest-900/45 italic">{sample.scientificName}</p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-medium text-forest-900/55">
              <span className="flex items-center gap-1.5">
                <Leaf className="size-3.5 text-forest-600" />
                {sample.crop}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-forest-600" />
                {record.plot}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-forest-600" />
                {formatDate(record.date)}
              </span>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-forest-900/60">{sample.summary}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-forest-900/8 bg-cream-50 p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold tracking-[0.14em] text-forest-900/40 uppercase">
                    Severidad
                  </p>
                  <span className={cx('text-[10px] font-extrabold', tone.text)}>
                    {sample.severityScore} %
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-forest-900/8">
                  <div
                    className={cx('h-full rounded-full', tone.bar)}
                    style={{ width: `${sample.severityScore}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[9px] text-forest-900/40">
                  Área foliar afectada estimada
                </p>
              </div>
              <div className="rounded-2xl border border-forest-900/8 bg-cream-50 p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold tracking-[0.14em] text-forest-900/40 uppercase">
                    Compatibilidad
                  </p>
                  <span className="text-[10px] font-extrabold text-forest-700">
                    {sample.confidence} %
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-forest-900/8">
                  <div
                    className="h-full rounded-full bg-forest-500"
                    style={{ width: `${sample.confidence}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[9px] text-forest-900/40">
                  Coincidencia con mapeo MAGA
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" onClick={handleDownload} className="btn btn-outline btn-sm">
                <Download className="size-3.5" />
                Descargar receta
              </button>
              <button
                type="button"
                onClick={() =>
                  pushToast({
                    tone: 'info',
                    title: 'Enlace copiado',
                    message: 'En la app real podrías compartir este diagnóstico con tu cooperativa.',
                  })
                }
                className="btn btn-ghost btn-sm"
              >
                Compartir
              </button>
              <span className="ml-auto hidden text-[9px] text-forest-900/35 sm:inline">
                ID {record.id.replace('dg-', 'DG-')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="icon-tile bg-forest-900 text-cream-50">
                <FlaskConical className="size-5" />
              </span>
              <div>
                <p className="text-[9px] font-bold tracking-[0.14em] text-forest-600 uppercase">
                  Recomendación exclusiva
                </p>
                <h3 className="font-display text-[16px] font-bold tracking-tight text-forest-950">
                  {sample.bioinput.name}
                </h3>
                <p className="text-[10px] text-forest-900/45">{sample.bioinput.type}</p>
              </div>
            </div>
            <span className="chip bg-forest-100 text-[9px] text-forest-700">
              <BadgeCheck className="size-2.5" />
              Validado
            </span>
          </div>

          <p className="mt-3 text-[11.5px] leading-relaxed text-forest-900/60">
            {sample.bioinput.description}
          </p>

          <div className="mt-4">
            <p className="text-[9px] font-bold tracking-[0.14em] text-forest-900/40 uppercase">
              Ingredientes de tu fórmula
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {sample.bioinput.ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex items-center justify-between gap-2 rounded-xl border border-forest-900/8 bg-cream-50 px-3 py-2"
                >
                  <span className="flex min-w-0 items-center gap-2 text-[10.5px] font-medium text-forest-950">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    <span className="truncate">{ingredient.name}</span>
                  </span>
                  <span className="shrink-0 text-[10px] font-bold text-forest-700 tabular-nums">
                    {ingredient.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-maize-600/20 bg-maize-200/40 p-3.5">
            <p className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] text-maize-700 uppercase">
              <Sparkles className="size-3" />
              Preparación
            </p>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-forest-900/65">
              {sample.bioinput.prep}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: 'Dosis', value: sample.bioinput.dose, icon: Sprout },
              { label: 'Frecuencia', value: sample.bioinput.frequency, icon: Clock },
              { label: 'Cobertura', value: sample.bioinput.coverage, icon: Leaf },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-xl bg-forest-900/[0.035] p-2.5">
                  <p className="flex items-center gap-1 text-[8px] font-bold tracking-wide text-forest-900/40 uppercase">
                    <Icon className="size-2.5" />
                    {item.label}
                  </p>
                  <p className="mt-1 text-[9.5px] leading-snug font-semibold text-forest-950">
                    {item.value}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-4 rounded-2xl bg-forest-950 p-4 text-cream-50">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[8.5px] font-bold tracking-[0.14em] text-forest-300 uppercase">
                  Lote personalizado
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="font-display text-2xl font-extrabold">{formatQ(sample.bioinput.price)}</p>
                  <span className="text-[9.5px] text-cream-100/40">· {sample.bioinput.coverage}</span>
                </div>
              </div>
              <span className="chip bg-white/10 text-[9px] text-cream-100/70">
                <Clock className="size-2.5" />
                Listo en {sample.bioinput.readyIn}
              </span>
            </div>

            {existingOrder ? (
              <Link to="/panel" className="btn btn-amber btn-md mt-3 w-full">
                <PackageCheck className="size-4" />
                Pedido {existingOrder.id} · {orderStatusLabel[existingOrder.status]}
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => requestBioinput(record)}
                className="btn btn-amber btn-md mt-3 w-full"
              >
                <Truck className="size-4" />
                Solicitar envío del bio-insumo
                <ArrowRight className="size-4" />
              </button>
            )}
            <p className="mt-2 flex items-center justify-center gap-1 text-center text-[8.5px] text-cream-100/35">
              <ShieldCheck className="size-2.5" />
              {active
                ? 'Tu plan Precisión incluye 1 bio-insumo al mes. El envío se coordina al confirmar.'
                : 'Pago contra entrega · fabricado por AgroGen en Chimaltenango.'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                  <Leaf className="size-4" />
                </span>
                <h3 className="font-display text-[13px] font-bold text-forest-950">Plan Precisión</h3>
              </div>
              <span
                className={cx(
                  'chip text-[8.5px]',
                  active ? 'bg-forest-100 text-forest-700' : 'bg-maize-200 text-maize-700',
                )}
              >
                {active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-forest-950">
              {formatQ(subscription.price)}
              <span className="text-[10px] font-medium text-forest-900/40"> / mes</span>
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-forest-900/50">
              Diagnósticos ilimitados, bio-insumo mensual y envío a tu parcela.
            </p>
            <button
              type="button"
              onClick={() => (active ? renewSubscription() : activateSubscription())}
              className="btn btn-primary btn-sm mt-3 w-full"
            >
              <RefreshCw className="size-3.5" />
              {active ? 'Renovar mi plan' : 'Activar plan'}
            </button>
            {active ? (
              <p className="mt-2 text-center text-[8.5px] text-forest-900/35">
                Renueva en {daysUntil(subscription.renewsAt)} días · {formatDate(subscription.renewsAt)}
              </p>
            ) : null}
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-earth-300 text-[10px] font-bold text-earth-900">
                AC
              </span>
              <div>
                <p className="text-[11.5px] font-bold text-forest-950">Ing. Ana Cotí</p>
                <p className="text-[9px] text-forest-900/45">Agrónoma senior · MAGA</p>
              </div>
            </div>
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-forest-900/55">
              ¿Dudas con la dosis o el momento de aplicación? Revisa tu caso con un especialista
              antes de aplicar.
            </p>
            <button
              type="button"
              onClick={() =>
                pushToast({
                  tone: 'success',
                  title: 'Solicitud de asesoría enviada',
                  message: 'La Ing. Ana Cotí revisará tu diagnóstico y te escribirá por WhatsApp hoy.',
                })
              }
              className="btn btn-soft btn-sm mt-3 w-full"
            >
              <MessageCircle className="size-3.5" />
              Hablar con un agrónomo
            </button>
          </div>

          <div className="rounded-2xl border border-forest-900/8 bg-cream-50/70 p-3.5">
            <p className="flex items-start gap-2 text-[9px] leading-relaxed text-forest-900/45">
              <ShieldCheck className="mt-0.5 size-3 shrink-0 text-forest-500" />
              Este diagnóstico es demostrativo y no sustituye la validación de un ingeniero
              agrónomo. Sigue siempre las indicaciones de manejo del producto.
            </p>
          </div>
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-display text-[13.5px] font-bold text-forest-950">
              <span className="flex size-6 items-center justify-center rounded-lg bg-clay-100 text-clay-600">
                <ScanLine className="size-3" />
              </span>
              Síntomas compatibles
            </h3>
            <ul className="mt-3 space-y-2">
              {sample.symptoms.map((symptom) => (
                <li
                  key={symptom}
                  className="flex items-start gap-2 text-[10.5px] leading-snug text-forest-900/60"
                >
                  <span className={cx('mt-1.5 size-1.5 shrink-0 rounded-full', tone.dot)} />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-display text-[13.5px] font-bold text-forest-950">
              <span className="flex size-6 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                <Leaf className="size-3" />
              </span>
              Manejo y prevención
            </h3>
            <ul className="mt-3 space-y-2">
              {sample.prevention.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-[10.5px] leading-snug text-forest-900/60"
                >
                  <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-forest-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
