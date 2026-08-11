import React from 'react'
import { X, ScanLine, FileImage } from 'lucide-react'

function formatBytes(bytes) {
  if (!bytes) return '0 KB'
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

/**
 * @param {{ file: File, previewUrl: string, onRemove: () => void, onAnalyze: () => void, disabled?: boolean }} props
 */
export default function ImagePreview({ file, previewUrl, onRemove, onAnalyze, disabled }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft">
      <div className="relative bg-slate-900">
        <img
          src={previewUrl}
          alt="Uploaded MRI scan preview"
          className="mx-auto max-h-[420px] w-full object-contain"
        />
        <button
          onClick={onRemove}
          aria-label="Remove image"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-soft transition-colors hover:bg-white"
        >
          <X size={17} />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <FileImage size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">{file?.name}</p>
            <p className="font-mono text-xs text-slate-400">{formatBytes(file?.size)}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRemove}
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Remove
          </button>
          <button
            onClick={onAnalyze}
            disabled={disabled}
            className="flex items-center gap-2 rounded-full bg-grad-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            <ScanLine size={16} />
            Analyze
          </button>
        </div>
      </div>
    </div>
  )
}
