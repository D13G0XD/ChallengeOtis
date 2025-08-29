/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais OTIS
        'otis-blue': '#003DA5',
        'otis-light': '#E6F3FF',
        'otis-dark': '#002B75',
        
        // Paleta expandida OTIS
        'otis': {
          50: '#F0F7FF',
          100: '#E6F3FF',
          200: '#CCE7FF',
          300: '#99D1FF',
          400: '#66B3FF',
          500: '#3399FF',
          600: '#0066CC',
          700: '#003DA5',
          800: '#002B75',
          900: '#001A4D',
          950: '#001133'
        },
        
        // Cores de status melhoradas
        'status': {
          'vendido': '#6B7280',
          'engenharia': '#6366F1',
          'fabricacao': '#14B8A6',
          'transporte': '#F59E0B',
          'instalacao': '#3B82F6',
          'comissionamento': '#8B5CF6',
          'handover': '#10B981',
          'pos-venda': '#64748B'
        },
        
        // Cores de feedback
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6'
      },
      fontFamily: {
        'sans': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'otis': '0 4px 6px -1px rgba(0, 61, 165, 0.1), 0 2px 4px -1px rgba(0, 61, 165, 0.06)',
        'otis-lg': '0 10px 15px -3px rgba(0, 61, 165, 0.1), 0 4px 6px -2px rgba(0, 61, 165, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
