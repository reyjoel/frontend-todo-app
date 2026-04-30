import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts}',
    './components/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF7',
        ink: {
          DEFAULT: '#0F1117',
          soft: '#1C2133',
          muted: '#6B7280'
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#E8E0D0'
        },
        amber: {
          accent: '#E8A838',
          light: '#FDF3DC',
          dark: '#B07D1A'
        },
        task: {
          done: '#10B981',
          doneBg: '#D1FAE5',
          delete: '#EF4444',
          deleteBg: '#FEE2E2'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'sans-serif']
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(15,17,23,0.07)',
        card: '0 4px 24px 0 rgba(15,17,23,0.10)',
        glow: '0 0 0 3px rgba(232,168,56,0.25)'
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.25s ease-out'
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
