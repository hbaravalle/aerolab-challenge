module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 120],
    'type-enum': [
      2,
      'always',
      [
        'breaking',
        'perf',
        'feat',
        'fix',
        'refactor',
        'chore',
        'test',
        'docs',
        'style',
        'ci',
      ],
    ],
  },
};
