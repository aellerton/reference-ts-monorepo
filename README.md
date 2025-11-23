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
- lib
  \- misc-lib    = Some reusable functions

- svc
  \- apisvc      = An API service using the library (I used Hono)

- app
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
$ curl -s localhost:9000 | jq .
{
  "service": "apisvc",
  "message": "Hello Hono Service from misc-lib",
  "calculation": "10 + 20 = 30"
}

$ curl -s 'localhost:9000/add?a=2&b=4' | jq .
{
  "a": 2,
  "b": 4,
  "result": 6
}
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

> The library behaves exactly like a package downloaded from npm. The consumers (App/API) do not compile the library; they just consume the artifacts.
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
>   jumps to the Source of the library, not the .d.ts file, giving you the best of both worlds.
>
> Cons:
>
> - DX Friction: You must have a terminal running tsc -b -w (watch mode) for the library. If you
>   forget this, you change code in the lib, and the app doesn't see it.
> - Lag: There is a tiny delay (milliseconds to seconds) between saving the lib file and the watcher finishing the build so the app can pick it up.

This blog post I found has details on various approaches: https://nx.dev/blog/managing-ts-packages-in-monorepos
