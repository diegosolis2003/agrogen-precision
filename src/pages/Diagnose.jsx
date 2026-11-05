import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { SAMPLES, UPLOAD_DIAGNOSIS } from '../data/catalog'
import { useApp } from '../context/AppContext'
import AnalyzingStep from '../components/diagnose/AnalyzingStep'
import DiagnoseStepper from '../components/diagnose/DiagnoseStepper'
import ResultStep from '../components/diagnose/ResultStep'
import UploadStep from '../components/diagnose/UploadStep'

const pageCopy = {
  upload: {
    title: '¿Qué le pasa a tu cultivo?',
    subtitle: 'Sube una foto o elige un caso de ejemplo. La IA hace el resto.',
  },
  analyzing: {
    title: 'Analizando tu cultivo',
    subtitle: 'Cruzando la imagen con el mapeo agroecológico del MAGA.',
  },
  result: {
    title: 'Diagnóstico y receta listos',
    subtitle: 'Revisa el resultado y solicita el bio-insumo hecho a la medida.',
  },
}

function scrollPageTop() {
  window.scrollTo({ top: 0, behavior: 'auto' })
  document.getElementById('phone-scroll')?.scrollTo({ top: 0, behavior: 'auto' })
}

export default function Diagnose() {
  const { isMobileView, diagnostics, addDiagnosis, pushToast } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [step, setStep] = useState('upload')
  const [selected, setSelected] = useState(null)
  const [customImage, setCustomImage] = useState(null)
  const [plot, setPlot] = useState('Parcela La Esperanza')
  const [target, setTarget] = useState(null)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const lastQueryRef = useRef(null)

  useEffect(() => {
    const queryKey = searchParams.toString()
    if (lastQueryRef.current === queryKey) return
    lastQueryRef.current = queryKey

    const historyId = searchParams.get('historial')
    if (historyId) {
      const record = diagnostics.find((item) => item.id === historyId)
      if (record) {
        const sample =
          SAMPLES.find((item) => item.id === record.sampleId) ||
          (record.sampleId === UPLOAD_DIAGNOSIS.id ? UPLOAD_DIAGNOSIS : null)
        if (sample) {
          setResult({
            sample: { ...sample, image: record.image || sample.image },
            record,
          })
          setStep('result')
          scrollPageTop()
          return
        }
      }
    }

    const sampleId = searchParams.get('muestra')
    if (sampleId) {
      const sample = SAMPLES.find((item) => item.id === sampleId)
      if (sample) {
        setSelected(sample)
        setCustomImage(null)
        setResult(null)
        setStep('upload')
        scrollPageTop()
        return
      }
    }

    setStep('upload')
    setResult(null)
    setTarget(null)
    setSelected(null)
    setCustomImage(null)
  }, [searchParams, diagnostics])

  useEffect(() => {
    if (step !== 'analyzing' || !target) return undefined

    let current = 0
    let completed = false
    let finishTimer

    const interval = window.setInterval(() => {
      current = Math.min(100, current + 1.4 + Math.random() * 2.6)
      setProgress(Math.round(current))

      if (current >= 100 && !completed) {
        completed = true
        window.clearInterval(interval)
        finishTimer = window.setTimeout(() => {
          const record = addDiagnosis(target.sample, {
            image: target.image,
            plot: target.plot,
          })
          setResult({
            sample: { ...target.sample, image: target.image },
            record,
          })
          setStep('result')
          scrollPageTop()
        }, 550)
      }
    }, 70)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(finishTimer)
    }
  }, [step, target, addDiagnosis])

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      pushToast({
        tone: 'warning',
        title: 'Formato no compatible',
        message: 'Sube una imagen JPG, PNG o HEIC de máximo 8 MB.',
      })
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      pushToast({
        tone: 'warning',
        title: 'La imagen es muy grande',
        message: 'El tamaño máximo es de 8 MB. Intenta con otra foto más ligera.',
      })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setCustomImage(String(reader.result))
      setSelected(null)
    }
    reader.onerror = () => {
      pushToast({
        tone: 'warning',
        title: 'No pudimos leer la foto',
        message: 'Intenta de nuevo o elige un caso de ejemplo mientras tanto.',
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSelectSample = (sample) => {
    setSelected(sample)
    if (sample) setCustomImage(null)
  }

  const handleAnalyze = () => {
    const baseSample = selected || UPLOAD_DIAGNOSIS
    const image = customImage || selected?.image
    if (!image) return
    setTarget({ sample: baseSample, image, plot })
    setProgress(0)
    setStep('analyzing')
    scrollPageTop()
  }

  const handleCancel = () => {
    setStep('upload')
    setTarget(null)
    setProgress(0)
    scrollPageTop()
  }

  const handleNew = () => {
    setSearchParams({}, { replace: true })
    setStep('upload')
    setResult(null)
    setTarget(null)
    setSelected(null)
    setCustomImage(null)
    setProgress(0)
    scrollPageTop()
  }

  const copy = pageCopy[step]
  const HeadingTag = isMobileView ? 'h1' : 'h2'

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4 pb-8 sm:px-8 sm:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">
              <Sparkles className="size-3.5" />
              Asistente de campo
            </span>
            <span className="chip border border-maize-600/20 bg-maize-200/60 text-[9px] text-maize-700">
              Primer diagnóstico gratis
            </span>
          </div>
          <HeadingTag
            className={
              isMobileView
                ? 'mt-1.5 font-display text-[25px] leading-tight font-extrabold tracking-[-0.035em] text-forest-950'
                : 'mt-1.5 font-display text-3xl font-extrabold tracking-[-0.04em] text-forest-950'
            }
          >
            {copy.title}
          </HeadingTag>
          <p className="mt-1 text-[11.5px] text-forest-900/50 sm:text-[13px]">{copy.subtitle}</p>
        </div>
        <div className="hidden items-center gap-2 rounded-2xl border border-forest-900/8 bg-white/60 px-3 py-2 sm:flex">
          <ShieldCheck className="size-4 text-forest-600" />
          <div>
            <p className="text-[9.5px] font-bold text-forest-950">Datos en tu dispositivo</p>
            <p className="text-[8.5px] text-forest-900/40">Historial guardado localmente</p>
          </div>
        </div>
      </div>

      <DiagnoseStepper current={step === 'upload' ? 1 : step === 'analyzing' ? 2 : 3} />

      {step === 'upload' ? (
        <UploadStep
          selected={selected}
          onSelect={handleSelectSample}
          customImage={customImage}
          onFile={handleFile}
          onClearPhoto={() => setCustomImage(null)}
          plot={plot}
          setPlot={setPlot}
          onAnalyze={handleAnalyze}
        />
      ) : null}

      {step === 'analyzing' ? (
        <AnalyzingStep
          image={target?.image || customImage || selected?.image}
          crop={target?.sample?.crop}
          progress={progress}
          onCancel={handleCancel}
        />
      ) : null}

      {step === 'result' && result ? <ResultStep result={result} onNew={handleNew} /> : null}
    </div>
  )
}
