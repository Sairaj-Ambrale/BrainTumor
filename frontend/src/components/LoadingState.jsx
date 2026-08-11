import React, { useEffect, useState } from 'react'

const MESSAGES = [
  'Preprocessing MRI scan…',
  'Running convolutional layers…',
  'Extracting tissue features…',
  'Finalizing prediction…',
]

export default function LoadingState() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % MESSAGES.length)
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-10 shadow-soft sm:p-16">
      <div className="relative h-40 w-40 overflow-hidden rounded-2xl bg-slate-900 sm:h-48 sm:w-48">
        {/* stylized brain silhouette */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full p-6 opacity-80"
          fill="none"
        >
          <path
            d="M50 15c-12 0-20 8-22 17-7 2-11 9-9 16-4 4-5 11-1 16 1 8 9 14 18 14h28c9 0 17-6 18-14 4-5 3-12-1-16 2-7-2-14-9-16-2-9-10-17-22-17Z"
            stroke="url(#brainGrad)"
            strokeWidth="1.6"
          />
          <path
            d="M50 20v58M38 26c3 4 3 9 0 13M62 26c-3 4-3 9 0 13M32 46c4 2 6 6 5 10M68 46c-4 2-6 6-5 10"
            stroke="url(#brainGrad)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8FADFF" />
              <stop offset="100%" stopColor="#B499FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* grid overlay */}
        <div className="absolute inset-0 bg-grid bg-grid opacity-10" />

        {/* sweeping scan line */}
        <div className="absolute inset-x-0 top-0 h-full">
          <div className="h-8 w-full animate-scan bg-gradient-to-b from-transparent via-accent-300/70 to-transparent" />
        </div>
      </div>

      <p className="mt-7 font-display text-lg font-semibold text-slate-900">
        Analyzing your MRI scan
      </p>
      <p className="mt-1.5 h-5 font-mono text-sm text-primary-600 transition-opacity">
        {MESSAGES[step]}
      </p>

      <div className="mt-6 flex gap-1.5">
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-8 rounded-full transition-colors ${
              i === step ? 'bg-primary-500' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
