// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],        // default UI font
        headings: ['Poppins', 'sans-serif'], // for titles and cards
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
