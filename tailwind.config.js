/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gs: {
          blue:  '#1A1AE6',
          dark:  '#080863',
          mid:   '#1010AA',
          cyan:  '#00E5FF',
          bg:    '#F4F6FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob':     'blob 8s ease-in-out infinite',
        'blob2':    'blob 10s ease-in-out infinite reverse',
        'blob3':    'blob 12s ease-in-out infinite',
        'pulse-dot':'pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in':  'fadeIn 0.35s ease-out',
        'boot-line':'bootLine 0.25s ease-out forwards',
        'count-up': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-60px) scale(1.15)' },
          '66%':     { transform: 'translate(-30px,30px) scale(0.9)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.3 },
        },
        slideIn: {
          from: { transform: 'translateX(120%)', opacity: 0 },
          to:   { transform: 'translateX(0)',    opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        bootLine: {
          from: { opacity: 0, transform: 'translateX(-8px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-md': '0 4px 24px rgba(0,0,0,0.08)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.12)',
        'blue':    '0 4px 20px rgba(26,26,230,0.15)',
        'cyan':    '0 4px 20px rgba(0,229,255,0.2)',
      },
    },
  },
  plugins: [],
}
