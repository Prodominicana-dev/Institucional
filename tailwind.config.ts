const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "prodominicana-logo": "/images/prodominicana.png",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navy: "#062381",
        purpurita: "#4C12C4",
        mint: "#1AD25D",
        "light-blue": "#0B256F",
        "dark-blue": "#040E2C",
        "sky-blue": "rgba(41,151,242, 0.7)",
        celeste: "#08A5EC",
        morado: "#783CC8",
        "sied-purple": "#4A12C5",
        "sied-pink": "#E82D72",
        "blue-dark": "#01296D",
      },
      boxShadow: {
        button: "0px 0px 15px 15px rgba(255, 255, 255, 0.3)",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      opensans: ["OpenSans", "sans-serif"],
      noctura: ["Noctura", "georgia"],
      adelia: ["Adelia", "normal"],
      gotham: ["Gotham", "medium"],
      glancyr: ["Glancyr", "regular"],
    },
    colors: {
      ...colors,
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
