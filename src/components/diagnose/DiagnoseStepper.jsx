import { Check, FlaskConical, ScanLine, Upload } from 'lucide-react'
import { cx } from '../../lib/utils'

const steps = [
  { id: 1, label: 'Foto', hint: 'Sube o elige', icon: Upload },
  { id: 2, label: 'Análisis IA', hint: 'Mapeo MAGA', icon: ScanLine },
  { id: 3, label: 'Resultado', hint: 'Receta lista', icon: FlaskConical },
]

export default function DiagnoseStepper({ current }) {
  return (
    <div className="card mt-4 p-2.5 sm:p-3">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const done = current > step.id
          const active = current === step.id
          const Icon = step.icon
          return (
            <div key={step.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                <span
                  className={cx(
                    'flex size-8 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold transition-all sm:size-9',
                    done
                      ? 'bg-forest-100 text-forest-700'
                      : active
                        ? 'bg-forest-900 text-cream-50 shadow-soft'
                        : 'bg-forest-900/5 text-forest-900/35',
                  )}
                >
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : <Icon className="size-3.5" />}
                </span>
                <div className="min-w-0">
                  <p
                    className={cx(
                      'truncate text-[10.5px] font-bold sm:text-[11.5px]',
                      active || done ? 'text-forest-950' : 'text-forest-900/35',
                    )}
                  >
                    {step.label}
                  </p>
                  <p
                    className={cx(
                      'hidden truncate text-[9px] sm:block',
                      active || done ? 'text-forest-900/45' : 'text-forest-900/25',
                    )}
                  >
                    {step.hint}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className="mx-2 h-px flex-1 sm:mx-3">
                  <div
                    className={cx(
                      'h-full rounded-full transition-all duration-500',
                      current > step.id ? 'bg-forest-400' : 'bg-forest-900/10',
                    )}
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
