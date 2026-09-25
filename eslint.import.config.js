// eslint-plugin-import with its default (node) resolver: passes, but only
// because the node resolver cannot resolve 'my-lib' and the rule skips
// unresolved imports.
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tseslint.parser },
    plugins: { import: importPlugin },
    rules: {
      'import/no-extraneous-dependencies': 'error',
    },
  },
];
