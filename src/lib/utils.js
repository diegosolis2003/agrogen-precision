export const cx = (...classes) => classes.filter(Boolean).join(' ')

export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`

export const formatQ = (value) =>
  `Q${Number(value).toLocaleString('es-GT', { maximumFractionDigits: 0 })}`

export const formatDate = (value, options = {}) => {
  if (!value) return '—'
  const date = new Date(value)
  return new Intl.DateTimeFormat('es-GT', {
    day: 'numeric',
    month: 'short',
    ...options,
  }).format(date)
}

export const formatLongDate = (value) => {
  if (!value) return '—'
  return new Intl.DateTimeFormat('es-GT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export const daysUntil = (value) => {
  const target = new Date(value)
  const now = new Date()
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000)
}

export const timeAgo = (value) => {
  const diff = Date.now() - new Date(value).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days <= 0) return 'Hoy'
  if (days === 1) return 'Ayer'
  if (days < 30) return `Hace ${days} días`
  const months = Math.floor(days / 30)
  return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`
}

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export const severityTone = (severity) => {
  switch (severity) {
    case 'Alta':
      return {
        chip: 'bg-clay-100 text-clay-600',
        dot: 'bg-clay-500',
        bar: 'bg-clay-500',
        text: 'text-clay-600',
        label: 'Atención prioritaria',
      }
    case 'Media':
      return {
        chip: 'bg-maize-200 text-maize-700',
        dot: 'bg-maize-600',
        bar: 'bg-maize-500',
        text: 'text-maize-700',
        label: 'Intervención temprana',
      }
    default:
      return {
        chip: 'bg-forest-100 text-forest-700',
        dot: 'bg-forest-500',
        bar: 'bg-forest-500',
        text: 'text-forest-700',
        label: 'Manejo preventivo',
      }
  }
}

export const orderSteps = [
  { key: 'preparando', label: 'En preparación', hint: 'Mezcla y control de calidad' },
  { key: 'en_camino', label: 'En camino', hint: 'Transporte a tu parcela' },
  { key: 'entregado', label: 'Entregado', hint: 'Listo para aplicar' },
]

export const orderStatusLabel = {
  preparando: 'En preparación',
  en_camino: 'En camino',
  entregado: 'Entregado',
}
