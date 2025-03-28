const js = require('@eslint/js');
const promise = require('eslint-plugin-promise');
const security = require('eslint-plugin-security');
const sequelize = require('eslint-plugin-sequelize');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        node: 'readonly',
        browser: 'readonly',
        es6: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      promise,
      security,
      sequelize,
    },
    rules: {
      'camelcase': ['warn', { properties: 'always' }],
      'comma-dangle': ['off', 'always-multiline'],
      'comma-spacing': [
        'warn',
        {
          before: false,
          after: true,
        },
      ],
      'eol-last': ['error', 'always'],
      'indent': [
        'off',
        2,
        {
          MemberExpression: 1,
        },
      ],
      'no-multiple-empty-lines': ['error'],
      'no-new-symbol': ['error'],
      'no-trailing-spaces': ['error'],
      'no-undef': ['warn'],
      'no-unused-vars': ['warn'],
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': ['error'],
      'prefer-const': ['error'],
      'quotes': ['warn', 'single'],
      'semi': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'strict': ['error', 'never'],
    },
  },
];
