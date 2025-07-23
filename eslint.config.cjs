/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier: prettierPlugin
    },
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: {
        require: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        browser: true,
        es2021: true,
        node: true,
      }
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      "no-duplicate-imports": "error",
      "no-console": "warn",
      "no-unreachable": "error",
      "no-undef": "error",
      "no-trailing-spaces": "error",
      "no-unused-vars": "off",
      "no-extra-semi": "error",
      "no-nested-ternary": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-var": "error",
      "jsx-quotes": ["warn", "prefer-double"],
      '@typescript-eslint/no-explicit-any': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
