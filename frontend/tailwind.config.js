/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF3FF',
          100: '#DCE5FF',
          200: '#B9CCFF',
          300: '#8FADFF',
          400: '#5F87FF',
          500: '#3A63F5',
          600: '#2748D6',
          700: '#1E37AD',
          800: '#1A2E89',
          900: '#17296E',
        },
        accent: {
          50: '#F5F2FF',
          100: '#E9E0FF',
          200: '#D1C2FF',
          300: '#B499FF',
          400: '#9670FF',
          500: '#7C4DFF',
          600: '#6935E0',
          700: '#5628B8',
          800: '#452193',
          900: '#391D77',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(58,99,245,0.14), 0 2px 8px -2px rgba(124,77,255,0.10)',
        softer: '0 2px 12px -2px rgba(58,99,245,0.10)',
        glow: '0 0 0 1px rgba(124,77,255,0.12), 0 12px 40px -8px rgba(58,99,245,0.38)',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #3A63F5 0%, #7C4DFF 100%)',
        'grad-soft': 'linear-gradient(135deg, #EFF3FF 0%, #F5F2FF 100%)',
        grid: 'linear-gradient(rgba(58,99,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58,99,245,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '28px 28px',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-10%)', opacity: '0.2' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(110%)', opacity: '0.2' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'grow-bar': {
          '0%': { width: '0%' },
        },
      },
      animation: {
        scan: 'scan 2.6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
