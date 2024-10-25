/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Regular": ['Regular', 'sans-serif'],
        "Bold": ['Bold', 'sans-serif'],
        "SemiBold": ['SemiBold', 'sans-serif'],
      },
      colors: {
        "finanzas-principal":{
          DEFAULT: "#000",
          "light": "#000"
        },
        "finanzas-secundario": {
          DEFAULT: "#F5CC00",
          "light": "#FFD500"
        },
        "finanzas-cancelar":{
          DEFAULT: "#E3212E",
          "light": "#F22432"
        },
        "finanzas-azul":{
          DEFAULT: "#00ADFF",
          "light": "#00AEFF"
        }
      }
    },
  },
  plugins: [
    /*require('@tailwindcss/forms'),*/
    require('@tailwindcss/aspect-ratio'),
  ],
}

