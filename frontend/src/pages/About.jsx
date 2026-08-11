import React from 'react'
import { Code2, Cpu, Server, Database } from 'lucide-react'
import Disclaimer from '../components/Disclaimer'

const stack = [
  {
    icon: Code2,
    title: 'Frontend',
    desc: 'React 18 + Vite, with Tailwind CSS for styling and React Router for navigation between pages.',
  },
  {
    icon: Server,
    title: 'Backend',
    desc: 'A Python API (e.g. Flask or FastAPI) that exposes a /predict endpoint accepting multipart/form-data image uploads.',
  },
  {
    icon: Cpu,
    title: 'Model',
    desc: 'A convolutional neural network (CNN) trained on labeled brain MRI datasets to classify scan images.',
  },
  {
    icon: Database,
    title: 'Data flow',
    desc: 'Images are sent directly from the browser to the backend for inference and are not persisted by the frontend.',
  },
]

export default function About() {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
          About NeuroScan AI
        </h1>
        <p className="mt-3 text-slate-500">
          A learning project exploring how AI-assisted MRI classification tools
          are put together, end to end.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-5 text-slate-600">
        <p className="leading-relaxed">
          NeuroScan AI is a demonstration application that pairs a modern React
          frontend with a Python-based machine learning backend. Its goal is to
          show how brain MRI images can be classified by a trained model and how
          that prediction, along with its confidence score, can be presented
          clearly to a user.
        </p>
        <p className="leading-relaxed">
          The classification model is trained separately on a labeled dataset of
          brain MRI images and served through a simple HTTP API. When a scan is
          uploaded, the frontend sends it to that API, waits for a prediction, and
          renders the result alongside the original image.
        </p>
        <p className="leading-relaxed">
          This project is intended purely for education and research. It is a
          useful way to understand image classification pipelines, drag-and-drop
          upload flows, and how to design a calm, trustworthy interface for
          AI-generated results — not a tool for diagnosing or treating any
          medical condition.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center font-display text-2xl font-semibold text-slate-900">
          Technology stack
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {stack.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-softer"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Icon size={19} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <Disclaimer />
      </div>
    </div>
  )
}
