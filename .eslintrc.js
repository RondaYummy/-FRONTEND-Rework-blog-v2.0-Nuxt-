module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'plugin:nuxt/strongly-recommended',
    'airbnb-base',
    '@nuxtjs',
    'prettier'
  ],
  rules: {
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
      allowAfterThis: true,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    }],
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-await-in-loop': ['off'],
    'no-restricted-syntax': ['off'],
    'no-constant-condition': ['off'],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": false,
      "optionalDependencies": false,
      "peerDependencies": false
    }],
  },
  globals: {
    $nuxt: true,
    mapkit: false
  }
}
