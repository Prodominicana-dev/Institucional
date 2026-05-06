/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pd-red':   '#C8102E',
        'pd-navy':  '#071D49',
        'pd-light': '#F5F7FA',
        aprender:   '#1A6FA8',
        impulsarte: '#2E7D32',
        exportar:   '#00796B',
        conectar:   '#6A1B9A',
      },
      fontFamily: {
        sans:    ['Figtree', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}