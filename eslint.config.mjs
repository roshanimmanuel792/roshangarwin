import { Linter } from "eslint";

const config: Linter.Config[] = [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: ["next/core-web-vitals", "next/typescript"],
  },
];

export default config;
