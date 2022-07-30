module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.)$': './src/$1'
  }
}
