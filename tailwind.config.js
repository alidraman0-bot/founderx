/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#6C63FF',
        'deep-navy': '#1B2B52',
        'aqua-mint': '#38E4AE',
        'soft-white': '#F8F9FC',
        'true-black': '#1A1A1A',
        'cool-gray': '#AEB6C1',
      },
    },
  },
  plugins: [],
}
