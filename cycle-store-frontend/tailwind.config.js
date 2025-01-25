/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101010",
        brand: "#C52A09",
        gray: "#3D3D3D",
        secondary: "#F6F6F6",
        danger: "#DC2626",
        bgColor: "#1C1B1B",

        btnBg: "#FBF9F4",
        btnText: "#022205",

        TextGray: "#E7E7E7",
        txtPrimaryColor: "#4E5152",
      },
      fontFamily: {
        poppinsSans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        shadowPrimary: "4px 4px 32.3px -13px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
