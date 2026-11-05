import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { asset } from '../lib/utils'

const AppContext = createContext(null)

const DATA_KEY = 'agrogen.precision.v1'
const VIEW_KEY = 'agrogen.precision.view'
const DAY = 86_400_000

const offsetDate = (days) => new Date(Date.now() + days * DAY).toISOString()

const buildSeed = () => ({
  profile: {
    name: 'Diego Solís',
    role: 'Productor · 3 parcelas',
    cooperative: 'Cooperativa El Valle',
    location: 'Chimaltenango, Guatemala',
    phone: '+502 5555 0182',
    email: 'diego@agrogen.gt',
  },
  subscription: {
    status: 'activa',
    plan: 'Precisión Mensual',
    price: 150,
    startedAt: offsetDate(-12),
    renewsAt: offsetDate(18),
    autoRenew: true,
    payments: 4,
  },
  diagnostics: [
    {
      id: 'dg-seed-1',
      sampleId: 'tizon-temprano',
      crop: 'Tomate',
      disease: 'Tizón temprano',
      category: 'Hongo',
      severity: 'Alta',
      severityScore: 78,
      confidence: 96,
      image: asset('/samples/tizon-temprano.svg'),
      date: offsetDate(-2),
      plot: 'Parcela La Esperanza',
      bioinputName: 'Bio-Fungicida Tri-Guard',
      bioinputPrice: 145,
      bioinputType: 'Fungicida biológico',
    },
    {
      id: 'dg-seed-2',
      sampleId: 'roya-cafe',
      crop: 'Café',
      disease: 'Roya del café',
      category: 'Hongo',
      severity: 'Media',
      severityScore: 54,
      confidence: 94,
      image: asset('/samples/roya-cafe.svg'),
      date: offsetDate(-9),
      plot: 'Finca El Mirador',
      bioinputName: 'Bio-Royina Café',
      bioinputPrice: 165,
      bioinputType: 'Fungicida preventivo-curativo',
    },
    {
      id: 'dg-seed-3',
      sampleId: 'pulgon-tomate',
      crop: 'Tomate',
      disease: 'Pulgón verde',
      category: 'Plaga',
      severity: 'Media',
      severityScore: 46,
      confidence: 92,
      image: asset('/samples/pulgon-tomate.svg'),
      date: offsetDate(-21),
      plot: 'Parcela La Esperanza',
      bioinputName: 'Bio-Repelente Neem-Ajo',
      bioinputPrice: 120,
      bioinputType: 'Insecticida botánico',
    },
  ],
  orders: [
    {
      id: 'AG-2481',
      diagnosisId: 'dg-seed-1',
      item: 'Bio-Fungicida Tri-Guard',
      type: 'Fungicida biológico',
      crop: 'Tomate',
      plot: 'Parcela La Esperanza',
      price: 145,
      status: 'en_camino',
      placedAt: offsetDate(-4),
      eta: offsetDate(1),
      tracking: 'Guatex · GT-8841932',
    },
    {
      id: 'AG-2430',
      diagnosisId: 'dg-seed-2',
      item: 'Bio-Royina Café',
      type: 'Fungicida preventivo-curativo',
      crop: 'Café',
      plot: 'Finca El Mirador',
      price: 165,
      status: 'entregado',
      placedAt: offsetDate(-18),
      eta: offsetDate(-15),
      deliveredAt: offsetDate(-15),
      tracking: 'Guatex · GT-8810447',
    },
  ],
})

const loadData = () => {
  try {
    const stored = window.localStorage.getItem(DATA_KEY)
    if (!stored) return buildSeed()
    const parsed = JSON.parse(stored)
    return { ...buildSeed(), ...parsed }
  } catch {
    return buildSeed()
  }
}

const loadViewMode = () => {
  try {
    const stored = window.localStorage.getItem(VIEW_KEY)
    if (stored === 'mobile' || stored === 'desktop') return stored
  } catch {
    // noop
  }
  return window.innerWidth < 1024 ? 'mobile' : 'desktop'
}

