import { PREDICT_ENDPOINT, REQUEST_TIMEOUT_MS } from '../config/api'

/**
 * Custom error type so the UI can distinguish network/timeout issues
 * from valid HTTP error responses returned by the backend.
 */
export class AnalysisError extends Error {
  constructor(message, kind = 'unknown') {
    super(message)
    this.name = 'AnalysisError'
    this.kind = kind // 'network' | 'timeout' | 'server' | 'invalid_response' | 'unknown'
  }
}

/**
 * Sends an MRI image to the backend for classification.
 * @param {File} file
 * @returns {Promise<{ prediction: string, confidence: number }>}
 */
export async function analyzeImage(file) {
  if (!file) {
    throw new AnalysisError('No image provided for analysis.', 'invalid_response')
  }

  const formData = new FormData()
  formData.append('image', file)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response
  try {
    response = await fetch(PREDICT_ENDPOINT, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new AnalysisError(
        'The analysis is taking longer than expected. Please check your connection and try again.',
        'timeout'
      )
    }
    throw new AnalysisError(
      'Could not reach the analysis server. Make sure the backend is running and reachable.',
      'network'
    )
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    let serverMessage = ''
    try {
      const errBody = await response.json()
      serverMessage = errBody?.message || errBody?.error || ''
    } catch {
      // response wasn't JSON — ignore and fall back to status text
    }
    throw new AnalysisError(
      serverMessage ||
        `The server couldn't process this image (status ${response.status}). Please try again.`,
      'server'
    )
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new AnalysisError(
      'Received an unexpected response from the server.',
      'invalid_response'
    )
  }

  if (typeof data?.prediction !== 'string' || typeof data?.confidence !== 'number') {
    throw new AnalysisError(
      'The server response was missing expected prediction data.',
      'invalid_response'
    )
  }

  return {
    prediction: data.prediction,
    confidence: Math.min(Math.max(data.confidence, 0), 1),
  }
}
