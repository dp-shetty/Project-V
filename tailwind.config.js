/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
      extend: {
        screens: {
            xs: '320px', // Add a custom 320px breakpoint
          },
      },
    },
    plugins: [],
  };