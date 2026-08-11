import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Activity } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze MRI' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-primary-700' : 'text-slate-600 hover:text-primary-600'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-primary text-white shadow-soft">
            <Activity size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
            NeuroScan <span className="text-primary-600">AI</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => navigate('/analyze')}
            className="rounded-full bg-grad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Analyze MRI
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                navigate('/analyze')
              }}
              className="mt-2 rounded-full bg-grad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
            >
              Analyze MRI
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
