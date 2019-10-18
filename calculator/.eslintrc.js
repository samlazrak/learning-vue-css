module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "eslint:recommended",
    "prettier",
    "prettier/vue"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["vue"]
};
