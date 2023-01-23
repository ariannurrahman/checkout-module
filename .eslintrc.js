const path = require('path');

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
  ],
  // plugins: ['unused-imports'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/resolver': [
      {
        node: {
          paths: [path.resolve(__dirname, 'src')],
          extensions: ['.js', '.jsx', 'ts', 'tsx'],
        },
      },
    ],
  },
};
