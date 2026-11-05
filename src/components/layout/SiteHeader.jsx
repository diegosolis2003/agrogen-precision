import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LayoutDashboard, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#bioinsumos', label: 'Bio-insumos' },
  { href: '#planes', label: 'Planes' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-forest-900/6 bg-cream-100/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="AgroGen Precision, inicio" className="rounded-xl">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-forest-900/70 transition hover:bg-forest-900/5 hover:text-forest-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/panel" className="btn btn-ghost btn-sm">
            <LayoutDashboard className="size-4" />
            Mi panel
          </Link>
          <Link to="/diagnostico" className="btn btn-primary btn-sm">
            Diagnosticar gratis
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/diagnostico" className="btn btn-primary btn-sm">
            Diagnóstico
            <ArrowRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center rounded-full border border-forest-900/10 bg-white/70 text-forest-900"
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-forest-900/6 bg-cream-50 px-5 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Navegación móvil">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-forest-900/80 hover:bg-forest-900/5"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/panel"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-xl bg-forest-100 px-3 py-2.5 text-sm font-semibold text-forest-900"
            >
              <LayoutDashboard className="size-4" /> Mi panel
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
