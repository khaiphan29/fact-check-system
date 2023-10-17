/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#2e2f30",
      approved_1: "#d0d9a6",
      approved_2: "#8a8c46",
      refuted_1: "#f3d2cb",
      refuted_2: "#bf584e",
      neutral_1: "#e8e8e8",
      neutral_2: "#878787",
    },
    extend: {},
  },
  plugins: [],
};
