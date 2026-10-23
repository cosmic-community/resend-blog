/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#030303',
        foreground: '#e5e5e5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.gray.300'),
            '--tw-prose-quote-borders': 'rgba(255,255,255,0.2)',
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-hr': 'rgba(255,255,255,0.1)',
            '--tw-prose-th-borders': 'rgba(255,255,255,0.2)',
            '--tw-prose-td-borders': 'rgba(255,255,255,0.1)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}