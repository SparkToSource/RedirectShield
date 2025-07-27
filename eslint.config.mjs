import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ["src/**/*.ts", "src/**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true
        },
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs["eslint-recommended"].rules,
      ...tsEslintPlugin.configs["recommended"].rules,
      "@typescript-eslint/no-explicit-any": "off",
    }
  }
];
