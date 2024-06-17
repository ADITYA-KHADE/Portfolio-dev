/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      width: {
        'narrow': '200px',
      },
      animation: {
        'text-loop': 'textLoop 10s linear infinite',
      },
      keyframes: {
        // textLoop: {
        //   '0%': { transform: 'translateX(0)' },
        //   '100%': { transform: 'translateX(-50%)' },
        // },
        textLoop: {
          '0%': {  transform: 'translateX(-100%)' },
          '10%': {  transform: 'translateX(0)' },
          '90%': { transform: 'translateX(0)' },
          '100%': {  transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
