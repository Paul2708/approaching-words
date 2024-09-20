/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "title": ["Luckiest Guy"],
        "header": ["Roboto"],
      },
      colors: {
        "background-from": "#D05757",
        "background-to": "#FFE3E3",
        "btn": "#FF5C5C",
        "btn-border": "#BA0505",
        "btn-active": "#CA7C7C",
        "btn-border-active": "#340303"
      },
      keyframes: {
        moveLeftToRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30px)' },
        },
        moveRightToLeft: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-30px)' },
        },
      },
      animation: {
        'move-left-to-right': 'moveLeftToRight 5s ease-out infinite',
        'move-right-to-left': 'moveRightToLeft 5s ease-out infinite',
      },
    },
  },
  plugins: [],
}

