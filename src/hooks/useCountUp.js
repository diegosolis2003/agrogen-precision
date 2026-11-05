import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1200, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const next = from + (target - from) * easeOut(progress)
      setValue(Number(next.toFixed(decimals)))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, decimals])

  return value
}
