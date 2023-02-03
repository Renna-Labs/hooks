module.exports = {
  root: true,
  extends: ['./node_modules/@rennalabs/tsconfig'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'prefer-rest-params': 'off',
  },
};
