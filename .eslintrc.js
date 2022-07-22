module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
  plugins: ['prettier'],
};
