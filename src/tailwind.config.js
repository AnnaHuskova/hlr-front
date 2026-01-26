/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "accent": "#d000ff",
      "accentHover": "#00FF29",
      "navlink": "#8484A0",
      "navlinkActive": "#000000",
      'white': '#FFFFFF',
      'black': '#000000',
      'form-unchecked': "#94A3B8",
      'form-hover': "#81FF8663",
    },
    fontFamily: {
      sans: ["Play", "Roboto", 'sans-serif'],
      sansModal: ["Poppins", "Roboto", 'sans-serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        auraBreath: {
          '0%':   { boxShadow: '0 0 7px #6200ff, 0 0 12px #00c8ff' },
          '50%':  { boxShadow: '0 0 18px #6200ff, 0 0 25px  #00c8ff' },
          '100%': { boxShadow: '0 0 7px #6200ff, 0 0 12px #00FF29' },
        },
      },
      animation: {
        auraBreath: 'auraBreath 5.0s ease-in-out infinite',
      }
    }
  },
  plugins: [],
}
