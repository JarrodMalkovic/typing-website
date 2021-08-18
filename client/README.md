# Korean Typing Website frontend

## Prerequisites

You will need to have Yarn installed on your computer to start the frontend for development. Yarn is a package manager for JavaScript projects (similar to npm). You can follow the steps [here](https://classic.yarnpkg.com/en/docs/install/) to install Yarn.

Once Yarn is installed you can install all the required packages and tooling that is used by the frontend by running:

```bash
yarn install
```

from the ./client directory

## Getting started in development

First, run the development server:

```bash
yarn dev
```

from the ./client directory

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Edit any of the pages to see the development server instantly reload and reflect the changes.

## Getting started in production

First, build the project:

```bash
yarn build
```

Start the Next.js server:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: In production the Next.js server and any other api (in our case, our Django backend) are hosted seperately. The Next.js server is only responsible for prerendering and serving the results to the client.

## Styling

The frontend uses [Chakra-UI](https://chakra-ui.com/) for styling (we can change this to a different styling framework later if we decide too). Chakra-UI is a really popular and customizable component library for React.

### Chakra Styling System

In Chakra-UI, instead of writing styles in a CSS file, you supply styles to Chakra Components as props

For example:

```jsx
<Box maxW='960px' mx='auto' />
```

You can read about Chakras Styling Props [here](https://chakra-ui.com/docs/features/style-props)

## Next.js Tips

Next.js is a relatively simple and very popular framework (Used by TikTok, Netflix, Twitch, GitHub and [more](https://nextjs.org/showcase)) that is built ontop of React. Next.js allows us use use pre-rendering (Static Generation and Server-side Rendering) with React, allowing for greater performance and SEO than a traditional react app.

### Routing in Next.js

Next.js has a file-system based router built on the concept of pages.
When a file is added to the pages directory (located in [src](./src)) it's automatically available as a route in the website.
For example:

- "pages/index.js" → "/"
- "pages/blog/index.js" → "/blog"
- "pages/blog/first-post.js" → "/blog/first-post"
- "pages/[username]/settings.js" → "/:username/settings" (More on dynamic routes [here](https://nextjs.org/docs/routing/dynamic-routes))

Read more about Next.js routing [here](https://nextjs.org/docs/routing/introduction)

Note: In the /pages directory, \_document.js, \_app.js, and 404.js are special pages. You can learn more \_app.js [here](https://nextjs.org/docs/advanced-features/custom-app) and more about \_document [here](https://nextjs.org/docs/advanced-features/custom-document).

### Linking to other pages in Next.js

With Next.js, instead of using an anchor tag to link to other pages within the website, use the Link tag from Next.js in addition to just the anchor tag.

Example:

```jsx
// Import the Link first
import Link from 'next/link';

// Then, inside your component
<Link href='/about'>
  <a>About Us</a>
</Link>;
```

If you want to learn more about the Link tag, you can read more [here](https://nextjs.org/docs/api-reference/next/link)

Note: If you want to link to an external website, just use anchor tag by itself.

### File organisation

Basic example of the common file structure for Next.js projects:

```
/public
    favicon.ico
/src
    /common
        /components
        /hooks
        /utils
    /modules
        /auth
            /components
        /other-modules-here (e.g exerices, etc)
    /pages
        _app.js
        _document.js
        index.js
        other-pages-here.js
```

## Tooling

ESLint and Prettier are both used for development purposes within this directory to help keep a consistent coding style.

### ESLint

ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code.

You can add rules to ESLint by editing the ".eslintrc.json" file.

You can see all ESlint warnings or errors by running:

```bash
yarn lint
```

from the ./client directory

Alternatively, installing the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to show any warnings or errors inline.

Some warnings and errors from ESLint can be fixed automatically by running:

```bash
yarn lint:fix
```

from the ./client directory

### Prettier

Prettier is an opinionated code formatter that is very popular with JavaScript/TypeScript/React projects.

You can add rules to Prettier by editing the ".prettier.json" file.

You can format all JavaScript files by running:

```bash
yarn format:fix

```

from the ./client directory

or preferably, you can setup your editor to automatically format on each save using Prettier. If you use VSCode, you can do this by following [this](https://www.robinwieruch.de/how-to-use-prettier-vscode) guide.

You can also check if all JavaScript files are formatted correctly by running:

```bash
yarn format:check
```

from the ./client directory
