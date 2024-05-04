/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'loaderspin': 'loader 3s linear infinite',
      }
      ,
      keyframes: {
        loader: {
          '0%': { backgroundPosition: '-800px 0px' },
          '100%': { backgroundPosition: '800px 0px'},
        },
      },
      colors: {

        sidebarBG: {
          100: '#F0F4F9',
          200: '#E6EAF1',
          300: '#282828',
          400: '#E2E6EB',
        },
        mainBG: {
          100: '#585858',
          200: '#F0F4F9',
          300: '#DFE4EA',
        },

        boxShadow: {
          card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
        }
      },

      fontFamily: {
        outfit: "Outfit",
        empyrean: "Empyrean",
        saveur: 'Saveur',
        // Add more custom font families as needed
      },
    },
    plugins: [],
  }
};
