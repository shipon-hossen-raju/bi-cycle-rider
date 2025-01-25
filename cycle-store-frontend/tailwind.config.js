/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101010",
        brand: "#C52A09",
        gray: "#3D3D3D",
        secondary: "#F0ECE3",
        danger: "#DC2626",

        btnBg: "#FBF9F4",
        btnText: "#022205",

        txtPrimaryColor: "#4E5152",
      },
    },
  },
  plugins: [],
};
