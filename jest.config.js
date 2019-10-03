// jest.config.js
module.exports = {
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(scss|css|less)$': 'identity-obj-proxy'
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}', '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
}
