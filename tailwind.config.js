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
      }
    },
  },
  plugins: [],
}

