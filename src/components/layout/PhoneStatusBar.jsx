import { useEffect, useState } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'

export default function PhoneStatusBar() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('es-GT', { hour: '2-digit', minute: '2-digit', hour12: false }).format(
      new Date(),
    ),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat('es-GT', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative flex h-8 shrink-0 items-center justify-between bg-forest-950 px-5 text-cream-50/90 select-none">
      <span className="w-12 text-[10px] font-semibold tabular-nums tracking-wide">{time}</span>
      <div className="absolute top-1.5 left-1/2 h-[18px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex w-12 items-center justify-end gap-1">
        <Signal className="size-3" strokeWidth={2.6} />
        <Wifi className="size-3" strokeWidth={2.6} />
        <BatteryFull className="size-3.5" strokeWidth={2.4} />
      </div>
    </div>
  )
}
