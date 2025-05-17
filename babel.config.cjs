module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Configures how Babel handles polyfills.
        // 'usage' adds specific imports for polyfills when they are used in each file.
        // 'entry' requires you to import 'core-js' or 'regenerator-runtime' once in your entry file.
        // false does not add polyfills.
        // useBuiltIns: 'usage',
        // corejs: 3, // Specify the core-js version
        // Targets can be specified here or through a browserslist configuration
        // in package.json or a .browserslistrc file.
        // targets: { browsers: ['last 2 versions', 'safari >= 7'] }
      }
    ],
    [
      '@babel/preset-react',
      {
        // Enables the automatic JSX runtime, so you don't need to import React in every file for JSX.
        runtime: 'automatic',
        // development: process.env.NODE_ENV === 'development', // For development-specific transforms like __self and __source
      }
    ],
    // Enables Babel to parse and transform TypeScript code (it strips types, does not type-check).
    '@babel/preset-typescript'
  ],
  plugins: [
    // Helps to reduce bundle size by reusing Babel's helper functions.
    // It can also polyfill new built-ins (like Promise, Symbol) without polluting the global scope
    // if configured with the `corejs` option.
    '@babel/plugin-transform-runtime'
    // For Vite projects, React Fast Refresh (HMR) is typically handled by Vite's plugins,
    // so 'react-refresh/babel' might not be needed here.
  ]
};