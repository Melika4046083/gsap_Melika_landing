/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'regular': ['Regular', 'sans-serif'],
        'medium': ['Medium', 'sans-serif'],
        'semibold': ['SemiBold', 'sans-serif'],
        'bold': ['Bold', 'sans-serif'],
      },
      colors: {
        primary: '#f07300',
        'dark-100': '#86868b',
        'dark-200': '#2e2e30',
        'light-100': '#adb5bd',
      }
    },
  },
  plugins: [],
}