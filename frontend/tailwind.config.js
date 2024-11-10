/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5C0B86',
        'secondary': '#BA72E2',
        'tertiary': '#D396F4', 
        'blue': '#059FFA',
        'dark-primary': '#1E1F2C',
        'dark-secondary': '#2C2B38'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        pixel: ['pixel', 'sans-serif']
      },
    },
  },
  plugins: [],
}

