export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ['*'],
      exclude: /node_modules/i,
    },
  },
}
