// Central place for backend configuration.
// Set VITE_API_URL in your .env file to point at your Python ML backend.
// Falls back to localhost:5000 for local development.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const PREDICT_ENDPOINT = `${API_URL}/predict`

// Request timeout in milliseconds — prevents the UI from hanging forever
// if the backend is unreachable or the model takes too long.
export const REQUEST_TIMEOUT_MS = 30000

// Accepted MRI image formats and max upload size.
export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
export const ACCEPTED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png']
export const MAX_FILE_SIZE_MB = 10
