# `no-extraneous-dependencies` self-import repro

Reproduction for [un-ts/eslint-plugin-import-x#305](https://github.com/un-ts/eslint-plugin-import-x/issues/305):
a secondary entry point of a package (`my-lib/testing`) importing the package's
primary entry point (`my-lib`) is reported as a missing dependency.

## Layout

This mirrors an Angular (ng-packagr) library workspace:

```
tsconfig.json                     paths: my-lib -> ./dist/my-lib (built output, as the Angular CLI generates)
dist/my-lib/                      built primary entry point (normally produced by `ng build my-lib`)
projects/my-lib/package.json      { "name": "my-lib" }
projects/my-lib/src/index.ts      primary entry point
projects/my-lib/testing/index.ts  secondary entry point: import { answer } from 'my-lib';
```

## Run

```sh
npm install
npm run lint:import-x            # eslint-plugin-import-x                       -> error
npm run lint:import              # eslint-plugin-import, default node resolver  -> passes
npm run lint:import-ts-resolver  # eslint-plugin-import, TypeScript resolver    -> error
```

## Results

| Config | Result |
| --- | --- |
| `eslint-plugin-import-x` 4.17.1 + `eslint-import-resolver-typescript` | `'my-lib' should be listed in the project's dependencies` |
| `eslint-plugin-import` 2.32.0, default resolver | no error |
| `eslint-plugin-import` 2.32.0 + `eslint-import-resolver-typescript` | `'my-lib' should be listed in the project's dependencies` |

`eslint-plugin-import` only passes with its default resolver because that
resolver can't resolve `my-lib` (it's a tsconfig `paths` alias), and the rule
skips unresolved imports. Once it can resolve `my-lib`, it reports the same
error. Both plugins share the same logic here: `my-lib` resolves to
`dist/my-lib`, which is outside the linting file's package
(`projects/my-lib`), so the import is classified as `external`. Then `my-lib`
isn't in `projects/my-lib/package.json`'s dependencies, because it's the
package itself.

Expected: an import whose package name matches the `name` of the nearest
`package.json` (the package importing itself) is not reported.
