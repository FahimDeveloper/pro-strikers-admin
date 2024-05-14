/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: { preflight: false },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0ABAC3",
          secondary: "#BDFCFF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
