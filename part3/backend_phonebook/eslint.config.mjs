import globals from "globals";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "eqeqeq": "error",
      "no-unused-vars": "warn",
    },
  },
];
