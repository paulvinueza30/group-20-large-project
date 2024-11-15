/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { 
            transform: 'translateY(0)', 
            opacity: 1 
          },
          '50%': { 
            transform: 'translateY(-80px)', 
            opacity: 0.5 
          },
          '95%': { 
            transform: 'translateY(-80px)', 
            opacity: 0 
          },

        },
      },
      animation: {
        float: 'float 3.5s ease-in-out',
      },
      backgroundImage: {
        'card-bg1': "url(src/assets/bg1.jpg)",
        'card-bg2': "url(src/assets/bg2.jpg)",
      },
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

