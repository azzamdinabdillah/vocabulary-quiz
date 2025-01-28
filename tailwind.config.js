import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "option-shadow": "5px 5px 0px 0px rgba(21, 69, 31, 1)",
        "toggle-shadow": "3px 3px 0px 0px rgba(21, 69, 31, 1)",
      },
      colors: {
        "primary-black": "#151515",
        "primary-blue": "#3C9BF2",
        "primary-pink": "#F03986",
        "primary-yellow": "#F2CA3C",
        "primary-green": "#43DD65",
      },
    },
  },
  corePlugins: {
    arbitraryVariants: true,
  },
  plugins: [],
};
