import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Camera,
  Download,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ScanLine,
  Sparkles,
} from 'lucide-react'
import Logo from '../ui/Logo'

const columns = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Diagnóstico IA', to: '/diagnostico' },
      { label: 'Mi panel', to: '/panel' },
      { label: 'Métricas', to: '/metricas' },
      { label: 'Planes', href: '#planes' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Bio-insumos', href: '#bioinsumos' },
      { label: 'Historias de campo', href: '#planes' },
      { label: 'Inversionistas', to: '/metricas' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(82,183,136,0.18),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(244,201,93,0.08),transparent_45%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <Leaf className="pointer-events-none absolute -top-20 -right-20 size-80 rotate-12 text-forest-500/5" />

      <div className="relative border-b border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="eyebrow text-forest-300">
                <Sparkles className="size-3.5" />
                Empieza hoy
              </span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Tu próximo diagnóstico puede
                <span className="text-forest-300"> salvar la cosecha.</span>
              </h2>
              <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-cream-100/50">
                Sube una foto, recibe tu diagnóstico y pide el bio-insumo que tu parcela necesita.
                El primero va por nuestra cuenta.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link to="/diagnostico" className="btn btn-amber btn-lg">
                <Camera className="size-5" />
                Diagnosticar gratis
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/panel" className="btn btn-outline btn-lg border-white/15 bg-white/5 text-cream-50 hover:bg-white/10">
                <ScanLine className="size-4" />
                Ver mi panel
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Logo theme="light" />
            <p className="mt-4 max-w-xs text-[11.5px] leading-relaxed text-cream-100/45">
              Un médico para los cultivos. Diagnóstico con IA y bio-insumos a la medida para
              pequeños y medianos agricultores de Centroamérica.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="chip border border-white/10 bg-white/5 text-[9px] text-cream-100/60">
                <Leaf className="size-2.5 text-forest-400" />
                Hecho en Guatemala
              </span>
              <span className="chip border border-white/10 bg-white/5 text-[9px] text-cream-100/60">
                <Download className="size-2.5 text-maize-400" />
                PWA instalable
              </span>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-cream-100/30">
              <MapPin className="size-3" />
              Chimaltenango, Guatemala · 14.6° N
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[9px] font-bold tracking-[0.18em] text-cream-100/35 uppercase">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-[11.5px] font-medium text-cream-100/60 transition hover:text-cream-50"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[11.5px] font-medium text-cream-100/60 transition hover:text-cream-50"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[9px] font-bold tracking-[0.18em] text-cream-100/35 uppercase">
              Contacto
            </h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href="tel:+50255550182"
                  className="flex items-center gap-2 text-[11.5px] font-medium text-cream-100/60 transition hover:text-cream-50"
                >
                  <Phone className="size-3.5 text-forest-400" />
                  +502 5555 0182
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@agrogen.gt"
                  className="flex items-center gap-2 text-[11.5px] font-medium text-cream-100/60 transition hover:text-cream-50"
                >
                  <Mail className="size-3.5 text-forest-400" />
                  hola@agrogen.gt
                </a>
              </li>
              <li className="flex items-start gap-2 text-[11.5px] leading-snug font-medium text-cream-100/60">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-forest-400" />
                Laboratorio y centro de operaciones, Chimaltenango
              </li>
            </ul>
            <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.04] p-3">
              <p className="text-[9.5px] leading-relaxed text-cream-100/40">
                Proyecto demostrativo de startup agrícola. Los datos de diagnóstico y pedidos son
                simulados y se guardan en tu navegador.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-cream-100/30">
            © 2026 AgroGen Precision · Demo funcional. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-medium text-cream-100/35">
            <span>Privacidad</span>
            <span>Términos</span>
            <span className="flex items-center gap-1">
              <span className="size-1 rounded-full bg-forest-400" />
              Guatemala · Centroamérica
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
