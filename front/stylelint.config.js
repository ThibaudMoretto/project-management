module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
    'stylelint-config-css-modules',
  ],
  ignoreFiles: ['**/*.min.scss'],
  rules: {
    'alpha-value-notation': null,
    'color-function-notation': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'property-no-vendor-prefix': null,
    'rule-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'selector-class-pattern': null,
  },
};
