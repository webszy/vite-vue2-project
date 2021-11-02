module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/essential'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    vueFeatures: {
        filter: true,
        interpolationAsNonHTML: false
    }
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': 'off',
    'space-before-function-paren': 'off',
    'new-cap':'off',
    'double-quotes':'off',
    'object-curly-spacing':'off',
  }
}
