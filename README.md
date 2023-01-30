`ts-package-template`
=====================

A template repository for an NPM package that supports TypeScript, ESM, CJS, as well as exporting CLI commands.

ESLint and Jest are also integrated into the project out-of-the-box.


## The example contents
Out-of-the-box, this template includes a basic `greeting` CLI that also allows the `greet` helper that
it calls to be exported from the package to be able to be imported within a consuming project
instead of integrating with the CLI command.

This is just to show an example of how to define things - you can delete it and replace with your
own package and/or CLI implementation.


## Developing your project
Because this template has been configured to support ESM, you will have to ensure your import paths
include the exact path to the file. This unfortunately means that it won't correctly resolve without
the extension or for index files just using the folder in the import path.

Also, for `.ts` and `.tsx` files, you will have to ensure you use `.js` and `.jsx` extensions in your
import paths.

Here's an example:
```typescript
// These will not work
import { thing } from "../helpers";
import { thing } from "../helpers/thing";

// These will work
import { thing } from "../helpers/index.js";
import { thing } from "../helpers/thing.js";
```

## Testing the CLI command locally
If you want to test the CLI command locally you can either run `node esm/cli` or `node cjs/cli` in
the project root after compiling, or to test it as a global command you can run `npm link` after
installing the project, which will allow you to run [the package's exported CLI commands](./package.json#L22-L24) globally.


## Testing the package locally
You should add unit test coverage for your package implementation to ensure everything works correctly.
If you want to test it interactively in a consuming project to be 100% certain your package works as
expected, you can use the link functionality provided by [Yarn](https://classic.yarnpkg.com/en/docs/cli/link)
or [NPM](https://docs.npmjs.com/cli/v8/commands/npm-link) (depending on if you're using Yarn or NPM in the
consuming project).


## Compiling/publishing your package
Everything is all integrated with the `prepack` hook to automatically compile before the package's
`tgz` file is created. This will allow you to just be able to run `yarn publish` (or with `npm` if you
choose to remove `yarn.lock` and use that instead) to publish new versions of your package in one step.

If you just want to compile without packing or publishing, you can just run `yarn compile` directly,
or use `yarn compile:watch` if you want it to recompile when you make changes.

If you just want to pack the `.tgz` file, just run `yarn pack`.

### How it compiles
TypeScript has been configured to output the compiled `.js` and `.d.ts` files as both ES Module (ESM) format,
as well as CommonJS (CJS) format. These are outputted to the `cjs` and `esm` folders respectively.
A `package.json` file lives within `/cjs` to flag the folder as being CommonJS, to override the
top-level `type` value of `module`.

This, in addition to the `exports` configuration in `package.json`, allows the package to support
both native ESM and CJS consumers simultaneously. Consumers will automatically use the appropriate
format depending on if they're using the `import` or `require` syntax in their codebase.
