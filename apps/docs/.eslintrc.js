module.exports = {
  root: true,
  extends: ["custom"],
  plugins: [require("prettier-plugin-tailwindcss")],
  rules: {
    "react/self-closing-comp": true,
  },
};
