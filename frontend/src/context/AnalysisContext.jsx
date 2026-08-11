import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { analyzeImage } from '../utils/api'

const AnalysisContext = createContext(null)

export function AnalysisProvider({ children }) {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null) // { prediction, confidence }
  const [error, setError] = useState(null)

  const selectFile = useCallback((newFile) => {
    setFile(newFile)
    setResult(null)
    setError(null)
    setStatus('idle')
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return newFile ? URL.createObjectURL(newFile) : null
    })
  }, [])

  const clearFile = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setFile(null)
    setResult(null)
    setError(null)
    setStatus('idle')
  }, [])

  const runAnalysis = useCallback(async () => {
    if (!file) {
      setError('Please upload an MRI image before analyzing.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const data = await analyzeImage(file)
      setResult(data)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing the image.')
      setStatus('error')
    }
  }, [file])

  const reset = useCallback(() => {
    clearFile()
  }, [clearFile])

  const value = useMemo(
    () => ({ file, previewUrl, status, result, error, selectFile, clearFile, runAnalysis, reset }),
    [file, previewUrl, status, result, error, selectFile, clearFile, runAnalysis, reset]
  )

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext)
  if (!ctx) {
    throw new Error('useAnalysis must be used within an AnalysisProvider')
  }
  return ctx
}
