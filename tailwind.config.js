/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "nilg-blue": '#353cdd',
        "nilg-green": '#72c472',
        "nilg-yellow": '#ffc700',
        "nilg-orange": "#ff6900"
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  safelist: [{
    pattern: /(bg|text|border)-nilg-(blue|orange|yellow|green)/
  }]
}
