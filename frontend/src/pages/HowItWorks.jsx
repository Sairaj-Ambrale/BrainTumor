import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, SlidersHorizontal, BrainCircuit, FileCheck2, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: UploadCloud,
    title: 'Upload MRI',
    desc: 'You choose a JPG or PNG brain MRI scan from your device, or drag it directly into the upload zone.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Preprocess',
    desc: 'The backend resizes, normalizes, and prepares the image so it matches the format the model was trained on.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Classification',
    desc: 'A trained neural network analyzes the processed scan and scores it against each possible class.',
  },
  {
    icon: FileCheck2,
    title: 'Prediction',
    desc: 'The highest-scoring class and its confidence are returned to the app and displayed on the results page.',
  },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
          How it works
        </h1>
        <p className="mt-3 text-slate-500">
          Four steps take an uploaded scan from raw image to prediction.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-primary-200 via-accent-200 to-transparent sm:block" />

        <div className="flex flex-col gap-8">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative flex gap-5 sm:gap-6">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-grad-primary text-white shadow-soft">
                <Icon size={20} />
              </div>
              <div className="flex-1 rounded-3xl border border-slate-100 bg-white p-6 shadow-softer">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary-500">
                  STEP {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <button
          onClick={() => navigate('/analyze')}
          className="flex items-center gap-2 rounded-full bg-grad-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Try it now
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
