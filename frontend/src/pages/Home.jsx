import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Layers, Zap, Lock, ArrowRight, ScanLine } from 'lucide-react'
import Disclaimer from '../components/Disclaimer'

const features = [
  {
    icon: Brain,
    title: 'AI Analysis',
    desc: 'A convolutional neural network trained on labeled MRI scans looks for patterns across the entire image.',
  },
  {
    icon: Layers,
    title: 'MRI Classification',
    desc: 'Scans are sorted into distinct classes so you can see exactly what the model detected and where.',
  },
  {
    icon: Zap,
    title: 'Fast Results',
    desc: 'Predictions typically return in a few seconds, with a live confidence score alongside every result.',
  },
  {
    icon: Lock,
    title: 'Secure Processing',
    desc: 'Images are sent directly to your configured backend for inference and are not stored or shared.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grad-soft" />
        <div className="absolute inset-0 bg-grid bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

        <div className="container-page relative py-20 sm:py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-4 py-1.5 text-xs font-semibold text-primary-700 shadow-softer">
                <ScanLine size={13} />
                Deep learning &middot; Research preview
              </div>

              <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
                AI-Powered <span className="text-primary-600">Brain MRI</span> Analysis
              </h1>

              <p className="mt-5 max-w-lg text-balance text-lg leading-relaxed text-slate-500">
                Upload a brain MRI scan and let a trained classification model
                highlight patterns associated with tumor presence — built for
                learning how medical imaging AI works, end to end.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/analyze')}
                  className="flex items-center justify-center gap-2 rounded-full bg-grad-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Upload &amp; Analyze
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  See how it works
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-slate-400">
                <span>&#9642; Educational &amp; research use</span>
                <span>&#9642; JPG / PNG supported</span>
                <span>&#9642; Configurable ML backend</span>
              </div>
            </div>

            {/* Signature visual: scanning MRI silhouette */}
            <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms]">
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-glow">
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full p-10" fill="none">
                  <path
                    d="M100 30c-24 0-40 16-44 34-14 4-22 18-18 32-8 8-10 22-2 32 2 16 18 28 36 28h56c18 0 34-12 36-28 8-10 6-24-2-32 4-14-4-28-18-32-4-18-20-34-44-34Z"
                    stroke="url(#heroBrainGrad)"
                    strokeWidth="2"
                  />
                  <path
                    d="M100 40v116M76 52c6 8 6 18 0 26M124 52c-6 8-6 18 0 26M64 92c8 4 12 12 10 20M136 92c-8 4-12 12-10 20M70 128c10 4 16 10 18 18M130 128c-10 4-16 10-18 18"
                    stroke="url(#heroBrainGrad)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="heroBrainGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8FADFF" />
                      <stop offset="100%" stopColor="#B499FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 bg-grid bg-grid opacity-10" />
                <div className="absolute inset-x-0 top-0 h-full">
                  <div className="h-10 w-full animate-scan bg-gradient-to-b from-transparent via-accent-300/60 to-transparent" />
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-100 bg-white px-5 py-2.5 shadow-soft">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-accent-500" />
                <span className="font-mono text-xs font-medium text-slate-500">
                  model scanning slice 24/32
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-3xl font-semibold text-slate-900">
            Built like a real diagnostic pipeline
          </h2>
          <p className="mt-3 text-balance text-slate-500">
            Every scan moves through the same four checks a production imaging
            system would run — just simplified for learning.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-softer transition-shadow hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-primary text-white transition-transform group-hover:scale-105">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-page pb-24">
        <Disclaimer />
      </section>
    </div>
  )
}
