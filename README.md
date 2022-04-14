`ts-package-template`
=====================

A template repository for an NPM package that supports TypeScript, as well as exporting CLI commands.

ESLint and Jest are also integrated into the project out-of-the-box.


## The example contents
Out-of-the-box, this template includes a basic greeting CLI that also allows the `greet` helper that
it calls to be exported from the package to be able to be imported within a consuming project
instead of integrating with the CLI command.

This is just to show an example of how to define things - you can delete it and replace with your
own package implementation.


## Testing the CLI command locally
If you want to test the CLI command locally you can either run `node cli` in the project root, or
to test the command itself you can run `npm link` after installing the project, which will allow you
to run [the package's exported CLI commands](./package.json#L22-L24) globally.


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

If you just want to compile without packing or publishing, you can just run `yarn prepack` directly.

TypeScript has been configured to output the compiled `.js` and `.d.ts` files alongside the source `.ts`
files. This is to eliminate needing to specify a `dist` folder which would end up in your package's
import path. The `.gitignore` file has been set up to ensure `.js` and `.d.ts` files are excluded
from Git to ensure that only your source code is committed.
