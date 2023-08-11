/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#D9D9D9',
          100: '#F7F8FA',
          200: '#EDEEF3',
          400: '#AFB9CA',
          500: '#919EB6',
          700: '#5A6B87',
          900: '#313B49',
          1000: '#1D232B',
          1100: '#080A0C',
        },
        error: {
          300: '#FBB0AE',
          500: '#FF003E',
        },
        warning: {
          300: '#FFDCA9',
        },
        success: {
          500: '#01B99F',
        },
      },

      screens: {
        xs: '350px',
        md: '700px',
      },
    },
  },
  plugins: [],
};
