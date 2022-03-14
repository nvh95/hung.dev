---
template: "post"
title: "Setup Jest with Vite (featuring SWC)"
slug: "jest-vite"
draft: false
date: 2022-03-14T17:39:03.296Z
description: "Setup Jest to React Typescript Vite project, also SWC"
category: "Blog"
tags:
  - jest
  - vite
  - swc
  - test
  - react
  - javascript
socialImage: "/media/jest-vite/thumbnail.png"
---

## Motivation

Web applications are becoming an indispensable part of our lives. We can build literally everything on the web app nowadays from reading the news, composing email, learning, to video conferences, even gaming. Going hand in hand with that development is the growth in complexity and the unpredictable quality of web applications. Speaking of web application, [Create React App](https://create-react-app.dev/) (CRA) used to be the first choice when it comes to bootstrapping a React application and it fulfilled its duty. Now CRA is in maintenance mode and the ecosystem gives us a lot of good tools to start a React project like [Vite](https://vitejs.dev/), [Parcel](https://parceljs.org/), [NextJS](https://nextjs.org/)... I had a chance to use Vite in my daily work and I’m very happy with that, my Developer Experience (DX) and productivity have increased dramatically, it’s blazing fast. However, speed is not the only factor to make a high quality web application. We also need tests. Even though I’m happy with Vite, it took me a while to successfully integrate Jest with Vite. In this post, I am going to setup Jest to a React Typescript Vite project (spoiler alert: [swc](https://swc.rs/))

You can find the final code here: [https://github.com/nvh95/jest-with-vite](https://github.com/nvh95/jest-with-vite)

## Integrating Jest to Vite

1.  First, generate React Typescript project using Vite. I’m gonna using `npm`, you can use `yarn` or `pnpm`:

    ```bash
    npm init vite@latest
    ```

    ![Init project using Vite](/media/jest-vite/init-vite.gif)

2.  Then, install the main dependency `jest`:

    ```bash
    npm i jest --save-dev
    ```

3.  Install react-testing-library packages:

    - `@testing-library/jest-dom`: provides a set of custom jest matchers that you can use to extend jest (e.g: `toBeInTheDocument()`)
    - `@testing-library/react`: say no to [implementation details testing](https://kentcdodds.com/blog/testing-implementation-details)
    - `@testing-library/user-event`: interacts with our UI (fun fact: it can be used in production for real interaction!)

    ```bash
    npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event --save-dev
    ```

4.  Exclude test files from typescript type checking when building for production, you don’t want a typescript error in your test file breaks your build in production.

    1. Create `tsconfig.prod.json` which inherits `tsconfig.json`, exclude test files from the project:

    ```json
    // tsconfig.prod.json
    {
      "extends": "./tsconfig",
      "exclude": [
        "./src/__tests__/**",
        "./src/__mocks__/**",
        "./src/test-utils"
      ]
    }
    ```

    2. Use `tsconfig.prod.json` when building:

    ```diff
    // Package.json
    -"build": "tsc && vite build",
    +"build": "tsc -p tsconfig.prod.json && vite build",
    ```

5.  Add a script test to `package.json` :

    ```diff
    // package.json
    +  "test": "NODE_ENV=test jest"
    ```

6.  Let’s write a sample test. However, just comment out the render statement for now:

    ```jsx
    // src/__tests__/App.test.tsx
    import { render, screen } from "@testing-library/react";
    import App from "../App";

    describe("App", () => {
      it("should work as expected", () => {
        // render(<App />);
        expect(1 + 1).toBe(2);
      });
    });
    ```

7.  Attempt to run it, this error will show up

    ```bash
    Jest encountered an unexpected token
    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.
    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.
    By default "node_modules" folder is ignored by transformers.
    ...
    Details:

    /jest-vite/src/__tests__/App.test.tsx:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import { render, screen } from "@testing-library/react";
                                                                                       ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1728:14)
    ```

8.  Before moving forward, let’s tip the iceberg on what makes Vite so fast. One of the reasons is the native [ECMAScript Modules](https://nodejs.org/api/esm.html). In the development mode, build tools such as CRA bundles all of your code into a single file and serves via [a dev server](https://webpack.js.org/configuration/dev-server/). Vite took a different approach by not bundling your code at all. It leverages the native support for ESM of modern browsers. It sends your file directly without being bundled.

    So, Vite takes advantage of ESM, on the other hand, Jest uses [CommonJS](https://nodejs.org/docs/latest/api/modules.html) (it actually has [experiment support for Native ESM](https://jestjs.io/docs/ecmascript-modules) but it’s not 100% ready now - March of 2022). That’s the reason why you see the error message as above when using `import` and `export`. So we have a few options here:

    - Use [Jest experiment support](https://jestjs.io/docs/ecmascript-modules) for ESM
    - Use [babel](https://babeljs.io/) to compile ESM to CommonJS (similar to what CRA does)
    - Use high performance build tools like [esbuild](https://www.notion.so/2-Rough-Draft-3ea664c6e24e4dc48bb2b77ab7e19ac5) and [SWC](https://swc.rs/)

          - `esbuild`: created by [Evan Wallace](https://twitter.com/evanwallace), co-founder of [figma](https://www.figma.com/). `esbuild` is written in Go and it is one of core components for the speed of Vite.

          - `SWC`: created by [Donny (강동윤)](https://twitter.com/kdy1dev), a young talent developer from [Vercel](https://vercel.com/). `SWC` stands for Speedy Web Compiler and is written in Rust. SWC is adopted by Vercel and replaced babel to be the [compiler of NextJS since version 12](https://nextjs.org/blog/next-12#faster-builds-and-fast-refresh-with-rust-compiler).

    I did try Jest Native ESM support but it’s not stable right now. So the safe option is just to compile ESM to CommonJS. It’s a tough decision to make between esbuild and SWC.

|      | esbuild                                                                                                                                                             | SWC                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Pros | - Dependency of Vite already. So addition third party code will not be much.<br/>- @swc/jest is developed by author of swc<br/>- @swc/jest is in active development | - Used in NextJS             |
| Cons | - esbuild-jest (which is a community package to use esbuild with jest) is not very active. The last commit is March 2021 (This post is published in March 2022)     | - another library to install |

[Choosing a third party package](https://hung.dev/choose-third-party-package) is always a hard problem. So after considerations and experiments, I chose SWC.

Install SWC by this command:

```bash
npm i @swc/core @swc/jest --save-dev
```

Configure swc by creating `.swcrc` file at the root of the project:

```json
// .swcrc
{
  "jsc": {
    "target": "es2017",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": false
    },
    "transform": {
      "react": {
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false,
        "runtime": "automatic"
      },
      "hidden": {
        "jest": true
      }
    }
  },
  "module": {
    "type": "commonjs",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

Note that if you use JSX runtime (likely that you do) that’s introduced in React 17, [you need to set](https://swc.rs/docs/configuration/compilation#jsctransformreactruntime) `jsc.transform.react.runtime` to `automatic` (as above). If you use `React.createElement`, you must set it to `classic`.

9.  Configure Jest

    Create a file `jest.config.js` at the root project:

    ```jsx
    module.exports = {
      roots: ["<rootDir>/src"],
      collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/mocks/**",
      ],
      coveragePathIgnorePatterns: [],
      setupFilesAfterEnv: ["./config/jest/setupTests.js"],
      testEnvironment: "jsdom",
      modulePaths: ["<rootDir>/src"],
      transform: {
        "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
          "<rootDir>/config/jest/fileTransform.js",
      },
      transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
      ],
      modulePaths: ["<rootDir>/src"],
      moduleNameMapper: {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
      },
      moduleFileExtensions: [
        // Place tsx and ts to beginning as suggestion from Jest team
        // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
        "tsx",
        "ts",
        "web.js",
        "js",
        "web.ts",
        "web.tsx",
        "json",
        "web.jsx",
        "jsx",
        "node",
      ],
      watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
      ],
      resetMocks: true,
    };
    ```

    A lot of magic happens here but I can brief some important points.

    Transform code to CommonJS using SWC:

    ```json
    transform: {
        "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    ...
    },
    ```

    Transform css and files:

    ```json
    transform: {
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
        "<rootDir>/config/jest/fileTransform.js",
    ...
    },
    ```

    Create `config/jest/cssTransform.js` and `config/jest/fileTransform.js` to transform css and files. Those 2 files are from CRA.

    ```jsx
    // config/jest/cssTransform.js
    "use strict";

    // This is a custom Jest transformer turning style imports into empty objects.
    // http://facebook.github.io/jest/docs/en/webpack.html

    module.exports = {
      process() {
        return "module.exports = {};";
      },
      getCacheKey() {
        // The output is always the same.
        return "cssTransform";
      },
    };
    ```

    ```jsx
    // config/jest/fileTransform.js
    "use strict";

    const path = require("path");
    const camelcase = require("camelcase");

    // This is a custom Jest transformer turning file imports into filenames.
    // http://facebook.github.io/jest/docs/en/webpack.html

    module.exports = {
      process(src, filename) {
        const assetFilename = JSON.stringify(path.basename(filename));

        if (filename.match(/\.svg$/)) {
          // Based on how SVGR generates a component name:
          // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
          const pascalCaseFilename = camelcase(path.parse(filename).name, {
            pascalCase: true,
          });
          const componentName = `Svg${pascalCaseFilename}`;
          return `const React = require('react');
          module.exports = {
            __esModule: true,
            default: ${assetFilename},
            ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
              return {
                $$typeof: Symbol.for('react.element'),
                type: 'svg',
                ref: ref,
                key: null,
                props: Object.assign({}, props, {
                  children: ${assetFilename}
                })
              };
            }),
          };`;
        }

        return `module.exports = ${assetFilename};`;
      },
    };
    ```

    Add ability to search test files and test names in pattern mode. Note that if you using Jest ≤ 26, please install `jest-watch-typeahead@0.6.5`, if you use Jest ≥ 27, please use `jest-watch-typeahead^1.0.0`:

    ```json
    watchPlugins: [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname",
    ],
    ```

    ```bash
    // For jest <= 26
    npm i jest-watch-typeahead@0.6.5 --save-dev
    // For jest >= 27
    npm i jest-watch-typeahead --save-dev
    ```

    ![Jest interactive mode](/media/jest-vite/jest-interactive.gif)

    Everything you want to do to your test environment such as extends the jest matchers with [@testing-library/jest-dom](https://github.com/testing-library/jest-dom), mock some APIs that’s not implemented in [jdom](https://github.com/jsdom/jsdom), you can put to `config/jest/setupTests.js`:

    ```jsx
      setupFilesAfterEnv: ["./config/jest/setupTests.js"],
    ```

    ```jsx
    // config/jest/setupTests.js
    import "@testing-library/jest-dom/extend-expect";

    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });

    Object.defineProperty(URL, "createObjectURL", {
      writable: true,
      value: jest.fn(),
    });
    ```

10. Uncomment the `render` in the test file and run `npm test`.

```diff
// src/__tests__/App.test.tsx
-    // render(<App />);
+     render(<App />);

```

At this moment, you can run the test successfully.

![Jest Passed](/media/jest-vite/jest-passed.png)

Using `@swc/jest` to compile code to CommonJS is much faster than [babel-jest](https://www.npmjs.com/package/babel-jest), [ts-jest](https://github.com/kulshekhar/ts-jest) which have long cold starts when executing tests in a large project.

## Outro

Hooray. Congratulations, you’ve successfully integrated Jest with Vite. But our journey is not over yet. In the next post, we’re going deal with [Vite variable environment](https://vitejs.dev/guide/env-and-mode.html#env-variables) with special syntax `import.meta.env` together. And some preview on a blazing fast unit-test framework powered by Vite: [Vitest](https://vitest.dev/). Stay tuned! Happy coding!
