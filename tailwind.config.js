/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gs: {
          blue:   '#1A1AE6',
          dark:   '#080863',
          mid:    '#1010AA',
          cyan:   '#00E5FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'float2':   'float2 8s ease-in-out infinite',
        'pulse-dot':'pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out':'slideOut 0.3s ease-in forwards',
        'fade-in':  'fadeIn 0.4s ease-out',
        'boot-line':'bootLine 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-20px) rotate(3deg)' },
        },
        float2: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(15px) rotate(-2deg)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.3 },
        },
        slideIn: {
          from: { transform: 'translateX(120%)', opacity: 0 },
          to:   { transform: 'translateX(0)',    opacity: 1 },
        },
        slideOut: {
          from: { transform: 'translateX(0)',    opacity: 1 },
          to:   { transform: 'translateX(120%)', opacity: 0 },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        bootLine: {
          from: { opacity: 0, transform: 'translateX(-10px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'cyan': '0 8px 32px rgba(0,229,255,0.25)',
        'cyan-lg': '0 16px 48px rgba(0,229,255,0.35)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
