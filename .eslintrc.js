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
    'plugin:vue/recommended',
    'airbnb-base',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    "linebreak-style": ["windows"],
    "comma-dangle": ["error", "only-multiline"],
    "semi": ['off'],
    "space-before-function-paren": ['off'],
    "curly": ['off'],
    "arrow-parens": ['off'],
    "no-underscore-dangle": ['off'],
    "max-len": ["error", {
      "code": 140,
    }],
    "no-nested-ternary": ['off'],
    "import/no-extraneous-dependencies": [{ devDependencies: true }]
  },
  globals: {
    $nuxt: true,
    mapkit: false
  }
}
