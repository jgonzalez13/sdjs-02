const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        black: colors.black,
        white: colors.white,
        gray: colors.coolGray,
        red: colors.red,
        yellow: colors.amber,
        green: colors.emerald,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.violet,
        pink: colors.pink,
      },
    },
  },
  plugins: [],
};
