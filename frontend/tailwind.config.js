/** @type {import('tailwindcss').Config} */
export default {
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
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        pixel: ['pixel', 'sans-serif']
      },
    },
  },
  plugins: [],
}

