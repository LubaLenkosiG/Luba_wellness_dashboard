/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor:"#05055a",
        textLight:"#FCFBF4",
        bgSoft:"#252564",
        bgSoftLight: "#2d416c",
        testcolor:"#luba"
      },
    },
  },
  plugins: [],
};
