import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Download, Leaf, ScanLine, ShieldCheck, Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import AppSidebar from './AppSidebar'
import AppTopbar from './AppTopbar'
import BottomNav from './BottomNav'
import MobileTopBar from './MobileTopBar'
import PhoneStatusBar from './PhoneStatusBar'
import SiteHeader from './SiteHeader'

function MobileShell({ children }) {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-forest-950 pt-16 sm:pt-20 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(82,183,136,0.18),transparent_55%),radial-gradient(ellipse_at_80%_85%,rgba(244,201,93,0.09),transparent_50%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.055]" />
      <div className="pointer-events-none absolute top-1/3 -left-20 size-72 rounded-full bg-forest-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 size-80 rounded-full bg-maize-500/8 blur-3xl" />

      <aside className="pointer-events-none absolute top-1/2 left-[6%] hidden w-[210px] -translate-y-1/2 xl:block">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-maize-400 uppercase">
          <span className="size-1.5 rounded-full bg-maize-400" />
          Mobile-first
        </span>
        <h2 className="mt-3 font-display text-[26px] leading-tight font-bold text-cream-50">
          El campo en tu bolsillo.
        </h2>
        <p className="mt-3 text-[12px] leading-relaxed text-cream-100/50">
          Experiencia móvil completa simulada en un dispositivo. Toca, sube una foto y recibe tu
          diagnóstico.
        </p>
        <ul className="mt-5 space-y-2.5">
          {[
            { icon: ScanLine, text: 'Diagnóstico en menos de 3 min' },
            { icon: Leaf, text: 'Receta de bio-insumo a la medida' },
            { icon: ShieldCheck, text: 'Datos guardados en tu dispositivo' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.text}
                className="flex items-center gap-2.5 text-[11px] font-medium text-cream-100/65"
              >
                <span className="flex size-7 items-center justify-center rounded-lg bg-white/6 text-forest-300">
                  <Icon className="size-3.5" />
                </span>
                {item.text}
              </li>
            )
          })}
        </ul>
      </aside>

      <aside className="pointer-events-none absolute top-1/2 right-[6%] hidden w-[190px] -translate-y-1/2 xl:block">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
          <span className="flex size-9 items-center justify-center rounded-xl bg-maize-500 text-forest-950">
            <Download className="size-4" />
          </span>
          <p className="mt-3 text-[12px] font-bold text-cream-50">PWA instalable</p>
          <p className="mt-1.5 text-[10.5px] leading-relaxed text-cream-100/45">
            Agrégala a tu pantalla de inicio desde el navegador. Funciona sin conexión y guarda tu
            historial localmente.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Offline', 'iOS + Android', 'Demo'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-semibold text-cream-100/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/8 px-3 py-2.5">
          <Sparkles className="size-3.5 text-maize-400" />
          <p className="text-[10px] leading-snug text-cream-100/45">
            Toggle de vista arriba para explorar el panel web.
          </p>
        </div>
      </aside>

      <div className="relative z-10 w-full sm:w-auto">
        <div className="relative h-[calc(100dvh-4rem)] w-full overflow-hidden bg-cream-100 sm:h-[min(860px,calc(100dvh-7rem))] sm:w-[420px] sm:rounded-[3rem] sm:border-[9px] sm:border-[#081510] sm:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] sm:ring-1 sm:ring-white/10">
          <div className="flex h-full flex-col overflow-hidden sm:rounded-[2.35rem]">
            <PhoneStatusBar />
            <MobileTopBar />
            <div
              id="phone-scroll"
              className="no-scrollbar flex-1 overflow-y-auto overscroll-contain bg-cream-100"
            >
              {children}
            </div>
            <BottomNav />
          </div>
          {isLanding ? (
            <span className="pointer-events-none absolute bottom-24 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-forest-950/15" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const { viewMode } = useApp()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const phone = document.getElementById('phone-scroll')
    if (phone) phone.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, viewMode])

  return null
}

export default function AppShell({ children }) {
  const { isMobileView } = useApp()
  const { pathname } = useLocation()
  const isPublic = pathname === '/'

  return (
    <>
      <ScrollToTop />
      {isMobileView ? (
        <MobileShell>{children}</MobileShell>
      ) : isPublic ? (
        <div className="min-h-dvh bg-cream-100">
          <SiteHeader />
          {children}
        </div>
      ) : (
        <div className="min-h-dvh bg-cream-100">
          <AppSidebar />
          <div className="lg:pl-72">
            <AppTopbar />
            {children}
          </div>
        </div>
      )}
    </>
  )
}