export function AppProvider({ children }) {
  const [data, setData] = useState(loadData)
  const [viewMode, setViewMode] = useState(loadViewMode)
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    try {
      window.localStorage.setItem(DATA_KEY, JSON.stringify(data))
    } catch {
      // storage may be unavailable in private mode
    }
  }, [data])

  useEffect(() => {
    try {
      window.localStorage.setItem(VIEW_KEY, viewMode)
    } catch {
      // noop
    }
  }, [viewMode])

  const pushToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((prev) => [...prev, { id, tone: 'success', ...toast }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, 4600)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addDiagnosis = useCallback((sample, options = {}) => {
    const record = {
      id: `dg-${Date.now()}`,
      sampleId: sample.id,
      crop: sample.crop,
      disease: sample.disease,
      category: sample.category,
      severity: sample.severity,
      severityScore: sample.severityScore,
      confidence: sample.confidence,
      image: options.image || sample.image,
      date: new Date().toISOString(),
      plot: options.plot || 'Parcela La Esperanza',
      bioinputName: sample.bioinput.name,
      bioinputPrice: sample.bioinput.price,
      bioinputType: sample.bioinput.type,
    }
    setData((prev) => ({
      ...prev,
      diagnostics: [record, ...prev.diagnostics],
    }))
    return record
  }, [])

  const requestBioinput = useCallback(
    (diagnosis) => {
      const order = {
        id: `AG-${Math.floor(2500 + Math.random() * 7400)}`,
        diagnosisId: diagnosis.id,
        item: diagnosis.bioinputName,
        type: diagnosis.bioinputType,
        crop: diagnosis.crop,
        plot: diagnosis.plot,
        price: diagnosis.bioinputPrice,
        status: 'preparando',
        placedAt: new Date().toISOString(),
        eta: offsetDate(3),
        tracking: 'Asignando guía logística',
      }
      setData((prev) => ({
        ...prev,
        orders: [order, ...prev.orders],
      }))

      pushToast({
        tone: 'success',
        title: 'Bio-insumo solicitado',
        message: `Pedido ${order.id} en preparación. Estimado de entrega: ${new Intl.DateTimeFormat(
          'es-GT',
          { day: 'numeric', month: 'short' },
        ).format(new Date(order.eta))}.`,
      })

      window.setTimeout(() => {
        setData((prev) => ({
          ...prev,
          orders: prev.orders.map((item) =>
            item.id === order.id && item.status === 'preparando'
              ? {
                  ...item,
                  status: 'en_camino',
                  tracking: 'Guatex · GT-8892201',
                }
              : item,
          ),
        }))
      }, 7000)

      return order
    },
    [pushToast],
  )

  const advanceOrder = useCallback((orderId) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((order) => {
        if (order.id !== orderId) return order
        if (order.status === 'preparando') {
          return { ...order, status: 'en_camino', tracking: 'Guatex · GT-8892201' }
        }
        if (order.status === 'en_camino') {
          return { ...order, status: 'entregado', deliveredAt: new Date().toISOString() }
        }
        return order
      }),
    }))
  }, [])

  const renewSubscription = useCallback(() => {
    setData((prev) => {
      const base = new Date(prev.subscription.renewsAt).getTime()
      const from = Math.max(base, Date.now())
      return {
        ...prev,
        subscription: {
          ...prev.subscription,
          status: 'activa',
          renewsAt: new Date(from + 30 * DAY).toISOString(),
          payments: (prev.subscription.payments || 0) + 1,
        },
      }
    })
    pushToast({
      tone: 'success',
      title: 'Suscripción renovada',
      message: 'Tu plan Precisión Mensual está activo por 30 días más. Diagnósticos ilimitados habilitados.',
    })
  }, [pushToast])

  const activateSubscription = useCallback(() => {
    setData((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status: 'activa',
        startedAt: prev.subscription.startedAt || new Date().toISOString(),
        renewsAt: new Date(Date.now() + 30 * DAY).toISOString(),
        autoRenew: true,
        payments: (prev.subscription.payments || 0) + 1,
      },
    }))
    pushToast({
      tone: 'success',
      title: 'Plan Precisión activado',
      message: 'Bienvenido. Diagnósticos ilimitados, recetas a la medida y envíos incluidos desde hoy.',
    })
  }, [pushToast])

  const toggleAutoRenew = useCallback(() => {
    const enabled = !data.subscription.autoRenew
    setData((prev) => ({
      ...prev,
      subscription: { ...prev.subscription, autoRenew: enabled },
    }))
    pushToast({
      tone: enabled ? 'success' : 'info',
      title: enabled ? 'Renovación automática activada' : 'Renovación automática desactivada',
      message: enabled
        ? 'Tu plan se renovará automáticamente al final del periodo.'
        : 'Mantendrás acceso hasta el final de tu periodo actual.',
    })
  }, [data.subscription.autoRenew, pushToast])

  const value = useMemo(
    () => ({
      ...data,
      viewMode,
      isMobileView: viewMode === 'mobile',
      setViewMode,
      toggleViewMode: () => setViewMode((mode) => (mode === 'mobile' ? 'desktop' : 'mobile')),
      toasts,
      pushToast,
      dismissToast,
      addDiagnosis,
      requestBioinput,
      advanceOrder,
      renewSubscription,
      activateSubscription,
      toggleAutoRenew,
    }),
    [
      data,
      viewMode,
      toasts,
      pushToast,
      dismissToast,
      addDiagnosis,
      requestBioinput,
      advanceOrder,
      renewSubscription,
      activateSubscription,
      toggleAutoRenew,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}
