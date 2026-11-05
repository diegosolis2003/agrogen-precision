import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cx } from '../../lib/utils'

const faqs = [
  {
    q: '¿El primer diagnóstico es realmente gratis?',
    a: 'Sí. Subes la foto, la IA analiza el cultivo y recibes el resultado con la receta recomendada sin pagar ni dejar tarjeta. Solo necesitas una cuenta para guardar el historial.',
  },
  {
    q: '¿Qué tan precisa es la inteligencia artificial?',
    a: 'El modelo tiene una confianza promedio del 96 % en las muestras del mapeo MAGA. Cuando la confianza baja, el caso se escala automáticamente a un ingeniero agrónomo antes de recomendar un bio-insumo.',
  },
  {
    q: '¿Los bio-insumos son seguros para mi familia?',
    a: 'Trabajamos con microorganismos benéficos, extractos botánicos y vermicompost. Cada fórmula se valida por un agrónomo y se entrega con instrucciones de manejo, dosis y periodo de carencia.',
  },
  {
    q: 'No tengo una foto buena, ¿qué puedo hacer?',
    a: 'Puedes elegir una de las muestras precargadas para ver cómo funciona el diagnóstico. Si tu caso es distinto, escríbenos por WhatsApp y coordinamos una visita o una foto guiada.',
  },
  {
    q: '¿A qué zonas entregan los bio-insumos?',
    a: 'Entregamos en Chimaltenango, Quiché, Sacatepéquez y Sololá en 48 horas. Al resto de Guatemala llega en un máximo de 72 horas por Guatex, con seguimiento desde tu panel.',
  },
  {
    q: '¿Puedo cancelar la suscripción cuando quiera?',
    a: 'Sí. El plan es mensual y sin contrato. Puedes desactivar la renovación desde tu panel y mantienes el acceso hasta el final del periodo pagado.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const { pushToast } = useApp()

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="eyebrow">
              <HelpCircle className="size-3.5" />
              Preguntas frecuentes
            </span>
            <h2 className="mt-3 max-w-sm font-display text-3xl font-extrabold tracking-[-0.035em] text-forest-950 sm:text-4xl">
              Lo que todo agricultor pregunta antes de empezar.
            </h2>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-forest-900/55">
              ¿No encuentras tu respuesta? Nuestro equipo atiende de lunes a sábado, de 6 a 18 h.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() =>
                  pushToast({
                    tone: 'success',
                    title: 'Abriendo WhatsApp',
                    message: 'En la app real te conectaríamos con un agrónomo al +502 5555 0182.',
                  })
                }
                className="btn btn-primary btn-md"
              >
                <MessageCircle className="size-4" />
                Hablar por WhatsApp
              </button>
              <a href="tel:+50255550182" className="btn btn-outline btn-md">
                <Phone className="size-4" />
                +502 5555 0182
              </a>
            </div>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = open === index
              return (
                <div
                  key={faq.q}
                  className={cx(
                    'overflow-hidden rounded-2xl border transition-all duration-300',
                    isOpen
                      ? 'border-forest-900/15 bg-white shadow-soft'
                      : 'border-forest-900/8 bg-white/55 hover:bg-white/80',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5"
                  >
                    <span
                      className={cx(
                        'flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition',
                        isOpen
                          ? 'bg-forest-900 text-cream-50'
                          : 'bg-forest-100 text-forest-700',
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[12.5px] font-bold text-forest-950 sm:text-[13px]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cx(
                        'size-4 shrink-0 text-forest-900/40 transition-transform duration-300',
                        isOpen ? 'rotate-180 text-forest-700' : '',
                      )}
                    />
                  </button>
                  <div
                    className={cx(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 pl-13 text-[12px] leading-relaxed text-forest-900/55 sm:px-5 sm:pl-14">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
