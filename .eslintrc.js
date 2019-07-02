module.exports = {
  extends: [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    },
    useJSXTextNode: true,
    project: "./tsconfig.json",
    tsconfigRootDir: "."
  },
  env: {
    "mocha": true
  },
  rules: {
  }
}
