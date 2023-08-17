/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.tsx'
  ],
  darkMode: 'class',
  plugins : [],
  theme   : { extend: { fontFamily: { sans: 'Martian Mono' } } }
}
