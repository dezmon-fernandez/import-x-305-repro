// eslint-plugin-import with the TypeScript resolver: once 'my-lib' resolves,
// it reports the same error as import-x.
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tseslint.parser },
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      'import/no-extraneous-dependencies': 'error',
    },
  },
];
