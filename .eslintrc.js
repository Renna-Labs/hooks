module.exports = {
  extends: ['@rennalabs/eslint-config/react', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // eslint rules
    'no-use-before-define': 'off',
    'prefer-rest-params': 'off',
    'no-param-reassign': 'off',
    'no-void': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    'arrow-body-style': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'prefer-arrow-callback': 'off',
    // react rules
    'react/prop-types': 'off',
    // typescript rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
