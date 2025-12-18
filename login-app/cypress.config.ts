module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust the base URL as needed
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    video: false,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.spec.{js,jsx,ts,tsx}',
  },
};