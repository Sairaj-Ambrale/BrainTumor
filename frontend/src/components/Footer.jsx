import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ShieldAlert } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-primary text-white">
                <Activity size={16} />
              </span>
              <span className="font-display text-base font-semibold text-slate-900">
                NeuroScan AI
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              A deep-learning research tool for exploring brain MRI classification.
              Built for demonstration and learning, not clinical use.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900">Navigate</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
              <li><Link to="/analyze" className="hover:text-primary-600">Analyze MRI</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary-600">How It Works</Link></li>
              <li><Link to="/about" className="hover:text-primary-600">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-1.5 font-display text-sm font-semibold text-slate-900">
              <ShieldAlert size={15} className="text-accent-600" />
              Important
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              NeuroScan AI is for educational and research purposes only. It does not
              provide medical diagnoses. Always consult a qualified medical
              professional for health concerns.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} NeuroScan AI. All rights reserved.</span>
          <span className="font-mono">React + Vite &middot; Model served via /predict</span>
        </div>
      </div>
    </footer>
  )
}
