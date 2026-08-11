import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_EXTENSIONS,
  MAX_FILE_SIZE_MB,
} from '../config/api'

/**
 * Validates an uploaded MRI image before it is sent for analysis.
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateFile(file) {
  if (!file) {
    return { valid: false, error: 'No file was selected. Choose an MRI image to continue.' }
  }

  const hasValidType = ACCEPTED_FILE_TYPES.includes(file.type)
  const hasValidExtension = ACCEPTED_FILE_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext)
  )

  if (!hasValidType && !hasValidExtension) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload a JPG or PNG image.',
    }
  }

  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File is too large. Please upload an image under ${MAX_FILE_SIZE_MB}MB.`,
    }
  }

  if (file.size === 0) {
    return { valid: false, error: 'This file appears to be empty or corrupted.' }
  }

  return { valid: true }
}
