module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Prettier와 ESLint 통합
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // React 버전을 자동으로 감지하여 올바른 ESLint 규칙 적용
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙을 ESLint 에러로 설정
    'no-var': 'error', // var 사용 금지
    'no-unused-vars': 'error',
  },
};
