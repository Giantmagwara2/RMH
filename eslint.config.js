import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist/', // Standard build output directory
      'node_modules/',
      '.DS_Store',
      '*.log',
      'coverage/', // Code coverage reports
      '.turbo/',   // Turborepo cache
      '.vite/',    // Vite cache
      'vite.config.js.timestamp-*', // Vite temporary files
      'build/', // Added build directory to ignores
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2023, // Updated to 2023 for the latest JavaScript features
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      // General rules
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Added 'info' to allowed console methods

      // React-specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-uses-vars': 'error',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }], // Enforce cleaner JSX
      'react/jsx-no-useless-fragment': 'warn', // Avoid unnecessary fragments
      'react/jsx-props-no-spreading': ['warn', { exceptions: ['Component'] }], // Discourage prop spreading

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/no-autofocus': 'warn', // Added rule to discourage autofocus for accessibility
      'jsx-a11y/anchor-is-valid': 'warn', // Ensure valid anchor elements
      'jsx-a11y/click-events-have-key-events': 'warn', // Ensure clickable elements are keyboard accessible

      // Performance and best practices
      'react/jsx-no-constructed-context-values': 'warn', // Avoid unnecessary re-renders
      'react/jsx-no-leaked-render': 'warn', // Prevent rendering of potentially unsafe values
      'react/jsx-sort-props': ['warn', { callbacksLast: true, shorthandFirst: true }], // Enforce prop sorting
    },
  },
  // Add TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^[A-Z_]',
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn', // Added rule for consistent type imports
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'], // Enforce consistent type definitions
      '@typescript-eslint/no-floating-promises': 'warn', // Prevent unhandled promises
      '@typescript-eslint/prefer-ts-expect-error': 'warn', // Prefer @ts-expect-error over @ts-ignore
    },
  },
];
