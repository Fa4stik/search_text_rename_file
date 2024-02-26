/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'rubikRg': ['Rubik-Regular', 'system-ui', 'sans-serif'],
        'rubikMd': ['Rubik-Medium', 'system-ui', 'sans-serif'],
      },
      colors: {
        'mainDark': '#434343',
        'mainWhite': "#F5F5F5",
        'mainGreen': "#15C585",
        'mainGray': "#F2F2F2",
        'mainTags': "#A1A1A1"
      },
      backgroundImage: {
        'auth': 'linear-gradient(135deg, rgba(21, 197, 133, 37%), ' +
            'rgba(170, 180, 53, 25%) 45%, ' +
            'rgba(87, 163, 126, 14%) 70%, ' +
            'rgba(109, 152, 123, 7%) 85%, ' +
            'rgba(129, 142, 121, 40%) 100%)'
      },
      keyframes: {
        'lds-ellipsis1': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        'lds-ellipsis3': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' }
        },
        'lds-ellipsis2': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(24px, 0)' }
        }
      },
      animation: {
        'lds-ellipsis1': 'lds-ellipsis1 0.6s infinite',
        'lds-ellipsis2': 'lds-ellipsis2 0.6s infinite',
        'lds-ellipsis3': 'lds-ellipsis3 0.6s infinite',
      }
    },
  },
  plugins: [],
}

