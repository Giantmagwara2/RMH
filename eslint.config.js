import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import'; // Added import plugin
import pluginJestDom from 'eslint-plugin-jest-dom'; // Added jest-dom plugin
import pluginTestingLibrary from 'eslint-plugin-testing-library'; // Added testing-library plugin
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier'; // Added prettier config

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
      'import': pluginImport,
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
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules, // Handles react-in-jsx-scope for React 17+
      ...pluginJsxA11y.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,

      // General rules
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Added 'info' to allowed console methods

      // React-specific rules
      'react/prop-types': 'off', // Typically off for TypeScript projects
      // 'react/react-in-jsx-scope': 'off', // Handled by pluginReact.configs['jsx-runtime'].rules
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

      // Accessibility rules (some might be covered by recommended, review and adjust)
      // 'jsx-a11y/alt-text': 'error', // Covered by recommended
      // 'jsx-a11y/aria-role': 'error', // Covered by recommended
      // 'jsx-a11y/aria-props': 'error', // Covered by recommended
      'jsx-a11y/no-autofocus': 'warn', // Added rule to discourage autofocus for accessibility
      // 'jsx-a11y/anchor-is-valid': 'warn', // Covered by recommended, but can be customized
      'jsx-a11y/click-events-have-key-events': 'warn', // Ensure clickable elements are keyboard accessible

      // Performance and best practices
      'react/jsx-no-constructed-context-values': 'warn', // Avoid unnecessary re-renders
      'react/jsx-no-leaked-render': 'warn', // Prevent rendering of potentially unsafe values
      'react/jsx-sort-props': ['warn', { callbacksLast: true, shorthandFirst: true }], // Enforce prop sorting

      // Import plugin rules
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'error', // Ensure imports point to a file/module that can be resolved.
      'import/named': 'error', // Ensure named imports correspond to a named export in the remote file.
      'import/default': 'error', // Ensure a default export is present when default import is used.
      'import/namespace': 'error', // Ensure imported namespaces contain Ssymbols.
      'import/no-duplicates': 'warn', // Report repeated imports from the same module
    },
  },
  // TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      'import': pluginImport, // For TypeScript path resolution
    },
    settings: { // Settings for eslint-plugin-import with TypeScript
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types under `<root>@types` directory
        },
      },
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
      ...tseslintPlugin.configs.eslintRecommended.rules, // Disables base ESLint rules covered by TypeScript-ESLint
      ...tseslintPlugin.configs.recommended.rules,
      ...pluginImport.configs.typescript.rules, // TypeScript specific import rules
      'no-unused-vars': 'off', // Disable base ESLint rule, use TypeScript version below
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
  // Test files specific configuration
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jest-dom': pluginJestDom,
      'testing-library': pluginTestingLibrary,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...pluginJestDom.configs.recommended.rules,
      ...pluginTestingLibrary.configs.react.rules, // For React Testing Library
      // You can override or add specific test rules here
      // e.g., 'testing-library/no-await-sync-query': 'error',
      // 'testing-library/no-debugging-utils': 'warn',
      // 'jest-dom/no-to- έχουν-text-content': 'off', // If you prefer other ways to check text
    },
  },
  // Prettier config must be last to override other formatting rules
  eslintConfigPrettier,
];
