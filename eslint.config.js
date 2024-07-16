import base from "eslint-config-voodoocreation/base";

export default [
  ...base,
  {
    ignores: ["./cjs", "./esm"],
    languageOptions: {
      ecmaVersion: 2021,
      parserOptions: {
        project: "tsconfig.lint.json",
      },
      sourceType: "module",
    },
  },
];
