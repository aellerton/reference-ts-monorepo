# Reference TypeScript Node v24 pnpm monorepo

## Objective

This is mainly about being a reference for useful monorepo tsconfig
settings, and a good copy-and-paste starting point for a TypeScript monorepo.

## Contents

This is a TypeScript monorepo designed for Node v24+ and pnpm.

It should work with similar tool choices.

I prefer SolidJS so that is what I used in the webapp, but
swapping that out for something else is straightforward if you
prefer that.

Structure:

```
- libs
  \- misc-lib    = Some reusable functions

- svcs
  \- apisvc      = An API service using the library (I used Hono)

- apps
  \- webapp      = A webapp using the library (I used SolidJS)

- tools
  \- misc-cli    = A small command-line tool using the library
```

## Setup and run

```bash
# first usual step:
pnpm install

# then follow the prompts here:
pnpm approve-build

# this runs the library continuous build
# and the service and webapp:
pnpm dev
```

Load the webapp:

    http://localhost:3000

Test the API:

```bash
$ curl -s localhost:9000/api | jq .
{
  "service": "apisvc",
  "message": "Hello Hono Service from misc-lib",
  "calculation": "10 + 20 = 30"
}

$ curl -s 'localhost:9000/api/add?a=2&b=4' | jq .
{
  "a": 2,
  "b": 4,
  "result": 6
}

$ curl localhost:9000/api/hello
Hello World from misc-lib

```

To format everything:

```bash
pnpm format
```

## Approach

There are a few possible approaches with TypeScript such that packages can depend on
other packages.

The approach taken here is what Gemini calls "The build Strategy" and it basically means you
have to run `tsc -b -w` (`pnpm dev:lib`) all the time when working, which I find very reasonable and fast.

Pros and cons of this approach, as Gemini wrote:

> The library behaves exactly like a package downloaded from npm.
> Consumers like services, webapps and tools do not compile the library, they just consume the artifacts.
>
> Pros:
>
> - Performance (Caching): TypeScript uses the `.d.ts` files from the library.
>   It doesn't have to re-parse and type-check the library source code every
>   time you compile the app. As the repo grows, this keeps the IDE and build times fast.
> - Strict Boundaries: It prevents "bleed." You can't accidentally import a helper function that
>   isn't exported in index.ts because the .d.ts file is the source of truth.
> - Native Node Support: Since apisvc imports a real `.js` file from dist, you don't need any special
>   runtime loaders or bundlers for production. Standard node dist/index.js works perfectly.
> - IDE "Go to Definition": Because we enabled declarationMap: true, clicking a function in the App
>   jumps to the Source of the library, not the `.d.ts` file, giving you the best of both worlds.
>
> Cons:
>
> - DX Friction: You must have a terminal running `tsc -b -w `(watch mode) for the library. If you
>   forget this, you change code in the lib, and the app doesn't see it.
> - Lag: There is a tiny delay (milliseconds to seconds) between saving the lib file and the watcher finishing the build so the app can pick it up.

This blog post I found has details on various approaches: https://nx.dev/blog/managing-ts-packages-in-monorepos

## Using

- Clone or download.
- Optional: Remove git history, `rm -rf .git`
- Optional: Remove the LICENSE file and `license` fields in all `package.json` files.
- Copy or rename libs / svcs / apps / tools as you prefer.

## Why: import .js

It looks wrong to import a `.js` when this is a TypeScript repo. Here's how I understand it:

- TypeScript is a Compiler: Its job is to turn misc.ts into misc.js.

- Modern nodejs is ESM and ESM is strict. Writing `import ... from './misc'` will crash node;
  node demands extensions.

- Apparently the TypeScript authors took the view of not magically rewriting imports. Basically,
  just import `.js` and the compiler knows that you mean `.ts`.
- IDEs are smart enough to know that the `.ts` file is there and to resolve types correctly, and
  the build knows to compile and leave the import string as-is.


## Updating dependencies in the pnpm-workspace / catalog

Many package versions are listed in the `pnpm-workspace.yaml` file, shared across many packages.
Updating that isn't fully incorporated into `pnpm` at the time of writing, but this separate
tool does the job:

```bash
npx pnpm-update-catalogs -L
# then as usual:
pnpm install
```

Read more: https://github.com/pnpm/pnpm/issues/8641
