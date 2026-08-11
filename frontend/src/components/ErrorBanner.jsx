import React from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

/**
 * @param {{ message: string, onRetry?: () => void }} props
 */
export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-rose-500" />
        <p className="text-sm leading-relaxed text-rose-700">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
        >
          <RotateCcw size={13} />
          Try again
        </button>
      )}
    </div>
  )
}
