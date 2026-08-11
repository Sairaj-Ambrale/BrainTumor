import React from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'
import ConfidenceBar from './ConfidenceBar'

/**
 * @param {{ prediction: string, confidence: number }} props
 */
export default function ResultCard({ prediction, confidence }) {
  const isClear = /no\s*tumor|normal|healthy/i.test(prediction || '')

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        AI classification result
      </div>

      <div
        className={`mt-4 flex items-center gap-3 rounded-2xl p-4 ${
          isClear ? 'bg-emerald-50' : 'bg-amber-50'
        }`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isClear ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          }`}
        >
          {isClear ? <CircleCheck size={22} /> : <CircleAlert size={22} />}
        </span>
        <div>
          <p className="font-display text-xl font-semibold text-slate-900 sm:text-2xl">
            {prediction}
          </p>
          <p className="text-xs text-slate-500">Predicted class from uploaded MRI scan</p>
        </div>
      </div>

      <div className="mt-6">
        <ConfidenceBar confidence={confidence} />
      </div>
    </div>
  )
}
