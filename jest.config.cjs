module.exports = {
  // The test environment that will be used for testing (jsdom for browser-like environment)
  testEnvironment: 'jsdom',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.
  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module.
  moduleNameMapper: {
    // Mock CSS Modules and other CSS file imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mock static assets like images and fonts
    '\\.(jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.{js,jsx}', // Include all JS/JSX files in src for coverage
    '!src/**/index.js', // Exclude barrel files (index.js) if they only re-export
    '!src/**/*.stories.{js,jsx}', // Exclude Storybook stories
    '!src/**/*.test.{js,jsx}', // Exclude test files
    '!src/main.jsx', // Often exclude the main entry point if it's mostly setup
    '!src/App.jsx', // May exclude App.jsx if it's mostly layout and routing
    '!src/api/middleware/**', // Exclude server-side middleware if not unit tested here
    '!src/providers/**', // Exclude simple providers if they are mostly boilerplate
    '!src/styles/**', // Exclude style definition files (like tokens.js)
    '!<rootDir>/__mocks__/**', // Exclude mocks directory
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'lcov', 'json-summary', 'html'], // Added json-summary and html for more detailed reports

  // An object that configures minimum threshold enforcement for coverage results.
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10, // Allow 10 uncovered statements
  //   },
  // },

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use Babel for JS/TSX files
  },

  // An array of regexp pattern strings that are matched against all source file paths before transformation.
  // If the file path matches any ofconst patterns, it will not be transformed.
  transformIgnorePatterns: [
    '/node_modules/(?!(@babel/runtime|another-es-module-package)/)', // Adjust as needed for ES modules in node_modules
    '\\.pnp\\.[^\\/]+$',
  ],

  // Automatically clear mock calls and instances before every test
  clearMocks: true,

  // Automatically reset mock state before every test
  // This will ensure that mock implementations and mock names are reset.
  resetMocks: true,

  // Automatically restore mock state and implementation before every test
  // This is the strictest and ensures mocks are reset to their original (non-mocked) state.
  restoreMocks: true,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   '**/__tests__/**/*.[jt]s?(x)',
  //   '**/?(*.)+(spec|test).[tj]s?(x)'
  // ],

  // Display individual test results with the test suite hierarchy.
  // verbose: true,
};
