module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/component-definition-name-casing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/require-default-prop': 'off',
    'vue/valid-template-root': 'off',
    'vue/order-in-components': 'off',
    'vue/require-prop-types': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'no-unused-expressions': 'off',
    'array-callback-return': 'off',
    'vue/no-dupe-keys': 'off',
    'no-return-assign': 'off',
    'no-self-compare': 'off',
    'dot-notation': 'off',
  },
}
