/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'main': '#232424',
        'reallylight': '#b6b8bb',
        'light': '#2b2a2a',
      }
    },
  },
  plugins: [],
}

