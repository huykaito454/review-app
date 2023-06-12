/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#1677ff",
        "main-1": "#222831",
        "main-2": "#393E46",
        "main-3": "#00ADB5",
        "main-4": "#EEEEEE",
        "main-5": "#eeeeeeac",
        "main-6": "#f0efec",
      },
    },
  },
  plugins: [],
};
