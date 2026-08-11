import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader'
import ImagePreview from '../components/ImagePreview'
import LoadingState from '../components/LoadingState'
import ErrorBanner from '../components/ErrorBanner'
import { useAnalysis } from '../context/AnalysisContext'

export default function Analyze() {
  const navigate = useNavigate()
  const { file, previewUrl, status, error, selectFile, clearFile, runAnalysis } = useAnalysis()

  useEffect(() => {
    if (status === 'success') {
      navigate('/results')
    }
  }, [status, navigate])

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-primary-600">
          Step 1 of 2
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
          Analyze an MRI scan
        </h1>
        <p className="mt-3 text-slate-500">
          Upload a JPG or PNG brain MRI image. The model will classify it and return
          a confidence score.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {status === 'loading' ? (
          <LoadingState />
        ) : !file ? (
          <ImageUploader onFileAccepted={selectFile} />
        ) : (
          <ImagePreview
            file={file}
            previewUrl={previewUrl}
            onRemove={clearFile}
            onAnalyze={runAnalysis}
          />
        )}

        {status === 'error' && error && (
          <div className="mt-5">
            <ErrorBanner message={error} onRetry={file ? runAnalysis : undefined} />
          </div>
        )}
      </div>
    </div>
  )
}
