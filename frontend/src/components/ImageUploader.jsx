import React, { useCallback, useRef, useState } from 'react'
import { UploadCloud, ImageIcon, AlertCircle } from 'lucide-react'
import { validateFile } from '../utils/validateFile'
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_MB } from '../config/api'

/**
 * @param {(file: File) => void} onFileAccepted
 */
export default function ImageUploader({ onFileAccepted }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState(null)

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0]
      const { valid, error } = validateFile(file)
      if (!valid) {
        setLocalError(error)
        return
      }
      setLocalError(null)
      onFileAccepted(file)
    },
    [onFileAccepted]
  )

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-14 text-center transition-colors cursor-pointer sm:py-20 ${
          isDragging
            ? 'border-primary-400 bg-primary-50'
            : 'border-slate-200 bg-slate-50/60 hover:border-primary-300 hover:bg-primary-50/40'
        }`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft transition-transform group-hover:scale-105">
          <UploadCloud size={28} className="text-primary-600" />
        </span>
        <p className="mt-5 font-display text-lg font-semibold text-slate-900">
          Drag &amp; drop your MRI scan
        </p>
        <p className="mt-1.5 text-sm text-slate-500">
          or click to browse from your device
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-mono text-slate-500 shadow-softer">
          <ImageIcon size={13} />
          JPG or PNG &middot; up to {MAX_FILE_SIZE_MB}MB
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={[...ACCEPTED_FILE_EXTENSIONS, 'image/jpeg', 'image/png'].join(',')}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {localError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{localError}</span>
        </div>
      )}
    </div>
  )
}
