import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import security from 'eslint-plugin-security'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'commitlint.config.js', 'eslint.config.js'],
  },

  {
    files: ['**/*.{ts,js}'],
    ignores: ['eslint.config.js'],

    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      import: importX,
      'unused-imports': unusedImports,
      security,
    },

    rules: {
      /*
      General
      */

      'no-console': 'warn',
      'no-debugger': 'error',

      /*
      Imports
      */

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      /*
      Remove unused imports
      */

      'unused-imports/no-unused-imports': 'error',

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      /*
      TypeScript safety
      */

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      /*
      Security
      */

      'security/detect-object-injection': 'off',
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  /*
  Disable formatting rules conflicting with prettier
  */
  prettier,
])
