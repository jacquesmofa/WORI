import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: '#0A3326',
          800: '#0F4C3A',
          700: '#13614A',
          600: '#1D6F52',
          500: '#2A8A68',
        },
        gold: {
          400: '#E8C76A',
          500: '#D4AF37',
          600: '#C5A059',
          700: '#A8883D',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FBFBF6',
          200: '#F4F0E6',
          300: '#E8E2D4',
        },
        charcoal: {
          800: '#1A1F1D',
          700: '#232B28',
          600: '#2E3834',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config