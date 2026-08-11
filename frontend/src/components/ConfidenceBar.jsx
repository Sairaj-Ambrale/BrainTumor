import React, { useEffect, useState } from 'react'

/**
 * @param {{ confidence: number }} props confidence as a 0–1 fraction
 */
export default function ConfidenceBar({ confidence }) {
  const percent = Math.round((confidence ?? 0) * 100)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(percent))
    return () => cancelAnimationFrame(id)
  }, [percent])

  const label = percent >= 85 ? 'High confidence' : percent >= 60 ? 'Moderate confidence' : 'Low confidence'

  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="text-sm font-medium text-slate-500">Model confidence</span>
        <span className="font-mono text-2xl font-semibold text-slate-900">{percent}%</span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-grad-primary transition-all duration-[1200ms] ease-out"
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="mt-1.5 text-xs font-medium text-slate-400">{label}</p>
    </div>
  )
}
