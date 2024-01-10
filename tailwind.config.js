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

