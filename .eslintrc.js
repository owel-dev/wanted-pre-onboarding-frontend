module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // React 프로젝트인 경우 추가
    'prettier', // Prettier와 함께 사용하는 경우 추가
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react', // React 프로젝트인 경우 추가
  ],
  rules: {
    // 여기에 프로젝트에 맞는 규칙을 추가하거나 수정할 수 있습니다.
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
  },
};
