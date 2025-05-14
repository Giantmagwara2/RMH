module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Map static assets
  },
  collectCoverage: true, // Enable coverage reporting
  collectCoverageFrom: [
    'src/**/*.{js,jsx}', // Include all JS/JSX files in src for coverage
    '!src/**/index.js', // Exclude index files
    '!src/**/*.test.{js,jsx}', // Exclude test files
  ],
  coverageReporters: ['text', 'lcov'], // Generate text and lcov reports
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use Babel for JS/TSX files
  },
};
