// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js',
    // Add other files that contain your JSX/HTML templates here
  ],
  content: [
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        customOne: ['Poppins', 'sans'],
        customTwo: ['Montserrat', 'sans'],
      },
      spacing: {
        '14': '3.5rem', // or any other value you need
        '16': '4rem',
        '20': '5rem',
        '30': '8rem'
        // Add more custom spacing values as needed
      },
    },
  },
  variants: {},
  plugins: [],
};
