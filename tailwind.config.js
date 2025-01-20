/** @type {import('tailwindcss').Config} */
module.exports = {
  enabled: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
          poppinsRegular: ["Popins Regular"],
          poppinsItalic: ["Popins Italic"],
          poppinsMedium: ["Popins Medium"],
          poppinsMediumItalic: ["Popins MediumItalic"],
          poppinsSemiBold: ["Popins SemiBold"],
          poppinsSemiBoldItalic: ["Popins SemiBoldItalic"],
          poppinsBold: ["Popins Bold"],
          poppinsBoldItalic: ["Popins BoldItalic"],
          poppinsExtraBold: ["Popins ExtraBold"],
          poppinsExtraBoldItalic: ["Popins ExtraBoldItalic"],
          poppinsBlack: ["Popins Black"],
          poppinsBlackItalic: ["Popins BlackItalic"],
          poppinsLight: ["Popins Light"],
          poppinsLightItalic: ["Popins LightItalic"],
          poppinsThin: ["Popins Thin"],
          poppinsThinItalic: ["Popins ThinItalic"],
          lostSarafin: ["Lost Sarafin"]
        },
      colors: {
          fontBlack: '#1c1c1c',
          blue: '#4287f5',
          green: '#0ff288',
          lightGreen: "#e3fff2",
          red: '#ff5445',
          yellow: '#ffcc41',
          cosmicPink: "#cf06a6",
          blueLight: "#fae8ff",
          bgBlack: "#000108",
      },
    },
  },
  plugins: [],
}

