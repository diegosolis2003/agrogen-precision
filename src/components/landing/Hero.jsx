import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  MapPin,
  Play,
  ScanLine,
  Sparkles,
  Star,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { asset, cx } from '../../lib/utils'
import CircularGauge from '../ui/CircularGauge'

const trust = ['MI', 'CM', 'RC']

const stats = [
  { value: '1,247', label: 'diagnósticos realizados' },
  { value: '96 %', label: 'confianza del modelo' },
  { value: '48 h', label: 'para tu bio-insumo' },
  { value: 'Q150', label: 'al mes, todo incluido' },
]

export default function Hero() {
  const { isMobileView } = useApp()

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_10%,rgba(82,183,136,0.14),transparent_50%),radial-gradient(ellipse_at_-5%_60%,rgba(244,201,93,0.12),transparent_45%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-8 pb-14 sm:px-8 sm:pt-12 lg:pt-16 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
          <div className={cx('relative z-10', isMobileView ? 'pt-1' : '')}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-white/70 px-3 py-1.5 text-[10.5px] font-semibold text-forest-800 shadow-sm backdrop-blur sm:text-[11px]">
              <span className="flex size-5 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Sparkles className="size-3" />
              </span>
              IA agrícola + mapeo del MAGA
              <span className="mx-0.5 h-3 w-px bg-forest-900/10" />
              <MapPin className="size-3 text-forest-500" />
              Guatemala
            </span>

            <h1
              className={cx(
                'mt-5 font-display font-extrabold tracking-[-0.045em] text-forest-950',
                isMobileView ? 'text-[2.55rem] leading-[1.03]' : 'text-5xl leading-[1.02] lg:text-6xl',
              )}
            >
              Un médico para{' '}
              <span className="relative ml-1 inline-block sm:ml-3">
                <span className="text-gradient">los cultivos</span>
                <svg
                  viewBox="0 0 300 18"
                  className="absolute -bottom-2 left-0 h-3 w-full text-maize-500"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13c58-9 116-10 174-5 38 3 76 0 120-5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h1>

            <p
              className={cx(
                'mt-6 text-forest-900/65',
                isMobileView ? 'text-[14.5px] leading-relaxed' : 'max-w-xl text-lg leading-relaxed',
              )}
            >
              Toma una foto de tu hoja. En minutos sabes qué tiene tu cultivo y recibes un{' '}
              <strong className="font-semibold text-forest-900">bio-insumo hecho a la medida</strong>{' '}
              para tu parcela, sin químicos que dañen tu tierra.
            </p>

            <div className={cx('mt-7 flex gap-3', isMobileView ? 'flex-col' : 'flex-wrap')}>
              <Link to="/diagnostico" className="btn btn-primary btn-lg group">
                <ScanLine className="size-5" />
                Diagnosticar mi cultivo gratis
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href="#como-funciona" className="btn btn-outline btn-lg">
                <span className="flex size-6 items-center justify-center rounded-full bg-forest-900 text-cream-50">
                  <Play className="size-3 fill-current" />
                </span>
                Ver cómo funciona
              </a>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-forest-900/45">
              <CheckCircle2 className="size-3.5 text-forest-500" />
              Primer diagnóstico gratis · Sin tarjeta de crédito
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="flex -space-x-2">
                {trust.map((initials, index) => (
                  <span
                    key={initials}
                    className={cx(
                      'flex size-8 items-center justify-center rounded-full border-2 border-cream-100 text-[9px] font-bold text-forest-950',
                      ['bg-forest-300', 'bg-maize-400', 'bg-earth-300'][index],
                    )}
                  >
                    {initials}
                  </span>
                ))}
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-cream-100 bg-forest-900 text-[8px] font-bold text-cream-50">
                  +97
                </span>
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-maize-600">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3 fill-current" />
                  ))}
                  <span className="ml-1 text-[11px] font-bold text-forest-950">4.8/5</span>
                </div>
                <p className="text-[10.5px] text-forest-900/50">
                  100+ agricultores en Chimaltenango y Quiché
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-[470px]">
            <div className="absolute -inset-5 -rotate-2 rounded-[3rem] border border-forest-900/8 bg-forest-100/50" />
            <div className="absolute -inset-1 rotate-1 rounded-[2.6rem] border border-forest-900/6 bg-cream-50" />
            <div className="pointer-events-none absolute -top-8 -right-6 size-28 rounded-full bg-maize-400/25 blur-2xl" />

            <div className="relative animate-fade-up rounded-[2.25rem] border border-forest-900/10 bg-white p-2.5 shadow-lift">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-forest-950">
                <img
                  src={asset('/samples/tizon-temprano.svg')}
                  alt="Hoja de tomate con síntomas de tizón temprano"
                  className="aspect-[5/4.5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/25" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="chip bg-forest-950/70 text-cream-50 backdrop-blur-md">
                    <span className="size-1.5 animate-pulse rounded-full bg-forest-400" />
                    IA en vivo
                  </span>
                  <span className="chip bg-white/85 text-forest-900 backdrop-blur-md">
                    Mapeo MAGA
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/15 text-cream-50 backdrop-blur-md">
                  <ScanLine className="size-4" />
                </div>

                <div className="absolute right-4 left-4 h-px animate-scan bg-gradient-to-r from-transparent via-forest-200 to-transparent shadow-[0_0_18px_2px_rgba(149,213,178,0.55)]" />

                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/40 bg-cream-50/95 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold tracking-[0.16em] text-forest-600 uppercase">
                        Resultado del análisis
                      </p>
                      <h3 className="mt-0.5 truncate font-display text-[17px] font-bold text-forest-950">
                        Tizón temprano
                      </h3>
                      <p className="text-[10.5px] text-forest-900/50">
                        Tomate · Alternaria solani
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="chip bg-clay-100 px-2 py-0.5 text-[9px] text-clay-600">
                          <span className="size-1 rounded-full bg-clay-500" />
                          Severidad alta
                        </span>
                        <span className="chip bg-forest-100 px-2 py-0.5 text-[9px] text-forest-700">
                          Hongo
                        </span>
                      </div>
                    </div>
                    <CircularGauge value={96} size={62} stroke={6} color="#2d6a4f">
                      <span className="font-display text-[15px] font-extrabold text-forest-950">
                        96%
                      </span>
                      <span className="text-[7px] font-semibold tracking-wide text-forest-900/45 uppercase">
                        confianza
                      </span>
                    </CircularGauge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 px-2 py-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="icon-tile size-9 rounded-xl bg-forest-100 text-forest-700">
                    <FlaskConical className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11.5px] font-bold text-forest-950">
                      Bio-Fungicida Tri-Guard
                    </p>
                    <p className="truncate text-[9.5px] text-forest-900/45">
                      Receta personalizada · lista en 48 h
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-[15px] font-extrabold text-forest-950">Q145</p>
                  <p className="text-[9px] text-forest-900/40">0.5 manzana</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-3 hidden animate-float items-center gap-2.5 rounded-2xl border border-forest-900/10 bg-white p-3 shadow-lift sm:flex">
              <span className="flex size-9 items-center justify-center rounded-xl bg-maize-400 text-forest-950">
                <FlaskConical className="size-4" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold text-forest-950">Bio-insumo listo</p>
                <p className="text-[9px] text-forest-900/45">Elaborado por agrónomos</p>
              </div>
            </div>

            <div className="absolute -top-5 -right-3 hidden animate-float-slow items-center gap-2 rounded-2xl border border-forest-900/10 bg-forest-950 px-3 py-2.5 text-cream-50 shadow-lift sm:flex">
              <div className="flex -space-x-1.5">
                <span className="size-2 rounded-full bg-forest-400" />
                <span className="size-2 rounded-full bg-maize-400" />
              </div>
              <p className="text-[10px] font-semibold">
                <span className="text-forest-300">1,247</span> análisis este año
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-forest-900/8 bg-forest-900/8 sm:mt-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-cream-50/85 px-4 py-4 backdrop-blur sm:px-6">
              <p className="font-display text-xl font-extrabold tracking-tight text-forest-950 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-forest-900/50 sm:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
